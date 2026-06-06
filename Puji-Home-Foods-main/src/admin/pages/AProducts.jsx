import { useState } from 'react'
import { adminProducts as initialProducts } from '../data/adminData'
import { Card, Badge, ABtn, SearchBar, DataTable, Toast, ConfirmModal, AC } from '../components/AdminShared'

const emptyForm = { name:'', category:'Veg Pickles', description:'', price:'', stock:'', status:'Active', image:'' }

export default function AProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch]     = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [modal, setModal]       = useState(false)
  const [form, setForm]         = useState(emptyForm)
  const [editId, setEditId]     = useState(null)
  const [errors, setErrors]     = useState({})
  const [confirm, setConfirm]   = useState(null)
  const [toast, setToast]       = useState(null)
  const [loading, setLoading]   = useState(false)

  const cats = ['All','Veg Pickles','Non-Veg Pickles','Sweets','Hot & Snacks']

  const filtered = products.filter(p =>
    (catFilter === 'All' || p.category === catFilter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name  = 'Required'
    if (!form.price || isNaN(form.price)) e.price = 'Enter valid price'
    if (!form.stock || isNaN(form.stock)) e.stock = 'Enter valid stock'
    return e
  }

  const openAdd  = () => { setForm(emptyForm); setEditId(null); setErrors({}); setModal(true) }
  const openEdit = (p) => { setForm({...p, price:String(p.price), stock:String(p.stock)}); setEditId(p.id); setErrors({}); setModal(true) }

  const handleSave = () => {
    const e = validate(); if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setTimeout(() => {
      if (editId) {
        setProducts(ps => ps.map(p => p.id === editId ? {...form, price:+form.price, stock:+form.stock, id:editId} : p))
        setToast({ msg:'Product updated!', type:'success' })
      } else {
        const newP = {...form, price:+form.price, stock:+form.stock, id:`P${Date.now()}`}
        setProducts(ps => [...ps, newP])
        setToast({ msg:'Product added!', type:'success' })
      }
      setLoading(false); setModal(false)
    }, 800)
  }

  const handleDelete = (id) => setConfirm(id)
  const confirmDelete = () => {
    setProducts(ps => ps.filter(p => p.id !== confirm))
    setConfirm(null); setToast({ msg:'Product deleted', type:'error' })
  }

  const columns = [
    { key:'image',    label:'Image',    render:(v) => <img src={v} alt="" style={{ width:44, height:44, borderRadius:8, objectFit:'cover', border:'1px solid rgba(201,168,76,.2)' }} /> },
    { key:'id',       label:'ID',       render:(v) => <span style={{ color:AC.crimson, fontWeight:700, fontSize:'.75rem' }}>{v}</span> },
    { key:'name',     label:'Name',     render:(v) => <span style={{ fontWeight:600, color:'#1a0400' }}>{v}</span> },
    { key:'category', label:'Category'  },
    { key:'price',    label:'Price',    render:(v) => <span style={{ fontWeight:700, color:AC.crimson }}>₹{v}</span> },
    { key:'stock',    label:'Stock',    render:(v) => <span style={{ color: v <= 10 ? '#991b1b' : '#166534', fontWeight:700, background: v <= 10 ? '#fee2e2' : '#dcfce7', padding:'2px 8px', borderRadius:20, fontSize:'.72rem' }}>{v}</span> },
    { key:'status',   label:'Status',   render:(v) => <Badge status={v} /> },
    { key:'id',       label:'Actions',  render:(_,row) => (
      <div style={{ display:'flex', gap:6 }}>
        <ABtn size="sm" variant="outline" onClick={() => openEdit(row)}>Edit</ABtn>
        <ABtn size="sm" variant="primary" onClick={() => handleDelete(row.id)}>Delete</ABtn>
      </div>
    )},
  ]

  return (
    <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      {confirm && <ConfirmModal msg="Delete this product permanently?" onConfirm={confirmDelete} onCancel={() => setConfirm(null)} />}

      <Card>
        {/* Toolbar */}
        <div style={{ padding:'1.2rem 1.4rem', borderBottom:'1px solid rgba(201,168,76,.1)', display:'flex', flexWrap:'wrap', gap:'1rem', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap', flex:1 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              style={{ padding:'8px 14px', borderRadius:20, border:'1.5px solid rgba(201,168,76,.25)', fontSize:'.8rem', color:'#5a2e10', fontFamily:"'DM Sans',sans-serif", outline:'none', background:'white', cursor:'pointer' }}>
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <ABtn variant="gold" onClick={openAdd} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}>Add Product</ABtn>
        </div>
        <DataTable columns={columns} data={filtered} />
      </Card>

      {/* Modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(0,0,0,.5)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
          <div style={{ background:'white', borderRadius:20, padding:'2rem', maxWidth:520, width:'100%', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 30px 80px rgba(0,0,0,.3)', border:'1px solid rgba(201,168,76,.2)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', fontWeight:800, color:'#1a0400', margin:0 }}>{editId ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setModal(false)} style={{ background:'none', border:'1px solid rgba(201,168,76,.2)', borderRadius:'50%', width:32, height:32, cursor:'pointer', fontSize:14, color:'#7a4020' }}>✕</button>
            </div>
            <FormGrid form={form} setForm={setForm} errors={errors} cats={cats.slice(1)} />
            <div style={{ display:'flex', gap:'1rem', marginTop:'1.5rem' }}>
              <ABtn variant="outline" onClick={() => setModal(false)}>Cancel</ABtn>
              <ABtn variant="gold" onClick={handleSave} disabled={loading}>{loading ? 'Saving…' : (editId ? 'Save Changes' : 'Add Product')}</ABtn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FormGrid({ form, setForm, errors, cats }) {
  const F = ({ label, k, type='text', half, options }) => (
    <div style={{ gridColumn: half ? 'auto' : 'span 2' }}>
      <label style={{ display:'block', fontSize:'.75rem', fontWeight:700, color:'#7a4020', marginBottom:4 }}>{label}</label>
      {options ? (
        <select value={form[k]} onChange={e => setForm(f => ({...f, [k]:e.target.value}))}
          style={{ width:'100%', padding:'9px 12px', borderRadius:10, border:`1.5px solid ${errors[k] ? '#c0392b' : 'rgba(201,168,76,.25)'}`, fontSize:'.85rem', color:'#1a0400', fontFamily:"'DM Sans',sans-serif", outline:'none', background:'white' }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[k]} onChange={e => setForm(f => ({...f, [k]:e.target.value}))} placeholder={label}
          style={{ width:'100%', padding:'9px 12px', borderRadius:10, border:`1.5px solid ${errors[k] ? '#c0392b' : 'rgba(201,168,76,.25)'}`, fontSize:'.85rem', color:'#1a0400', fontFamily:"'DM Sans',sans-serif", outline:'none' }}
          onFocus={e => e.target.style.borderColor = '#C9A84C'}
          onBlur={e => e.target.style.borderColor = errors[k] ? '#c0392b' : 'rgba(201,168,76,.25)'}
        />
      )}
      {errors[k] && <div style={{ fontSize:'.7rem', color:'#c0392b', marginTop:3 }}>⚠ {errors[k]}</div>}
    </div>
  )
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
      <F label="Product Name" k="name" />
      <F label="Category" k="category" half options={cats} />
      <F label="Price (₹)" k="price" type="number" half />
      <F label="Stock" k="stock" type="number" half />
      <F label="Description" k="description" />
      <F label="Image Path" k="image" />
      <F label="Status" k="status" half options={['Active','Inactive']} />
    </div>
  )
}
