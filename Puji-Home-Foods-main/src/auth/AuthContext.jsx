import { createContext, useContext, useState, useEffect, useRef } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children, onLoginRedirect }) {
  const [user, setUser]               = useState(null)
  const [authModal, setAuthModal]     = useState(null)
  const [pendingPage, setPendingPage] = useState(null)
  const redirectRef                   = useRef(onLoginRedirect)

  useEffect(() => { redirectRef.current = onLoginRedirect }, [onLoginRedirect])

  // Restore session — only for customers, admins must always log in fresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem('puji_user')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.role === 'customer') {
          setUser(parsed)
        } else {
          localStorage.removeItem('puji_user')
        }
      }
    } catch { /* ignore */ }
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('puji_user', JSON.stringify(userData))
    setAuthModal(null)
    if (redirectRef.current) {
      if (userData.role === 'admin') {
        redirectRef.current('admin')
      } else if (pendingPage) {
        redirectRef.current(pendingPage)
        setPendingPage(null)
      } else {
        redirectRef.current('portal')
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('puji_user')
    if (redirectRef.current) redirectRef.current('home')
  }

  // openAuth with optional pendingPage — after login redirect there
  const openAuth  = (type, afterLoginPage = null) => {
    if (afterLoginPage) setPendingPage(afterLoginPage)
    setAuthModal(type)
  }
  const closeAuth = () => { setAuthModal(null); setPendingPage(null) }

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
