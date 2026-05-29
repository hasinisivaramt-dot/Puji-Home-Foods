import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // { name, email, phone, role: 'customer'|'admin' }
  const [authModal, setAuthModal] = useState(null) // null | 'customer' | 'admin'

  // Restore session from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('puji_user')
      if (saved) setUser(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('puji_user', JSON.stringify(userData))
    setAuthModal(null)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('puji_user')
  }

  const openAuth  = (type) => setAuthModal(type)   // 'customer' | 'admin'
  const closeAuth = ()     => setAuthModal(null)

  return (
    <AuthContext.Provider value={{ user, authModal, login, logout, openAuth, closeAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
