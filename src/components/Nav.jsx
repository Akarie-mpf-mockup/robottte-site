import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [
    { label: 'Philosophy', href: '#why' },
    { label: 'Products', href: '#products' },
    { label: 'Team', href: '#team' },
    { label: 'Company', href: '#about' },
    { label: 'News', href: '#news' },
    { label: 'Careers', href: '#careers' },
  ]
  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 'var(--nav-h)',
          zIndex: 200,
          background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,160,232,0.12)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.4s ease',
        }}>

        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/robottte納品_Horizontal Set.png"
            alt="robottte"
            style={{ height: 112, width: 112, objectFit: 'contain' }}
          />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="nav-desktop">
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{l.label}</a>
          ))}
          <a href="#contact"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 600, padding: '9px 22px', background: 'var(--accent)', borderRadius: 8, color: '#fff', transition: 'background 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.target.style.background = 'var(--accent-dark)'; e.target.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.target.style.background = 'var(--accent)'; e.target.style.transform = 'translateY(0)' }}>Contact</a>
        </div>

        <button onClick={() => setOpen(!open)} className="nav-hamburger"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}>
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'var(--text)', borderRadius: 2 }} />
        </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.98)', zIndex: 199, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}
            onClick={() => setOpen(false)}>
            {[...links, { label: 'Contact', href: '#contact' }].map(l => (
              <a key={l.href} href={l.href} style={{ fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text)' }}>{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media (max-width: 860px) { .nav-desktop { display: none !important; } .nav-hamburger { display: flex !important; } }`}</style>
    </>
  )
}
