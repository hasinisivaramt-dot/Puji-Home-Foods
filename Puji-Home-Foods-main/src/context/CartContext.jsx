import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

// ── Reducer ───────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD': {
      const { product, weight, quantity } = action.payload
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

    case 'INCREASE': {
      return state.map(i =>
        i.key === action.payload
          ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.finalPrice }
          : i
      )
    }

    case 'DECREASE': {
      return state.map(i =>
        i.key === action.payload && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1, subtotal: (i.quantity - 1) * i.finalPrice }
          : i
      )
    }

    case 'CLEAR':
      return []

    default:
      return state
  }
}

// ── Price utility (also exported for components) ──────────────────
export function calculatePrice(basePrice, weightGrams) {
  // base price is for the product's listed grams
  // we recalculate proportionally for selected weight
  return Math.round((basePrice / 1000) * weightGrams)
}

// ── Provider ──────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    () => {
      try {
        const saved = localStorage.getItem('puji_cart')
        return saved ? JSON.parse(saved) : []
      } catch {
        return []
      }
    }
  )

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('puji_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart    = (product, weight, quantity = 1) => dispatch({ type: 'ADD',      payload: { product, weight, quantity } })
  const removeFromCart  = (key)  => dispatch({ type: 'REMOVE',   payload: key })
  const increaseQuantity = (key) => dispatch({ type: 'INCREASE', payload: key })
  const decreaseQuantity = (key) => dispatch({ type: 'DECREASE', payload: key })
  const clearCart        = ()    => dispatch({ type: 'CLEAR' })

  const totalItems   = cart.reduce((s, i) => s + i.quantity, 0)
  const subtotal     = cart.reduce((s, i) => s + i.subtotal, 0)
  const deliveryCharge = subtotal > 0 ? (subtotal >= 999 ? 0 : 80) : 0
  const grandTotal   = subtotal + deliveryCharge

  return (
    <CartContext.Provider value={{
      cart, totalItems, subtotal, deliveryCharge, grandTotal,
      addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart,
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
