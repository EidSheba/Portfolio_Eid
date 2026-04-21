'use client'
import { useEffect, useRef } from 'react'
import { useApp } from '@/context/AppContext'

export default function Home() {
  const { isLoaded } = useApp()
  const sectionRef = useRef<HTMLElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded) return
    const section = sectionRef.current
    if (section) setTimeout(() => section.classList.add('visible'), 20)
    if (h1Ref.current) setTimeout(() => h1Ref.current!.classList.add('visible'), 100)
    if (pRef.current) setTimeout(() => pRef.current!.classList.add('visible'), 800)
    if (socialRef.current) {
      setTimeout(() => {
        socialRef.current!.classList.add('visible')
        socialRef.current!.querySelectorAll('a').forEach((icon, i) => {
          setTimeout(() => {
            icon.style.transitionDelay = `${i * 0.15}s`
            icon.classList.add('visible')
          }, i * 150)
        })
      }, 1400)
    }
    if (buttonsRef.current) setTimeout(() => buttonsRef.current!.classList.add('visible'), 2000)
  }, [isLoaded])

  return (
    <section
      className="home d-flex flex-column justify-content-center text-center vh-100"
      id="home"
      ref={sectionRef}
    >
      <video className="video-background" autoPlay loop muted playsInline>
        <source src="/images/animated.mp4" type="video/mp4" />
      </video>
      <div className="container position-relative">
        <h1 className="display-4 fw-bold mb-3" ref={h1Ref}>
          Hi, I am <span>Eid Sheba</span>
        </h1>
        <p className="lead mb-1" ref={pRef}>
          I am a Full Stack Web Developer. I provide clean code, pixel-perfect designs, and develop both frontend and
          backend solutions. I also make websites more interactive with modern web animations and dynamic features.
        </p>
        <div className="social-icons mb-4" ref={socialRef}>
          <a href="https://github.com/EidSheba" target="_blank" aria-label="Visit Eid Sheba's GitHub profile">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/eid-sheba-428885392" target="_blank" aria-label="Visit Eid Sheba's LinkedIn profile">
            <i className="fab fa-linkedin" />
          </a>
          <a href="https://www.facebook.com/eid.sheba.3" target="_blank" aria-label="Visit Eid Sheba's Facebook profile">
            <i className="fab fa-facebook-f" />
          </a>
        </div>
        <div className="home-buttons-container mb-4" ref={buttonsRef}>
          <a
            href="/images/Eid-ShebaCV .pdf"
            download="Eid-Sheba-CV.pdf"
            className="btn btn-download-cv px-4 py-2 text-center"
          >
            <i className="fas fa-download me-2" />Download CV
          </a>
          <a
            href="https://wa.me/201281249719?text=Hi%20Eid%2C%20I%20would%20like%20to%20start%20working%20together%20on%20a%20project"
            className="btn btn-start-working px-4 py-2 text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp me-2" />Start Working
          </a>
        </div>
      </div>
    </section>
  )
}
