import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2, o: Math.random() * 0.6 + 0.2,
      s: Math.random() * 0.003 + 0.001, p: Math.random() * Math.PI * 2,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.p += s.s
        const o = s.o * (0.6 + 0.4 * Math.sin(s.p))
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,210,255,${o})`; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
}

function PlanetRings() {
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
      {[600, 800, 1000, 1300].map((size, i) => (
        <motion.div key={size} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: `1px solid rgba(79,124,255,${0.12 - i * 0.02})`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{ rotate: 360 }} transition={{ duration: 60 + i * 20, repeat: Infinity, ease: 'linear' }} />
      ))}
      <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle at 35% 35%, rgba(79,124,255,0.3), rgba(2,2,20,0.95))', boxShadow: '0 0 80px rgba(79,124,255,0.15), inset 0 0 60px rgba(79,124,255,0.1)', border: '1px solid rgba(79,124,255,0.2)' }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(79,124,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
    </div>
  )
}

const items = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', textAlign: 'center', padding: 'calc(var(--nav-h) + 40px) 24px 80px' }}>
      <StarField />
      <PlanetRings />
      <motion.div style={{ position: 'relative', y, opacity, maxWidth: 900, zIndex: 10 }} variants={items} initial="hidden" animate="show">
        <motion.p variants={item} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ width: 32, height: 1, background: 'var(--accent)', display: 'block' }} />
          Habitable Zone — HR Technology
          <span style={{ width: 32, height: 1, background: 'var(--accent)', display: 'block' }} />
        </motion.p>
        <motion.h1 variants={item} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 12 }}>
          <span style={{ color: 'var(--text)' }}>人が壊れない</span><br />
          <span style={{ background: 'linear-gradient(135deg, #4f7cff, #7c5cfc, #00d4aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>労働圏を設計する。</span>
        </motion.h1>
        <motion.p variants={item} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: 40 }}>
          Human Work Needs a Habitable Zone.
        </motion.p>
        <motion.p variants={item} style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 2, maxWidth: 560, margin: '0 auto 48px' }}>
          天文学では「生命が存在できる領域」をHabitable Zoneと呼ぶ。<br />
          robottteは、AIによって人が持続可能に働ける社会領域を設計する。
        </motion.p>
        <motion.div variants={item} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.a href="#products" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 6, background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 0 40px rgba(79,124,255,0.3)' }}>Products →</motion.a>
          <motion.a href="#why" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 6, border: '1px solid rgba(79,124,255,0.3)', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Our Philosophy</motion.a>
        </motion.div>
        <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center', gap: 64, marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(79,124,255,0.1)' }}>
          {[['3,000+', '導入事業所'], ['98.02%', '継続率'], ['24/365', '自動対応']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 6 }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, rgba(79,124,255,0.6))', margin: '0 auto' }} />
      </motion.div>
    </section>
  )
}