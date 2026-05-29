import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import AuthModal from './auth/AuthModal.jsx'
import './index.css'

function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <App />
        <AuthModal />
      </CartProvider>
    </AuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
