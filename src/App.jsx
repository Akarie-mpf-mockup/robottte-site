import { useState } from 'react'
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

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  return (
    <>
      {!introComplete && <Intro onDone={() => setIntroComplete(true)} />}
      <Nav />
      <Hero />
      <Why />
      <Products />
      <Team />
      <About />
      <News />
      <Careers />
      <Contact />
      <Footer />
    </>
  )
}