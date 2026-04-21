'use client'
import { useEffect } from 'react'

export default function CursorEffect() {
  useEffect(() => {
    const colors = ['#ffcc00', '#ff6b35', '#4ecdc4', '#f72585', '#7209b7']
    let cursorAngle = 0
    let morphPhase = 0

    const canvas = document.createElement('div')
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;'
    document.body.appendChild(canvas)

    const mainCursor = document.createElement('div')
    mainCursor.style.cssText =
      'position:fixed;width:30px;height:30px;pointer-events:none;z-index:10000;transition:transform 0.1s ease-out;'
    document.body.appendChild(mainCursor)

    function isClickable(el: Element): boolean {
      const tags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL']
      const classes = ['btn', 'button', 'nav-link', 'hireBtn', 'submit-btn', 'read-more-btn']
      return (
        tags.includes((el as HTMLElement).tagName) ||
        classes.some((c) => el.classList.contains(c)) ||
        (el as HTMLElement).style.cursor === 'pointer'
      )
    }

    const style = document.createElement('style')
    style.textContent = `
      @keyframes morphFade {
        0%   { opacity:.8; transform:scale(1) rotate(0deg); filter:blur(.5px) hue-rotate(0deg); }
        25%  { opacity:.9; transform:scale(1.3) rotate(90deg); filter:blur(1px) hue-rotate(90deg); }
        50%  { opacity:.6; transform:scale(.8) rotate(180deg); filter:blur(1.5px) hue-rotate(180deg); }
        75%  { opacity:.3; transform:scale(1.1) rotate(270deg); filter:blur(2px) hue-rotate(270deg); }
        100% { opacity:0; transform:scale(.2) rotate(360deg); filter:blur(3px) hue-rotate(360deg); }
      }
      @keyframes pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.2);opacity:.7;} }
      @keyframes clickPulse {
        0%,100%{transform:scale(1.2);opacity:1;}
        50%{transform:scale(1.4);opacity:.8;}
      }
    `
    document.head.appendChild(style)

    const onMove = (e: MouseEvent) => {
      mainCursor.style.left = e.clientX - 15 + 'px'
      mainCursor.style.top = e.clientY - 15 + 'px'

      cursorAngle += 5
      morphPhase += 0.1

      const clickable = isClickable(e.target as Element)
      const color = colors[Math.floor(Math.random() * colors.length)]
      const shapeType = Math.floor(Math.random() * 4)
      const size = Math.random() * 15 + 8
      const rotation = Math.random() * 360
      const morphAmount = Math.sin(morphPhase) * 20

      const trail = document.createElement('div')
      let shapeCSS = ''
      switch (shapeType) {
        case 0:
          shapeCSS = `width:0;height:0;border-left:${size / 2}px solid transparent;border-right:${size / 2}px solid transparent;border-bottom:${size}px solid ${color};background:transparent;`
          break
        case 1:
          shapeCSS = `width:${size}px;height:${size}px;background:linear-gradient(45deg,${color},${color}88);transform:rotate(45deg) scale(${1 + Math.sin(morphPhase) * 0.3});`
          break
        case 2:
          shapeCSS = `width:${size}px;height:${size}px;background:${color};clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);`
          break
        default:
          shapeCSS = `width:${size}px;height:${size}px;background:linear-gradient(135deg,${color},${color}66);clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);`
      }

      trail.style.cssText = `position:absolute;left:${e.clientX + Math.random() * 20 - 10}px;top:${e.clientY + Math.random() * 20 - 10}px;${shapeCSS}pointer-events:none;animation:morphFade 1.2s ease-out forwards;filter:blur(.5px);opacity:.8;transform:rotate(${rotation}deg) scale(${1 + morphAmount / 100});box-shadow:0 0 15px ${color}66,0 0 30px ${color}33;`
      canvas.appendChild(trail)
      setTimeout(() => trail.parentNode?.removeChild(trail), 1200)

      const ci = clickable ? Math.floor(cursorAngle / 36) % colors.length : Math.floor(cursorAngle / 72) % colors.length
      const c = colors[ci]
      if (clickable) {
        mainCursor.innerHTML = `<div style="width:100%;height:100%;border:none;border-radius:50%;background:radial-gradient(circle,${c} 0%,${c}88 40%,${c}44 70%,transparent 100%);box-shadow:0 0 20px ${c}88,0 0 40px ${c}44,inset 0 0 15px ${c}66;animation:clickPulse .4s infinite;transform:scale(1.2);"></div>`
      } else {
        mainCursor.innerHTML = `<div style="width:100%;height:100%;border:3px solid ${c};border-radius:50%;box-shadow:0 0 15px ${c}66,0 0 30px ${c}33,inset 0 0 10px ${c}44;animation:pulse .8s infinite;background:radial-gradient(circle,${c}22 0%,transparent 70%);"></div>`
      }
    }

    document.body.style.cursor = 'none'
    document.addEventListener('mousemove', onMove)

    return () => {
      document.removeEventListener('mousemove', onMove)
      canvas.parentNode?.removeChild(canvas)
      mainCursor.parentNode?.removeChild(mainCursor)
      style.parentNode?.removeChild(style)
      document.body.style.cursor = ''
    }
  }, [])

  return null
}
