import { createContext, useContext, useState, useEffect, useRef } from 'react'

const AuthContext = createContext(null)

const BASE = 'https://puji-home-foods-backend.onrender.com/api'

// ── helper: attach token to every protected request ───────────────
export function authHeaders() {
  const token = localStorage.getItem('puji_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// ── API calls ─────────────────────────────────────────────────────
export const api = {
  register: async ({ name, email, phone, password }) => {
    const res = await fetch(`${BASE}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Registration failed')
    return data
  },

  login: async ({ email, password }) => {
    const res = await fetch(`${BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    return data // { token, user }
  },

  getProfile: async () => {
    const res = await fetch(`${BASE}/users/profile`, {
      headers: authHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch profile')
    return data
  },

  updateProfile: async (updates) => {
    const res = await fetch(`${BASE}/users/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(updates),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Update failed')
    return data
  },
}

// ── Provider ──────────────────────────────────────────────────────
export function AuthProvider({ children, onLoginRedirect }) {
  const [user, setUser]               = useState(null)
  const [authModal, setAuthModal]     = useState(null)
  const [pendingPage, setPendingPage] = useState(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const redirectRef = useRef(onLoginRedirect)

  useEffect(() => { redirectRef.current = onLoginRedirect }, [onLoginRedirect])

  // ── Restore session from token ────────────────────────────────
  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem('puji_token')
      const role  = localStorage.getItem('puji_role')

      if (!token) { setLoadingSession(false); return }

      // Admins don't persist — must log in fresh every time
      if (role === 'admin') {
        localStorage.removeItem('puji_token')
        localStorage.removeItem('puji_role')
        setLoadingSession(false)
        return
      }

      try {
        const profile = await api.getProfile()
        setUser({ ...profile, role: 'customer' })
      } catch {
        // Token expired or invalid — clear it
        localStorage.removeItem('puji_token')
        localStorage.removeItem('puji_role')
      } finally {
        setLoadingSession(false)
      }
    }
    restore()
  }, [])

  // ── Login: save token + user ──────────────────────────────────
  const login = (userData, token = null) => {
    const enriched = { ...userData, role: userData.role || 'customer' }
    setUser(enriched)

    if (token) {
      localStorage.setItem('puji_token', token)
      localStorage.setItem('puji_role', enriched.role)
    }

    setAuthModal(null)

    if (redirectRef.current) {
      if (enriched.role === 'admin') {
        redirectRef.current('admin')
      } else if (pendingPage) {
        redirectRef.current(pendingPage)
        setPendingPage(null)
      } else {
        redirectRef.current('portal')
      }
    }
  }

  // ── Logout ────────────────────────────────────────────────────
  const logout = () => {
    setUser(null)
    localStorage.removeItem('puji_token')
    localStorage.removeItem('puji_role')
    if (redirectRef.current) redirectRef.current('home')
  }

  const openAuth  = (type, afterLoginPage = null) => {
    if (afterLoginPage) setPendingPage(afterLoginPage)
    setAuthModal(type)
  }
  const closeAuth = () => { setAuthModal(null); setPendingPage(null) }

  return (
    <AuthContext.Provider value={{
      user,
      authModal,
      loadingSession,
      login,
      logout,
      openAuth,
      closeAuth,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

