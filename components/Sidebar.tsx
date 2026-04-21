'use client'
import { useEffect, useRef } from 'react'
import { useApp } from '@/context/AppContext'

const navItems = [
  { href: '#home', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#portfolio', label: 'PORTFOLIO' },
  { href: '#testimonials', label: 'TESTIMONIALS' },
  { href: '#contact', label: 'CONTACT' },
]

export default function Sidebar() {
  const { mobileMenuOpen, setMobileMenuOpen } = useApp()
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Active link on scroll
  useEffect(() => {
    const setActive = () => {
      const scrollPos = window.scrollY + 100
      document.querySelectorAll('section').forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight
        const id = section.getAttribute('id')
        if (scrollPos >= top && scrollPos < top + height) {
          navRefs.current.forEach((link) => {
            if (!link) return
            link.classList.remove('active')
            if (link.getAttribute('href') === `#${id}`) link.classList.add('active')
          })
        }
      })
    }
    window.addEventListener('scroll', setActive, { passive: true })
    setActive()
    return () => window.removeEventListener('scroll', setActive)
  }, [])

  // Animate nav items on load
  useEffect(() => {
    navRefs.current.forEach((link, i) => {
      if (!link) return
      const item = link.parentElement
      if (!item) return
      setTimeout(() => item.classList.add('visible'), 300 + i * 100)
    })
  }, [])

  const handleNavClick = () => {
    if (window.innerWidth < 992) setMobileMenuOpen(false)
  }

  return (
    <div className={`sideHeader vh-100 p-4${mobileMenuOpen ? ' active' : ''}`} id="sidebar">
      <img
        src="/images/Gemini_Generated_Image_d1pce7d1pce7d1pc.webp"
        className="img-fluid rounded-circle mb-4"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        alt="Eid Sheba's profile photo"
      />
      <ul className="nav flex-column justify-content-center align-items-center">
        {navItems.map(({ href, label }, i) => (
          <li key={href} className="nav-item">
            <a
              href={href}
              className="nav-link text-light mb-2"
              ref={(el) => { navRefs.current[i] = el }}
              onClick={handleNavClick}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="https://wa.me/201281249719?text=Hi%20Eid%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity."
        className="btn hireBtn rounded-pill btn-outline-warning w-100 mt-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp me-2" />Hire Me
      </a>
    </div>
  )
}
