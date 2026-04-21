'use client'
import { useEffect } from 'react'
import { useApp } from '@/context/AppContext'

export default function Lightbox() {
  const { lightboxItems, lightboxIndex, closeLightbox, navigateLightbox } = useApp()

  const isOpen = lightboxIndex !== null
  const item = lightboxIndex !== null ? lightboxItems[lightboxIndex] : null

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox(-1)
      if (e.key === 'ArrowRight') navigateLightbox(1)
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('lightbox-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('lightbox-open')
    }
  }, [isOpen, closeLightbox, navigateLightbox])

  if (!isOpen || !item) return null

  return (
    <div id="projectLightbox" className="lightbox-overlay active">
      <div className="lightbox-backdrop" onClick={closeLightbox} />
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">✕</button>
        <button className="nav-arrow left" onClick={() => navigateLightbox(-1)} aria-label="Previous">←</button>
        <button className="nav-arrow right" onClick={() => navigateLightbox(1)} aria-label="Next">→</button>
        <div className="lightbox-frame">
          <img src={item.imgSrc} alt={item.title} />
          <div className="lightbox-footer">
            <div className="lightbox-info">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
            {!item.isTestimonial && item.liveLink && (
              <a href={item.liveLink} target="_blank" rel="noopener noreferrer" className="go-live-purple">
                Go Live <i className="fas fa-external-link-alt" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
