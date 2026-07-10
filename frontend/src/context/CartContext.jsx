import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { authHeaders } from '../auth/AuthContext'
import { useAuth } from '../auth/AuthContext'

const CartContext = createContext(null)

const BASE = 'https://puji-home-foods.onrender.com/api/cart'
const COUPON_URL = 'https://puji-home-foods.onrender.com/api/coupons'

// ── Price utility ─────────────────────────────────────────────────
export function calculatePrice(basePrice, weightGrams) {
  return Math.round((basePrice / 1000) * weightGrams)
}

// ── Reducer (local state — mirrors backend) ───────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'SET':
      // Replace entire cart with data from backend
      return action.payload

    case 'ADD': {
      const { product, weight, quantity, dbId } = action.payload
      const key = `${product.id}-${weight}`
      const existing = state.find(i => i.key === key)
      if (existing) {
        return state.map(i =>
          i.key === key
            ? { ...i, quantity: i.quantity + quantity, subtotal: (i.quantity + quantity) * i.finalPrice }
            : i
        )
      }
      const finalPrice = calculatePrice(product.price, weight)
      return [...state, {
        key,
        dbId,                   // MongoDB _id — needed for DELETE
        id:         product.id,
        name:       product.name,
        image:      product.image,
        category:   product.category,
        weight,
        quantity,
        basePrice:  product.price,
        finalPrice,
        subtotal:   finalPrice * quantity,
      }]
    }

    case 'REMOVE':
      return state.filter(i => i.key !== action.payload)

    case 'INCREASE':
      return state.map(i =>
        i.key === action.payload
          ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.finalPrice }
          : i
      )

    case 'DECREASE':
      return state.map(i =>
        i.key === action.payload && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1, subtotal: (i.quantity - 1) * i.finalPrice }
          : i
      )

    case 'CLEAR':
      return []

    default:
      return state
  }
}

// ── Provider ──────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, dispatch] = useReducer(cartReducer, [])
  const [syncing, setSyncing] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  // ── Load cart from backend when user logs in ──────────────────
  useEffect(() => {
    if (!user?.id) {
      // Not logged in — clear cart
      dispatch({ type: 'CLEAR' })
      return
    }

    const fetchCart = async () => {
      setSyncing(true)
      try {
        const res  = await fetch(`${BASE}/${user.id}`, { headers: authHeaders() })
        const data = await res.json()
        if (!res.ok) return

        // Convert backend cart items → our local format
        const mapped = data.map(item => {
          const finalPrice = item.price
          return {
            key:        `${item.productId}-${item.weight}`,
            dbId:       item._id,
            id:         item.productId,
            name:       item.name,
            image:      item.image,
            weight:     item.weight,
            quantity:   item.quantity,
            basePrice:  item.price,
            finalPrice,
            subtotal:   finalPrice * item.quantity,
          }
        })
        dispatch({ type: 'SET', payload: mapped })
      } catch (err) {
        console.error('Failed to load cart:', err)
      } finally {
        setSyncing(false)
      }
    }

    fetchCart()
  }, [user?.id])

  // ── Add to cart ───────────────────────────────────────────────
  const addToCart = async (product, weight, quantity = 1) => {
    const finalPrice = calculatePrice(product.price, weight)

    if (!user?.id) {
      // Guest — local only
      dispatch({ type: 'ADD', payload: { product, weight, quantity, dbId: null } })
      return
    }

    try {
      const res = await fetch(BASE, {
        method:  'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          userId:    user.id,
          productId: product.id,
          name:      product.name,
          image:     product.image,
          weight:    String(weight),
          quantity,
          price:     finalPrice,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      dispatch({ type: 'ADD', payload: { product, weight, quantity, dbId: data.cartItem._id } })
    } catch (err) {
      console.error('Add to cart failed:', err)
      // Still update local state so UI doesn't freeze
      dispatch({ type: 'ADD', payload: { product, weight, quantity, dbId: null } })
    }
  }

  // ── Remove from cart ──────────────────────────────────────────
  const removeFromCart = async (key) => {
    const item = cart.find(i => i.key === key)

    // Optimistic update
    dispatch({ type: 'REMOVE', payload: key })

    if (!item?.dbId) return

    try {
      await fetch(`${BASE}/${item.dbId}`, {
        method:  'DELETE',
        headers: authHeaders(),
      })
    } catch (err) {
      console.error('Remove from cart failed:', err)
    }
  }

  // ── Increase / Decrease (local only — no backend endpoint) ────
  const increaseQuantity = (key) => dispatch({ type: 'INCREASE', payload: key })
  const decreaseQuantity = (key) => dispatch({ type: 'DECREASE', payload: key })

  // ── Apply coupon ──────────────────────────────────────────────
  const applyCoupon = async (code) => {
    try {
      const res = await fetch(COUPON_URL)
      const data = await res.json()
      if (!res.ok) return { success: false, message: 'Could not check coupon. Try again.' }

      const match = data.find(c => c.code.toUpperCase() === code.trim().toUpperCase())
      if (!match) return { success: false, message: 'Invalid coupon code' }
      if (match.status !== 'Active') return { success: false, message: 'This coupon is no longer active' }
      if (new Date(match.validTill) < new Date()) return { success: false, message: 'This coupon has expired' }
      if (match.usageLimit && match.used >= match.usageLimit) return { success: false, message: 'This coupon has reached its usage limit' }
      if (subtotal < match.minOrder) return { success: false, message: `Add ₹${match.minOrder - subtotal} more to use this coupon` }

      setAppliedCoupon(match)
      return { success: true, message: 'Coupon applied!' }
    } catch (err) {
      console.error('Apply coupon failed:', err)
      return { success: false, message: 'Something went wrong. Try again.' }
    }
  }

  const removeCoupon = () => setAppliedCoupon(null)

  // ── Clear cart (on order success) ─────────────────────────────
  const clearCart = async () => {
    dispatch({ type: 'CLEAR' })
    setAppliedCoupon(null)
    // Delete all items from backend
    if (!user?.id) return
    try {
      await Promise.all(
        cart.map(item =>
          item.dbId
            ? fetch(`${BASE}/${item.dbId}`, { method: 'DELETE', headers: authHeaders() })
            : Promise.resolve()
        )
      )
    } catch (err) {
      console.error('Clear cart failed:', err)
    }
  }

  // ── Derived values ────────────────────────────────────────────
  const totalItems     = cart.reduce((s, i) => s + i.quantity, 0)
  const subtotal       = cart.reduce((s, i) => s + i.subtotal, 0)
  const deliveryCharge = subtotal > 0 ? (subtotal >= 999 ? 0 : 80) : 0

  let discountAmount = 0
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    discountAmount = appliedCoupon.type === 'Percentage'
      ? Math.round((subtotal * appliedCoupon.discount) / 100)
      : appliedCoupon.discount
    discountAmount = Math.min(discountAmount, subtotal)
  }

  const grandTotal = subtotal + deliveryCharge - discountAmount

  return (
    <CartContext.Provider value={{
      cart, totalItems, subtotal, deliveryCharge, discountAmount, appliedCoupon,
      grandTotal, syncing,
      addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
      applyCoupon, removeCoupon,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
