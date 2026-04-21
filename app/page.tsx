import { AppProvider } from '@/context/AppContext'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollProgress from '@/components/ScrollProgress'
import MobileMenuToggle from '@/components/MobileMenuToggle'
import Sidebar from '@/components/Sidebar'
import CursorEffect from '@/components/CursorEffect'
import Home from '@/components/sections/Home'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import MarqueeSection from '@/components/sections/Marquee'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Lightbox from '@/components/Lightbox'

export default function Page() {
  return (
    <AppProvider>
      <ScrollProgress />
      <LoadingScreen />
      <CursorEffect />
      <MobileMenuToggle />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1">
          <Home />
          <About />
          <Skills />
          <MarqueeSection />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
      </div>
      <Lightbox />
    </AppProvider>
  )
}
