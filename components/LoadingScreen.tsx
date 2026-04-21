'use client'
import { useEffect, useRef } from 'react'
import { useApp } from '@/context/AppContext'

export default function LoadingScreen() {
  const { isLoaded, setIsLoaded } = useApp()
  const screenRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = subtitleRef.current
    const bar = barRef.current
    if (!el || !bar) return

    // Typing effect
    const text = 'Full Stack Developer...'
    let i = 0
    let typingTimer: ReturnType<typeof setTimeout>
    function type() {
      if (i <= text.length) {
        el!.textContent = text.slice(0, i)
        i++
        typingTimer = setTimeout(type, 70)
      }
    }
    type()

    // Progress bar
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress > 100) progress = 100
      bar.style.width = progress + '%'
      if (progress >= 100) clearInterval(interval)
    }, 200)

    const hide = () => {
      const screen = screenRef.current
      if (!screen) return
      screen.classList.add('fade-out')
      setTimeout(() => {
        if (screen) screen.style.display = 'none'
        setIsLoaded(true)
      }, 600)
    }

    // Hide when page is ready
    if (document.readyState === 'complete') {
      setTimeout(hide, 1000)
    } else {
      window.addEventListener('load', () => setTimeout(hide, 1000), { once: true })
    }

    // Fallback after 6s
    const fallback = setTimeout(hide, 6000)

    return () => {
      clearTimeout(typingTimer)
      clearInterval(interval)
      clearTimeout(fallback)
    }
  }, [setIsLoaded])

  if (isLoaded) return null

  return (
    <div id="loadingScreen" className="loading-screen" ref={screenRef}>
      <div className="loader-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="particle" />
        ))}
      </div>
      <div className="loading-content">
        <div className="loader-ring-wrap">
          <svg className="loader-ring" viewBox="0 0 120 120">
            <circle className="ring-bg" cx="60" cy="60" r="54" />
            <circle className="ring-progress" cx="60" cy="60" r="54" />
          </svg>
          <div className="loader-icon">
            <span className="bracket bracket-left">&lt;</span>
            <span className="bracket-slash">/</span>
            <span className="bracket bracket-right">&gt;</span>
          </div>
        </div>
        <h1 className="loading-name">Eid Sheba</h1>
        <p className="loading-subtitle" ref={subtitleRef} />
        <div className="loader-progress-track">
          <div className="loader-progress-bar" ref={barRef} />
        </div>
      </div>
    </div>
  )
}
