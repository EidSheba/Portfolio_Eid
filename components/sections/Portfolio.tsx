'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { projects } from '@/data/projects'
import { useApp } from '@/context/AppContext'

function CardBorderSVG() {
  return (
    <svg className="card-border">
      <defs>
        <linearGradient id="gradientBorder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff00cc" />
          <stop offset="50%" stopColor="#3333ff" />
          <stop offset="100%" stopColor="#00ffcc" />
        </linearGradient>
      </defs>
      <rect />
    </svg>
  )
}

function ProjectCard({
  project,
  cardIndex,
  onCardClick,
}: {
  project: (typeof projects)[0]
  cardIndex: number
  onCardClick: (cardIndex: number, imgSrc: string) => void
}) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % project.images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [project.images.length])

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.go-live-btn, a')) return
    onCardClick(cardIndex, project.images[activeSlide].src)
  }

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 premium-reveal" onClick={handleCardClick} style={{ cursor: 'zoom-in' }}>
        <CardBorderSVG />
        <div className="card-slider">
          {project.images.map((img, i) => (
            <img key={i} src={img.src} className={i === activeSlide ? 'active' : ''} alt={img.alt} />
          ))}
        </div>
        <div className="indicators">
          {project.images.map((_, i) => (
            <span
              key={i}
              className={i === activeSlide ? 'active' : ''}
              onClick={(e) => { e.stopPropagation(); setActiveSlide(i) }}
            />
          ))}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="text-center">
          <a href={project.liveLink} className="go-live-btn" target="_blank" rel="noopener noreferrer" title="View Project">
            Go Live <i className="fas fa-eye" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const { setLightboxItems, openLightbox } = useApp()
  const sectionRef = useRef<HTMLElement>(null)

  // Register lightbox items for portfolio cards
  useEffect(() => {
    const portfolioItems = projects.map((p) => ({
      imgSrc: p.images[0].src,
      title: p.title,
      subtitle: p.subtitle,
      liveLink: p.liveLink,
    }))
    setLightboxItems(portfolioItems)
  }, [setLightboxItems])

  // Premium reveal animation
  useEffect(() => {
    const cards = document.querySelectorAll('.premium-reveal')
    if (!cards.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target as HTMLElement)
            setTimeout(() => entry.target.classList.add('revealed'), (index % 3) * 200)
            obs.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '-20px 0px 0px 0px', threshold: 0.1 }
    )

    cards.forEach((card) => obs.observe(card))
    return () => obs.disconnect()
  }, [])

  // Portfolio title animation
  useEffect(() => {
    const title = document.querySelector('.port .section-title')
    if (!title) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) title.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(title)
    return () => obs.disconnect()
  }, [])

  const handleCardClick = useCallback(
    (cardIndex: number, imgSrc: string) => {
      // Update current image for the lightbox
      setLightboxItems((prev: import('@/context/AppContext').LightboxItem[]) => {
        const updated = [...prev]
        if (updated[cardIndex]) updated[cardIndex] = { ...updated[cardIndex], imgSrc }
        return updated
      })
      openLightbox(cardIndex)
    },
    [openLightbox, setLightboxItems]
  )

  return (
    <section
      id="portfolio"
      className="port d-flex flex-column justify-content-center align-items-center"
      ref={sectionRef}
      style={{
        perspective: '900px',
        gap: '50px',
        background:
          'radial-gradient(circle at 10% 20%, rgba(254,197,68,.05) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(254,197,68,.05) 0%, transparent 20%), #0a101e',
        minHeight: '100vh',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
        animation: 'gradientBG 15s ease infinite',
      }}
    >
      <div className="container">
        <div className="container text-center">
          <h2 className="section-title mb-4">Portfolio</h2>
          <div className="animated-line">
            <span className="animated-bullet" />
          </div>
        </div>
        <div className="container">
          <div className="row g-4">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                cardIndex={i}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
