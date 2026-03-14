import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HeroBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Light gradient base */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #FFFFFF 0%, #EDF6FC 55%, #F4F8FB 100%)' }} />
      {/* Large soft circle - right */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,160,232,0.10) 0%, transparent 70%)' }} />
      {/* Medium circle - bottom left */}
      <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,160,232,0.06) 0%, transparent 70%)' }} />
      {/* Subtle concentric rings (habitable zone motif) */}
      {[300, 480, 660].map((size, i) => (
        <div key={size} style={{
          position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)',
          width: size, height: size, borderRadius: '50%',
          border: `1px solid rgba(0,160,232,${0.12 - i * 0.03})`,
        }} />
      ))}
      {/* Center dot */}
      <div style={{ position: 'absolute', right: 'calc(8% + 143px)', top: '50%', transform: 'translate(50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: 'var(--accent)', opacity: 0.7 }} />
    </div>
  )
}

const containerAnim = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }
const itemAnim = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 'calc(var(--nav-h) + 60px) 24px 100px' }}>
      <HeroBg />
      <motion.div style={{ position: 'relative', y, opacity, maxWidth: 820, zIndex: 10, textAlign: 'center' }} variants={containerAnim} initial="hidden" animate="show">

        <motion.p variants={itemAnim} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ width: 28, height: 2, background: 'var(--accent)', display: 'block', borderRadius: 1 }} />
          Habitable Zone — HR Technology
          <span style={{ width: 28, height: 2, background: 'var(--accent)', display: 'block', borderRadius: 1 }} />
        </motion.p>

        <motion.h1 variants={itemAnim} style={{ fontFamily: 'Inter, Noto Sans JP, sans-serif', fontSize: 'clamp(2.8rem, 7vw, 5.6rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 10, color: 'var(--text)' }}>
          ハビタブルゾーンを、<br />
          <span style={{ color: 'var(--accent)' }}>拡げる。</span>
        </motion.h1>

        <motion.p variants={itemAnim} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 36, fontWeight: 400 }}>
          Expanding the Habitable Zone for Human Work.
        </motion.p>

        <motion.p variants={itemAnim} style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 2.1, maxWidth: 560, margin: '0 auto 52px' }}>
          人口減少が進む社会において、「人が働き、生き続けられる空間」を増やす。<br />
          AIの力で、持続可能な社会構造を創造する。
        </motion.p>

        <motion.div variants={itemAnim} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.a href="#products"
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-block', padding: '15px 40px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 24px rgba(0,160,232,0.35)', letterSpacing: '0.02em' }}>
            Products →
          </motion.a>
          <motion.a href="#why"
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-block', padding: '15px 40px', borderRadius: 10, border: '1.5px solid rgba(0,160,232,0.35)', color: 'var(--accent)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', background: 'transparent', letterSpacing: '0.02em' }}>
            Our Philosophy
          </motion.a>
        </motion.div>

        <motion.div variants={itemAnim} style={{ display: 'flex', justifyContent: 'center', gap: 64, marginTop: 80, paddingTop: 48, borderTop: '1px solid rgba(0,160,232,0.12)' }}>
          {[['3,000+', '導入事業所'], ['98.02%', '継続率'], ['24/365', '自動対応']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.03em' }}>{n}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-dim)', letterSpacing: '0.06em' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, rgba(0,160,232,0.5))' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
