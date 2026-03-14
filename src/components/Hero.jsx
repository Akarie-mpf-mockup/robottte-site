import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function PlanetSVG({ size = 460 }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.239   // ~110 at 460
  const rx1 = size * 0.435 // outer ring rx
  const ry1 = size * 0.109 // outer ring ry
  const rx2 = size * 0.352 // inner ring rx
  const ry2 = size * 0.087 // inner ring ry
  const moon1y = cy - r - size * 0.083 // outer orbit
  const moon2y = cy - r - size * 0.101 // inner orbit

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pg" cx="37%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#D0F0FF" />
          <stop offset="22%" stopColor="#50C0F0" />
          <stop offset="52%" stopColor="#0080C0" />
          <stop offset="100%" stopColor="#001E3C" />
        </radialGradient>
        <radialGradient id="gw" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,160,232,0.20)" />
          <stop offset="100%" stopColor="rgba(0,160,232,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={size * 0.45} fill="url(#gw)" />
      {/* Back rings */}
      <ellipse cx={cx} cy={cy} rx={rx1} ry={ry1} stroke="rgba(0,160,232,0.11)" strokeWidth="1.2" />
      <ellipse cx={cx} cy={cy} rx={rx2} ry={ry2} stroke="rgba(0,160,232,0.17)" strokeWidth="1.5" />
      {/* Planet */}
      <circle cx={cx} cy={cy} r={r} fill="url(#pg)" />
      {/* Atmosphere */}
      <circle cx={cx} cy={cy} r={r + size * 0.01} fill="none" stroke="rgba(80,200,255,0.11)" strokeWidth={size * 0.02} />
      {/* Highlight */}
      <ellipse cx={cx - r * 0.27} cy={cy - r * 0.23} rx={r * 0.25} ry={r * 0.15} fill="rgba(255,255,255,0.10)" transform={`rotate(-28 ${cx - r * 0.27} ${cy - r * 0.23})`} />
      {/* Cloud bands */}
      <ellipse cx={cx} cy={cy + r * 0.2} rx={r * 0.73} ry={r * 0.07} fill="rgba(255,255,255,0.04)" />
      {/* Front arcs */}
      <path d={`M ${cx - rx1} ${cy} A ${rx1} ${ry1} 0 0 0 ${cx + rx1} ${cy}`} stroke="rgba(0,160,232,0.15)" strokeWidth="1.2" fill="none" />
      <path d={`M ${cx - rx2} ${cy} A ${rx2} ${ry2} 0 0 0 ${cx + rx2} ${cy}`} stroke="rgba(0,160,232,0.22)" strokeWidth="1.5" fill="none" />
      {/* Moon 1 — clockwise */}
      <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 13, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={moon1y} r={size * 0.015} fill="rgba(0,160,232,0.22)" />
        <circle cx={cx} cy={moon1y} r={size * 0.010} fill="#00A0E8" />
      </motion.g>
      {/* Moon 2 — counter-clockwise */}
      <motion.g animate={{ rotate: [360, 0] }} transition={{ duration: 21, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={moon2y} r={size * 0.008} fill="rgba(100,200,255,0.65)" />
      </motion.g>
    </svg>
  )
}

function PlanetVisual({ size = 460 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <motion.div animate={{ y: [0, -22, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <PlanetSVG size={size} />
      </motion.div>
    </motion.div>
  )
}

function HeroBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(155deg, #FFFFFF 0%, #EDF7FD 55%, #F4F8FB 100%)' }} />
      <div style={{ position: 'absolute', bottom: '-8%', left: '-6%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,160,232,0.05) 0%, transparent 70%)' }} />
    </div>
  )
}

const containerAnim = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
const itemAnim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <HeroBg />

      {/* ── Desktop layout: text left / planet right ── */}
      <div className="container hero-inner" style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', minHeight: '100vh', paddingTop: 'var(--nav-h)', gap: 48 }}>

        <motion.div style={{ flex: 1, minWidth: 0, y, opacity }} variants={containerAnim} initial="hidden" animate="show">

          <motion.p variants={itemAnim} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 24, height: 2, background: 'var(--accent)', display: 'block', borderRadius: 1 }} />
            Habitable Zone — HR Technology
          </motion.p>

          {/* 見出し: 各行を display:block + white-space:nowrap で折り返しを防ぐ */}
          <motion.h1 variants={itemAnim} style={{ fontFamily: 'Inter, Noto Sans JP, sans-serif', fontSize: 'clamp(1.9rem, 4.8vw, 4.8rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 12, color: 'var(--text)' }}>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>ハビタブルゾーンを、</span>
            <span style={{ display: 'block', color: 'var(--accent)' }}>拡げる。</span>
          </motion.h1>

          <motion.p variants={itemAnim} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', letterSpacing: '0.10em', color: 'var(--text-dim)', marginBottom: 28, fontWeight: 400 }}>
            Expanding the Habitable Zone for Human Work.
          </motion.p>

          <motion.p variants={itemAnim} style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 2.1, maxWidth: 500, marginBottom: 44 }}>
            人口減少が進む社会において、「人が働き、生き続けられる空間」を増やす。<br />
            AIの力で、持続可能な社会構造を創造する。
          </motion.p>

          <motion.div variants={itemAnim} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <motion.a href="#products"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 24px rgba(0,160,232,0.35)', letterSpacing: '0.02em' }}>
              Products →
            </motion.a>
            <motion.a href="#why"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 10, border: '1.5px solid rgba(0,160,232,0.35)', color: 'var(--accent)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', background: 'transparent', letterSpacing: '0.02em' }}>
              Our Philosophy
            </motion.a>
          </motion.div>

          <motion.div variants={itemAnim} style={{ display: 'flex', gap: 48, marginTop: 64, paddingTop: 40, borderTop: '1px solid rgba(0,160,232,0.12)' }}>
            {[['3,000+', '導入事業所'], ['98.02%', '継続率'], ['24/365', '年中無休対応']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.03em' }}>{n}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-dim)' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Desktop planet */}
        <div className="hero-planet-desktop" style={{ flexShrink: 0 }}>
          <PlanetVisual size={460} />
        </div>
      </div>

      {/* ── Mobile planet: テキスト下に中央表示 ── */}
      <div className="hero-planet-mobile" style={{ display: 'none', justifyContent: 'center', paddingBottom: 60, position: 'relative', zIndex: 10 }}>
        <PlanetVisual size={260} />
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, transparent, rgba(0,160,232,0.55))', margin: '0 auto' }} />
      </motion.div>

      <style>{`
        @media (max-width: 960px) {
          .hero-planet-desktop { display: none !important; }
          .hero-planet-mobile { display: flex !important; }
          .hero-inner { padding-bottom: 20px; }
        }
        @media (max-width: 600px) {
          .hero-inner { min-height: calc(100vh - 60px); }
        }
      `}</style>
    </section>
  )
}
