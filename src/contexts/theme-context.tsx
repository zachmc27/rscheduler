'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeContextType } from '@/types'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const stored = localStorage.getItem('theme') as 'light' | 'dark'
    if (stored) {
      setThemeState(stored)
      document.documentElement.classList.toggle('dark', stored === 'dark')
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = systemPrefersDark ? 'dark' : 'light'
      setThemeState(initialTheme)
      document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    }
  }, [])

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    return newTheme
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

