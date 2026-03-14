import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function FloatingOrb({ style }) {
  return (
    <motion.div
      style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.15, ...style }}
      animate={{ y: [0, -30, 10, 0], x: [0, 15, -10, 0], scale: [1, 1.08, 0.96, 1] }}
      transition={{ duration: style.dur || 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', overflow: 'hidden',
      padding: 'calc(var(--nav-h) + 60px) 24px 80px',
    }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <FloatingOrb style={{ width: 700, height: 700, top: -200, left: -200, background: '#4f7cff', dur: 9 }} />
        <FloatingOrb style={{ width: 600, height: 600, top: 0, right: -150, background: '#7c5cfc', dur: 13 }} />
        <FloatingOrb style={{ width: 500, height: 500, bottom: -150, left: '30%', background: '#00d4aa', dur: 11 }} />
      </div>
      <motion.div style={{ position: 'relative', y, opacity, maxWidth: 820 }} variants={container} initial="hidden" animate="show">
        <motion.p variants={item} style={{
          fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)',
          marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 32, height: 1, background: 'var(--accent)' }} />
          HR Technology for Essential Workers
          <span style={{ display: 'block', width: 32, height: 1, background: 'var(--accent)' }} />
        </motion.p>
        <motion.h1 variants={item} style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: 32,
        }}>
          <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>現場で働く人を、</span>
          <br />
          <span style={{ background: 'linear-gradient(135deg, #4f7cff, #7c5cfc, #00d4aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>テクノロジーで支える。</span>
        </motion.h1>
        <motion.p variants={item} style={{
          fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 2,
          maxWidth: 560, margin: '0 auto 48px',
        }}>
          医療・介護・保育・物流・飲食——<br />
          日本を支えるエッセンシャルワーカーの採用・定着・活躍を、<br />
          robottteのHRテクノロジーが後押しします。
        </motion.p>
        <motion.div variants={item} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.a href="#services" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{
            display: 'inline-block', padding: '14px 32px', borderRadius: 10,
            background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)', color: '#fff',
            fontSize: '0.95rem', fontWeight: 600, boxShadow: '0 8px 32px rgba(79,124,255,0.35)',
          }}>サービスを見る</motion.a>
          <motion.a href="#contact" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{
            display: 'inline-block', padding: '14px 32px', borderRadius: 10,
            border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)',
            color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600,
          }}>お問い合わせ</motion.a>
        </motion.div>
        <motion.div variants={item} style={{
          marginTop: 72, display: 'flex', justifyContent: 'center', gap: 60,
          paddingTop: 40, borderTop: '1px solid var(--border)',
        }}>
          {[['42', '導入社数'], ['3', 'プロダクト'], ['2022', '創業年']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1, marginBottom: 6,
              }}>{num}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, transparent, var(--accent))', margin: '0 auto' }} />
      </motion.div>
    </section>
  )
}
