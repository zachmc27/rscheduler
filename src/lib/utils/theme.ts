export type Theme = 'light' | 'dark'

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  
  const stored = localStorage.getItem('theme') as Theme
  if (stored) return stored
  
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return systemPrefersDark ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('theme', theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function toggleTheme() {
  const currentTheme = getTheme()
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  return newTheme
}

