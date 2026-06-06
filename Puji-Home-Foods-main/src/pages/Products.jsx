import { useState } from 'react'
import { products } from '../data'
import ProductCard from '../components/ProductCard'

const C = { gold: '#C9A84C' }

export default function Products({ searchTerm, setSearchTerm, setPage }) {
  const [category, setCategory] = useState('All')

  const filtered = products.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes((searchTerm || '').toLowerCase())
  )

  return (
    <section style={{ padding: '120px 0 88px', background: '#FAF7F2', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 'bold', fontFamily: "'Playfair Display', serif", color: '#3D0000' }}>
          Our <span style={{ color: C.gold }}>Products</span>
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', maxWidth: 400, padding: '14px 18px', borderRadius: 50, border: `1px solid ${C.gold}`, outline: 'none', fontSize: '.9rem', background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,.05)' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {['All', 'Veg Pickles', 'Non-Veg Pickles', 'Sweets', 'Hot & Snacks'].map(item => (
            <button key={item} onClick={() => setCategory(item)}
              style={{ padding: '10px 20px', borderRadius: '30px', border: `1px solid ${C.gold}`, background: category === item ? '#8B0000' : '#fff', color: category === item ? '#fff' : '#5B1E1E', fontWeight: 600, cursor: 'pointer', transition: '0.3s', boxShadow: category === item ? '0 6px 16px rgba(139,0,0,.25)' : '0 3px 10px rgba(0,0,0,.05)' }}>
              {item}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#9a6040' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontSize: '1.1rem' }}>No products found. Try a different search.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.4rem' }}>
            {filtered.map(p => (
              <ProductCard key={p.id} p={p} onWishlistClick={() => setPage && setPage('wishlist')} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
