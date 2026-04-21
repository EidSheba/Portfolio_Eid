'use client'
import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [expanded, setExpanded] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const checkWidth = () => {
      setShowBtn(window.innerWidth < 1200)
      if (window.innerWidth >= 1200) setExpanded(true)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Observer 1: toggles .animate on section-title, animated-line, circle-img, all p's
    const animateObs = new IntersectionObserver(
      ([entry]) => {
        const title = section.querySelector('.section-title')
        const line = section.querySelector('.animated-line')
        const image = section.querySelector('.circle-img')
        const paragraphs = section.querySelectorAll('p')

        if (entry.isIntersecting) {
          title?.classList.add('animate')
          line?.classList.add('animate')
          image?.classList.add('animate')
          paragraphs.forEach((p) => p.classList.add('animate'))
        } else {
          title?.classList.remove('animate')
          line?.classList.remove('animate')
          image?.classList.remove('animate')
          paragraphs.forEach((p) => p.classList.remove('animate'))
        }
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.1 }
    )

    // Observer 2: staggered .visible for section-title, animated-line, circle-img, about-text
    const visibleElements: { selector: string; delay: number }[] = [
      { selector: '.section-title', delay: 0 },
      { selector: '.animated-line', delay: 50 },
      { selector: '.circle-img', delay: 100 },
      { selector: '.about-text', delay: 250 },
    ]

    const visibleObservers = visibleElements.map(({ selector, delay }) => {
      const el = section.querySelector(selector)
      if (!el) return null

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('visible'), delay)
          } else {
            setTimeout(() => el.classList.remove('visible'), delay)
          }
        },
        { rootMargin: '-50px 0px -50px 0px', threshold: 0.1 }
      )
      obs.observe(el)
      return obs
    })

    animateObs.observe(section)

    return () => {
      animateObs.disconnect()
      visibleObservers.forEach((obs) => obs?.disconnect())
    }
  }, [])

  return (
    <section id="about" className="about p-5 d-flex flex-column" ref={sectionRef}>
      <div className="stars" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="container text-center">
        <h2 className="section-title mb-4">ABOUT</h2>
        <div className="animated-line">
          <span className="animated-bullet" />
        </div>
        <div className="aboutContent">
          <div className="row">
            <div className="wrapper">
              <img
                src="/images/Gemini_Generated_Image_d1pce7d1pce7d1pc.webp"
                alt="Eid Sheba's profile photo"
                className="circle-img"
              />
              <div className="about-text">
                <p className={`about-paragraph${expanded ? ' expanded' : ''}`}>
                  <span className="about-content">
                    Full Stack Developer and Expert in WordPress, Shopify, and Salla. I don&apos;t just build websites; I
                    turn your project into a scalable, profit-driven business. I specialize in transforming complex
                    ideas and Figma designs into high-converting digital solutions with seamless user experiences.
                    Beyond writing code, I focus on building robust architectures and high-performance platforms that
                    guarantee long-term growth and technical sustainability. My approach integrates clean code,
                    advanced SEO optimization, and ironclad security to ensure your business stays ahead of the
                    competition. Whether it&apos;s a custom-built application or a specialized e-commerce store, I am
                    dedicated to delivering professional execution that bridges the gap between creative vision and
                    commercial success.
                  </span>
                </p>
                {showBtn && (
                  <button type="button" className="read-more-btn" onClick={() => setExpanded((v) => !v)}>
                    {expanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
