'use client'
import { createContext, useContext, useState, useCallback } from 'react'

export interface LightboxItem {
  imgSrc: string
  title: string
  subtitle: string
  liveLink?: string
  isTestimonial?: boolean
}

interface AppContextType {
  isLoaded: boolean
  setIsLoaded: (v: boolean) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (v: boolean) => void
  lightboxItems: LightboxItem[]
  setLightboxItems: React.Dispatch<React.SetStateAction<LightboxItem[]>>
  lightboxIndex: number | null
  openLightbox: (index: number) => void
  closeLightbox: () => void
  navigateLightbox: (dir: 1 | -1) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const navigateLightbox = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((prev) => {
        if (prev === null) return null
        return (prev + dir + lightboxItems.length) % lightboxItems.length
      }),
    [lightboxItems.length]
  )

  return (
    <AppContext.Provider
      value={{
        isLoaded, setIsLoaded,
        mobileMenuOpen, setMobileMenuOpen,
        lightboxItems, setLightboxItems,
        lightboxIndex, openLightbox, closeLightbox, navigateLightbox,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
