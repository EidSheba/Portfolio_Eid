'use client'
import { useEffect, useRef } from 'react'
import { skillCategories } from '@/data/skills'

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Particle animation keyframes
    const style = document.createElement('style')
    style.textContent = `
      @keyframes particleFloat {
        0% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
      }
    `
    document.head.appendChild(style)

    // Magnetic + particle effect for each skill item
    const items = section.querySelectorAll<HTMLDivElement>('.skill-item-enhanced')
    items.forEach((item) => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const mx = (x / rect.width) * 15
        const my = (y / rect.height) * 15
        item.style.transform = `translateY(-8px) scale(1.05) rotateX(${-my}deg) rotateY(${mx}deg)`
      })
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)'
      })

      item.addEventListener('mouseenter', () => {
        const count = 8
        Array.from({ length: count }).forEach((_, i) => {
          setTimeout(() => {
            const p = document.createElement('div')
            p.className = 'skill-particle'
            const angle = (Math.PI * 2 * i) / count
            const vel = 50 + Math.random() * 50
            const life = 1500 + Math.random() * 1000
            p.style.cssText = `position:absolute;width:4px;height:4px;background:var(--orange);border-radius:50%;pointer-events:none;z-index:1000;left:50%;top:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px rgba(254,197,68,.8);animation:particleFloat ${life}ms ease-out forwards;`
            p.style.setProperty('--tx', `${Math.cos(angle) * vel}px`)
            p.style.setProperty('--ty', `${Math.sin(angle) * vel}px`)
            item.appendChild(p)
            setTimeout(() => p.remove(), life)
          }, i * 50)
        })
      })
    })

    // Section visibility observer
    const mainTitle = section.querySelector<HTMLElement>('.skills-main-title')
    const animLine = section.querySelector<HTMLElement>('.animated-line')
    const wrapper = section.querySelector<HTMLElement>('.skills-section-wrapper')

    const mainObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !section.classList.contains('main-animated')) {
          section.classList.add('main-animated')
          setTimeout(() => mainTitle?.classList.add('visible'), 200)
          setTimeout(() => animLine?.classList.add('visible'), 400)
          wrapper?.classList.add('visible')
        }
      },
      { rootMargin: '-50px 0px -50px 0px', threshold: 0.1 }
    )
    mainObs.observe(section)

    // Category observers
    const categories = section.querySelectorAll<HTMLDivElement>('.skill-category')
    const catObservers: IntersectionObserver[] = []

    categories.forEach((cat) => {
      const title = cat.querySelector<HTMLElement>('.skill-category-title')
      const entrance = cat.querySelector<HTMLElement>('.skill-category-entrance')
      const catItems = cat.querySelectorAll<HTMLElement>('.skill-item-enhanced')
      if (!title) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !cat.classList.contains('category-animated')) {
            cat.classList.add('category-animated')
            title.classList.add('visible')
            entrance?.classList.add('visible')
            catItems.forEach((item, idx) => {
              setTimeout(() => item.classList.add('visible'), idx * 200)
            })
          }
        },
        { rootMargin: '0px 0px -20% 0px', threshold: 0.1 }
      )
      obs.observe(title)
      catObservers.push(obs)
    })

    // Fallback after 4s
    const fallback = setTimeout(() => {
      if (!section.classList.contains('main-animated')) {
        mainTitle?.classList.add('visible')
        animLine?.classList.add('visible')
        wrapper?.classList.add('visible')
        categories.forEach((cat) => {
          cat.querySelector('.skill-category-title')?.classList.add('visible')
          cat.querySelector('.skill-category-entrance')?.classList.add('visible')
          cat.querySelectorAll('.skill-item-enhanced').forEach((item) => item.classList.add('visible'))
        })
      }
    }, 4000)

    return () => {
      mainObs.disconnect()
      catObservers.forEach((o) => o.disconnect())
      clearTimeout(fallback)
      style.parentNode?.removeChild(style)
    }
  }, [])

  return (
    <section id="skills" className="p-5 d-flex flex-column" ref={sectionRef}>
      <div className="snowflakes">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="snowflake" />
        ))}
      </div>
      <div className="container text-center">
        <h2 className="section-title skills-main-title mb-4">MY SKILLS</h2>
        <div className="animated-line">
          <span className="animated-bullet" />
        </div>
        <div className="skills-wrapper mt-5 skills-section-wrapper">
          <div className="skills-container">
            {skillCategories.map((cat, ci) => (
              <div key={cat.title} className={`skill-category${ci > 0 ? ' mt-5' : ''}`}>
                <div className="skill-category-entrance">
                  <h3 className="skill-title skill-category-title">{cat.title}</h3>
                  <div className="skills-grid">
                    {cat.skills.map((skill, si) => (
                      <div
                        key={skill.label}
                        className="skill-item skill-item-enhanced"
                        style={{ '--item-index': si } as React.CSSProperties}
                      >
                        <i className={skill.icon} />
                        <span>{skill.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="main_spinner top-right">
        <div className="dot dot_1" />
        <div className="dot dot_2" />
        <div className="center_mass" />
      </div>
    </section>
  )
}
