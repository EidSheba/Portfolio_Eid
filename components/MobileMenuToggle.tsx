'use client'
import { useApp } from '@/context/AppContext'

export default function MobileMenuToggle() {
  const { mobileMenuOpen, setMobileMenuOpen } = useApp()

  const toggle = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <button
      className={`mobile-menu-toggle${mobileMenuOpen ? ' active' : ''}`}
      id="mobileMenuToggle"
      onClick={toggle}
      aria-label="Toggle mobile menu"
    >
      <span
        style={{
          transform: mobileMenuOpen ? 'rotate(45deg) translate(7px, 7px)' : 'none',
        }}
      />
      <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
      <span
        style={{
          transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none',
        }}
      />
    </button>
  )
}
