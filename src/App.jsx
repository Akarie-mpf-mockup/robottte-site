import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Why from './components/Why'
import Products from './components/Products'
import Team from './components/Team'
import About from './components/About'
import News from './components/News'
import Careers from './components/Careers'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Intro from './components/Intro'
import PressModal from './components/PressModal'
import { pressReleases } from './data/press/preSeriesA'

const PRESS_HASH_PREFIX = '#news/'

function readPressFromHash() {
  if (typeof window === 'undefined') return null
  const h = window.location.hash || ''
  if (!h.startsWith(PRESS_HASH_PREFIX)) return null
  const slug = h.slice(PRESS_HASH_PREFIX.length)
  return pressReleases[slug] ? slug : null
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [activeSlug, setActiveSlug] = useState(() => readPressFromHash())

  useEffect(() => {
    const onHash = () => setActiveSlug(readPressFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const openPress = (slug) => {
    if (!pressReleases[slug]) return
    setActiveSlug(slug)
    if (window.location.hash !== PRESS_HASH_PREFIX + slug) {
      history.pushState(null, '', PRESS_HASH_PREFIX + slug)
    }
  }

  const closePress = () => {
    setActiveSlug(null)
    if ((window.location.hash || '').startsWith(PRESS_HASH_PREFIX)) {
      history.pushState(null, '', window.location.pathname + window.location.search)
    }
  }

  const activePress = activeSlug ? pressReleases[activeSlug] : null

  return (
    <>
      {!introComplete && <Intro onDone={() => setIntroComplete(true)} />}
      <Nav />
      <Hero />
      <Why />
      <Products />
      <Team />
      <About onOpenPress={openPress} />
      <News onOpenPress={openPress} />
      <Careers />
      <Contact />
      <Footer />
      <PressModal press={activePress} onClose={closePress} />
    </>
  )
}
