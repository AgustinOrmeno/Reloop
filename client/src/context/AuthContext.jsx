import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = authService.getUser()
    if (savedUser) setUser(savedUser)
    setLoading(false)
  }, [])

  const login = async (data) => {
    const response = await authService.login(data)
    setUser(response.user)
    return response
  }

  const register = async (data) => {
    const response = await authService.register(data)
    setUser(response.user)
    return response
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}