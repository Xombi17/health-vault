"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  aadhaar: string
  dob: string
  phone: string
}

interface AuthContextType {
  user: User | null
  login: (aadhaar: string, dob: string, phone: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (aadhaar: string, dob: string, phone: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ aadhaar, dob, phone }),
    })

    if (response.ok) {
      const userData = await response.json()
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

