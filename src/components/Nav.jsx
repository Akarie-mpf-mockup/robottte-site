import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { label: 'サービス', href: '#services' },
    { label: '会社概要', href: '#about' },
    { label: '採用', href: '#team' },
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
        zIndex: 100,
        background: scrolled ? 'rgba(4,4,10,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
      }}
    >
      <a href="#" style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.03em',
        background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>robottte</a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        {links.map(l => (
          <a key={l.href} href={l.href} style={{
            fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-muted)', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--text)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{l.label}</a>
        ))}
        <a href="#contact" style={{
          padding: '8px 22px', border: '1px solid rgba(79,124,255,0.5)',
          borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent)', transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.target.style.background = 'var(--accent)'; e.target.style.color = '#fff' }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)' }}
        >お問い合わせ</a>
      </div>
    </motion.nav>
  )
}
