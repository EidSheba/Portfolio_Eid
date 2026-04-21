'use client'
import { useEffect, useRef, useState } from 'react'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  // Intersection observer for animations
  useEffect(() => {
    const els = [
      { sel: '.contact-section .section-header h2', delay: 0 },
      { sel: '.contact-section .section-header p', delay: 200 },
    ]
    const observers: IntersectionObserver[] = []
    els.forEach(({ sel, delay }) => {
      const el = document.querySelector(sel)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setTimeout(() => el.classList.add('visible'), delay) },
        { threshold: 0.1 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    const infoItems = document.querySelectorAll('.info-item')
    infoItems.forEach((item, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setTimeout(() => item.classList.add('visible'), i * 100) },
        { threshold: 0.1 }
      )
      obs.observe(item)
      observers.push(obs)
    })

    const formGroups = document.querySelectorAll('.form-group')
    formGroups.forEach((group, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setTimeout(() => group.classList.add('visible'), i * 100) },
        { threshold: 0.1 }
      )
      obs.observe(group)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const showNotification = (msg: string, type: 'success' | 'error') => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, subject, message } = form
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields!', 'error')
      return
    }
    setSending(true)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      const res = await fetch('https://formspree.io/f/mblaroka', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        showNotification('Message sent successfully!', 'success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        showNotification('Failed to send message. Please try again.', 'error')
      }
    } catch {
      showNotification('Error connecting to server!', 'error')
    }
    setSending(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Feel free to reach out to me for any questions or opportunities</p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <div className="icon"><i className="fas fa-envelope" /></div>
              <div className="details"><h3>Email</h3><p>shebaeid@gmail.com</p></div>
            </div>
            <div className="info-item">
              <div className="icon"><i className="fas fa-phone" /></div>
              <div className="details"><h3>Phone</h3><a href="tel:+201281249719" className="contact-link">+20 1281249719</a></div>
            </div>
            <div className="info-item">
              <div className="icon"><i className="fas fa-map-marker-alt" /></div>
              <div className="details"><h3>Location</h3><p>Cairo, Egypt</p></div>
            </div>
            <div className="info-item">
              <a href="https://wa.me/201281249719" target="_blank" rel="noopener" className="contact-link whatsapp-link">
                <div className="icon"><i className="fab fa-whatsapp" /></div>
                <div className="details"><h3>WhatsApp</h3><p>Chat with me</p></div>
              </a>
            </div>
            <div className="social-links">
              <a href="https://github.com/EidSheba" className="social-icon" aria-label="GitHub"><i className="fab fa-github" /></a>
              <a href="https://www.linkedin.com/in/eid-sheba-428885392" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
              <a href="https://www.facebook.com/eid.sheba.3" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href="https://www.instagram.com/eid_sheba/" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
            {(['name', 'email', 'subject'] as const).map((field) => (
              <div key={field} className="form-group">
                <div className="form-field">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    className="form-input"
                    value={form[field]}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor={field} className="form-label">
                    {field === 'name' ? 'Your Name' : field === 'email' ? 'Your Email' : 'Subject'}
                  </label>
                  <span className="focus-border" />
                </div>
              </div>
            ))}
            <div className="form-group">
              <div className="form-field">
                <textarea
                  id="message"
                  name="message"
                  className="form-input"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="message" className="form-label">Your Message</label>
                <span className="focus-border" />
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={sending}>
              <span>{sending ? 'Sending...' : 'Send Message'}</span>
              <i className={`fas ${sending ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} />
            </button>
          </form>
        </div>
      </div>

      <a
        href="https://wa.me/201281249719?text=Hi%20Eid%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp" />
        <span>Chat</span>
      </a>

      {notification && (
        <div className={`notification ${notification.type} show`}>{notification.msg}</div>
      )}
    </section>
  )
}
