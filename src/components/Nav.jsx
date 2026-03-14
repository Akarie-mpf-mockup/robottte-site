import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [
    { label: 'Philosophy', href: '#why' },
    { label: 'Products', href: '#products' },
    { label: 'Results', href: '#results' },
    { label: 'News', href: '#news' },
    { label: 'Careers', href: '#careers' },
  ]
  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 'var(--nav-h)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 40px', zIndex: 200,
          background: scrolled ? 'rgba(2,2,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(41,171,226,0.15)' : '1px solid transparent',
          transition: 'all 0.5s ease',
        }}>

        {/* ロゴ */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/images/正方形logo.jpg" alt="robottte" style={{ width: 32, height: 32, borderRadius: 6 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>robottte</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="nav-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{l.label}</a>
          ))}
          <a href="#contact" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', padding: '8px 20px', border: '1px solid rgba(41,171,226,0.4)', borderRadius: 4, color: 'var(--accent)', transition: 'background 0.2s' }}
            onMouseEnter={e => e.target.style.background = 'rgba(41,171,226,0.1)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}>Contact</a>
        </div>

        <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5 }}>
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2 }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(2,2,10,0.97)', zIndex: 199, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}
            onClick={() => setOpen(false)}>
            {[...links, { label: 'Contact', href: '#contact' }].map(l => (
              <a key={l.href} href={l.href} style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)' }}>{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media (max-width: 860px) { .nav-desktop { display: none !important; } .nav-hamburger { display: flex !important; } }`}</style>
    </>
  )
}