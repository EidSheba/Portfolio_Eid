'use client'
import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const scrollTop = window.pageYOffset
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight
      bar.style.width = ((scrollTop / total) * 100) + '%'
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div className="scroll-progress" ref={barRef} />
}
