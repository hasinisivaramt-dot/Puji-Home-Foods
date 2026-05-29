import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { calculatePrice } from '../utils/calculatePrice'
import WeightSelector from './WeightSelector'

const C = {
  gold:    '#C9A84C',
  goldL:   '#E8C97A',
  crimson: '#8B1A1A',
  darkRed: '#6B0F0F',
  cream:   '#F5ECD7',
  white:   '#FFFFFF',
}

export default function ProductCard({ p }) {
  const { addToCart } = useCart()
  const [hov, setHov]       = useState(false)
  const [weight, setWeight] = useState(1000)
  const [qty, setQty]       = useState(1)
  const [wish, setWish]     = useState(false)
  const [flash, setFlash]   = useState(false)

  const price = calculatePrice(p.price, weight)

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(p, weight, qty)
    setFlash(true)
    setTimeout(() => setFlash(false), 1200)
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white,
        border: `1px solid ${hov ? C.gold : 'rgba(201,168,76,.18)'}`,
        borderRadius: 20, overflow: 'hidden',
        transition: 'all .35s ease',
        transform: hov ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hov
          ? '0 0 0 1.5px #C9A84C, 0 24px 55px rgba(201,168,76,.14), 0 8px 20px rgba(0,0,0,.08)'
          : '0 4px 20px rgba(0,0,0,.07)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1' }}>
        <img
          src={p.image} alt={p.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s ease', transform: hov ? 'scale(1.08)' : 'scale(1)' }}
        />
        {/* Category badge */}
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(26,4,0,.75)', backdropFilter: 'blur(8px)', color: C.goldL, fontSize: '.65rem', fontWeight: 600, padding: '3px 9px', borderRadius: 20, letterSpacing: '.5px', border: '1px solid rgba(201,168,76,.3)' }}>
          {p.category}
        </div>
        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setWish(w => !w) }}
          style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,.9)', border: 'none', color: wish ? '#e74c3c' : '#bbb', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15, boxShadow: '0 2px 10px rgba(0,0,0,.12)', transition: 'all .25s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >{wish ? '♥' : '♡'}</button>
      </div>

      {/* Info */}
      <div style={{ padding: '1rem 1.1rem 1.2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: '#1a0400', marginBottom: 2 }}>{p.name}</div>
          <div style={{ fontSize: '.7rem', color: '#9a6040' }}>{p.grams} · Base ₹{p.price}</div>
        </div>

        {/* Stars */}
        <div style={{ color: C.gold, fontSize: '.75rem', letterSpacing: 1 }}>★★★★★</div>

        {/* Weight selector */}
        <WeightSelector selected={weight} onChange={setWeight} />

        {/* Qty + price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
          {/* Quantity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={e => { e.stopPropagation(); setQty(q => Math.max(1, q - 1)) }}
              style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${qty <= 1 ? 'rgba(201,168,76,.2)' : C.gold}`, background: 'transparent', color: qty <= 1 ? 'rgba(201,168,76,.3)' : C.gold, fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: qty <= 1 ? 'not-allowed' : 'pointer', transition: 'all .2s' }}
            >−</button>
            <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 700, fontSize: '.9rem', color: '#1a0400' }}>{qty}</span>
            <button
              onClick={e => { e.stopPropagation(); setQty(q => q + 1) }}
              style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${C.gold}`, background: `linear-gradient(135deg,${C.crimson},${C.darkRed})`, color: 'white', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .2s' }}
            >+</button>
          </div>
          {/* Price */}
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: C.crimson }}>₹{price * qty}</span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          style={{ marginTop: 4, width: '100%', padding: '10px 0', borderRadius: 50, border: `1px solid ${flash ? '#2a7a2a' : C.gold}`, background: flash ? '#2a7a2a' : `linear-gradient(135deg,${C.crimson},${C.darkRed})`, color: 'white', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer', transition: 'all .3s', boxShadow: flash ? '0 0 0 2px #2a7a2a' : `0 4px 14px rgba(107,15,15,.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
          onMouseEnter={e => { if (!flash) e.currentTarget.style.boxShadow = `0 0 0 2px ${C.gold}, 0 8px 20px rgba(107,15,15,.4)` }}
          onMouseLeave={e => { if (!flash) e.currentTarget.style.boxShadow = `0 4px 14px rgba(107,15,15,.3)` }}
        >
          {flash ? (
            <>✓ Added!</>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
