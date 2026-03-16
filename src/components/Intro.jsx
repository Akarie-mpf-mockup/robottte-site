import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('show')

  const stars = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      x: (i * 37.3 + 11) % 100,
      y: (i * 53.7 + 7) % 100,
      s: (i % 3) * 0.6 + 0.5,
      o: (i % 5) * 0.08 + 0.18,
      d: (i % 7) * 0.09,
    }))
  , [])

  useEffect(() => {
    const t = setTimeout(() => setPhase('exit'), 2100)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      animate={phase === 'exit' ? { opacity: 0, scale: 1.12 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.4, 0, 1, 1] }}
      onAnimationComplete={() => { if (phase === 'exit') onDone() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at 50% 55%, #001C38 0%, #000B18 55%, #000408 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>

      {/* Stars */}
      {stars.map((s, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: s.o }}
          transition={{ duration: 0.5, delay: s.d }}
          style={{
            position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
            width: s.s, height: s.s, borderRadius: '50%',
            background: '#fff', pointerEvents: 'none',
          }} />
      ))}

      {/* Planet */}
      <div style={{ position: 'relative', marginBottom: 60 }}>
        {/* Outer glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', inset: -80, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,160,232,0.38) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
        {/* Orbit rings */}
        {[{ rx: 130, ry: 28 }, { rx: 104, ry: 22 }].map((ring, i) => (
          <motion.div key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.38 - i * 0.08 }}
            transition={{ duration: 1.0, delay: 0.55 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              marginTop: -ring.ry, marginLeft: -ring.rx,
              width: ring.rx * 2, height: ring.ry * 2,
              borderRadius: '50%',
              border: '1.5px solid rgba(0,160,232,0.5)',
              pointerEvents: 'none',
            }} />
        ))}
        {/* Planet body */}
        <motion.div
          initial={{ scale: 0.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle at 37% 30%, #D0F0FF 0%, #50C0F0 22%, #0080C0 52%, #001E3C 100%)',
            boxShadow: '0 0 60px rgba(0,160,232,0.55), 0 0 20px rgba(0,160,232,0.3)',
            position: 'relative', zIndex: 1,
          }} />
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: '2.2rem', fontWeight: 800,
          color: '#fff', letterSpacing: '-0.02em', marginBottom: 10,
        }}>
          robottte
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
            color: 'rgba(0,160,232,0.8)', letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>
          Expanding the Habitable Zone
        </motion.div>
      </motion.div>

    </motion.div>
  )
}
