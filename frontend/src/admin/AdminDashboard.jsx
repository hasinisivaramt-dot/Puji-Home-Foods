import { useState } from 'react'
import { Sidebar, Topbar, AC } from './components/AdminShared'
import Dashboard   from './pages/ADashboard'
import AProducts   from './pages/AProducts'
import {
  ACategories, AOrders, ACustomers, APayments,
  ACoupons, AAnalytics, ADelivery, AReviews,
  ASettings, AAdmins,
} from './pages/APages'

const PAGE_TITLES = {
  dashboard:  'Dashboard',
  products:   'Products',
  categories: 'Categories',
  orders:     'Orders',
  customers:  'Customers',
  payments:   'Payments',
  coupons:    'Coupons',
  analytics:  'Analytics',
  delivery:   'Delivery Tracking',
  reviews:    'Reviews',
  settings:   'Settings',
  admins:     'Admins',
}

export default function AdminDashboard({ user, onLogout }) {
  const [page, setPage]           = useState('dashboard')
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768)
const [mobileMenu, setMobileMenu] = useState(false)

  const renderPage = () => {
    switch (page) {
      case 'dashboard':  return <Dashboard onNav={setPage} />
      case 'products':   return <AProducts />
      case 'categories': return <ACategories />
      case 'orders':     return <AOrders />
      case 'customers':  return <ACustomers />
      case 'payments':   return <APayments />
      case 'coupons':    return <ACoupons />
      case 'analytics':  return <AAnalytics />
      case 'delivery':   return <ADelivery />
      case 'reviews':    return <AReviews />
      case 'settings':   return <ASettings />
      case 'admins':     return <AAdmins />
      default:           return <Dashboard onNav={setPage} />
    }
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: AC.beige,
      fontFamily: "'DM Sans', sans-serif",
      overflow: 'hidden',
    }}>
     <Sidebar
  active={page}
  onNav={(p) => {
    setPage(p)
    setMobileMenu(false)
  }}
  collapsed={collapsed}
  mobileMenu={mobileMenu}
  onLogout={onLogout}
/>
{mobileMenu && window.innerWidth <= 768 && (
  <div
    onClick={() => setMobileMenu(false)}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,.45)',
      zIndex: 998,
    }}
  />
)}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar
          title={PAGE_TITLES[page] || 'Dashboard'}
          onToggle={() => {
  if (window.innerWidth <= 768) {
    setMobileMenu(m => !m)
  } else {
    setCollapsed(c => !c)
  }
}}

          user={user}
          onLogout={onLogout}
          onNav={setPage}
        />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}