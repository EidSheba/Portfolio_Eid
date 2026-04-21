'use client'
import { useEffect, useRef } from 'react'
import { useApp } from '@/context/AppContext'

const topRow = [1, 2, 3, 4, 5, 6]
const bottomRow = [7, 8, 9, 10, 11, 12]

export default function Testimonials() {
  const { lightboxItems, setLightboxItems, openLightbox } = useApp()
  const followerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Append testimonial items to lightbox items list (after portfolio items)
  useEffect(() => {
    const testimonialItems = [...topRow, ...bottomRow].map((n) => ({
      imgSrc: `/images/test${n}.png`,
      title: 'Client Feedback',
      subtitle: 'Verified Testimonial',
      isTestimonial: true,
    }))
    setLightboxItems((prev: import('@/context/AppContext').LightboxItem[]) => {
      if (prev.some((i: import('@/context/AppContext').LightboxItem) => i.isTestimonial)) return prev
      return [...prev, ...testimonialItems]
    })
  }, [setLightboxItems])

  // Cursor follower
  useEffect(() => {
    const follower = followerRef.current
    if (!follower) return
    let mouseX = 0, mouseY = 0, fx = 0, fy = 0, hovering = false

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    document.addEventListener('mousemove', onMove)

    let rafId: number
    function animate() {
      if (!hovering) {
        fx += (mouseX - fx) * 0.1
        fy += (mouseY - fy) * 0.1
        follower!.style.left = fx + 'px'
        follower!.style.top = fy + 'px'
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const cards = document.querySelectorAll('.testimonial-card')
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => { hovering = true; fx = mouseX; fy = mouseY })
      card.addEventListener('mouseleave', () => { hovering = false })
    })

    // Intersection observer
    const section = sectionRef.current
    if (section) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) section.classList.add('in-view') },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )
      obs.observe(section)
    }

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const handleCardClick = (imgSrc: string) => {
    // Find index in lightboxItems
    const idx = lightboxItems.findIndex((item) => item.imgSrc === imgSrc)
    if (idx !== -1) openLightbox(idx)
  }

  const renderCard = (n: number) => (
    <div
      key={n}
      className="testimonial-card"
      tabIndex={0}
      role="button"
      onClick={() => handleCardClick(`/images/test${n}.png`)}
    >
      <img src={`/images/test${n}.png`} alt={`Client Testimonial ${n}`} />
    </div>
  )

  return (
    <section id="testimonials" className="testimonials-section d-flex flex-column" ref={sectionRef}>
      <div className="text-center">
        <h2 className="section-title mb-4">TESTIMONIALS</h2>
        <div className="animated-line">
          <span className="animated-bullet" />
        </div>
      </div>
      <div className="infinite-moving-wall">
        <div className="edge-fade-left" />
        <div className="edge-fade-right" />
        <div className="moving-row top-row" id="topRow">
          {topRow.map(renderCard)}
          {topRow.map((n) => ({ ...renderCard(n), key: `dup-${n}` }))}
        </div>
        <div className="moving-row bottom-row" id="bottomRow">
          {bottomRow.map(renderCard)}
          {bottomRow.map((n) => ({ ...renderCard(n), key: `dup-${n}` }))}
        </div>
      </div>
      <div className="cursor-follower" ref={followerRef} />
    </section>
  )
}
