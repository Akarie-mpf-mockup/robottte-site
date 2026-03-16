import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function CountUp({ end, decimals = 0, suffix = '', inView }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(end * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])
  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.floor(value).toLocaleString()
  return <>{formatted}{suffix}</>
}

const stats = [
  { display: null, end: 3000, suffix: '+', decimals: 0, label: '導入事業所数', sub: 'sites' },
  { display: null, end: 98.02, suffix: '%', decimals: 2, label: '継続率', sub: 'retention' },
  { display: '24/365', end: null, label: '応募機会を逃さない', sub: 'never miss a chance' },
]
const voices = [
  { text: '応募者が応募に至るタイミングで逃さずサポートしてくれる。夜間の応募にも即対応できるようになった。', company: '介護福祉事業者', industry: '介護' },
  { text: '日程調整やロボでの回答が応募者管理画面に自動でアップされる流れが当たり前になった。採用担当の工数が劇的に削減された。', company: '医療法人', industry: '医療' },
]

export default function Results() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeVoice, setActiveVoice] = useState(0)
  return (
    <section id="results" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 80, scale: 0.93 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28 }} style={{ marginBottom: 72 }}>
          <p className="label">Results</p>
          <h2 className="section-title">現場が証明する、<br />実績。</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 72 }} className="stats-grid">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 90, scale: 0.92 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28, delay: i * 0.07 }}
              style={{ padding: '48px 40px', background: 'linear-gradient(160deg, #fff 60%, #EDF7FD 100%)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: 12, letterSpacing: '-0.03em' }}>
                {s.end !== null
                  ? <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} inView={inView} />
                  : s.display}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 80, scale: 0.93 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28, delay: 0.2 }} style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text-dim)', textTransform: 'uppercase', margin: 0 }}>Customer Voices</p>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '3px 12px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 6 }}>HR Monster</span>
            </div>
            {/* ドット */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {voices.map((_, i) => (
                <button key={i} onClick={() => setActiveVoice(i)}
                  style={{ width: i === activeVoice ? 24 : 8, height: 8, borderRadius: 4, background: i === activeVoice ? 'var(--accent)' : 'var(--border-light)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeVoice}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ padding: '36px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', borderLeft: '3px solid var(--accent)', boxShadow: 'var(--shadow)' }}>
                <p style={{ fontSize: '0.98rem', lineHeight: 2, color: 'var(--text-muted)', marginBottom: 24 }}>"{voices[activeVoice].text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 6 }}>{voices[activeVoice].industry}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 500 }}>{voices[activeVoice].company}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setActiveVoice(i => (i - 1 + voices.length) % voices.length)}
                      style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--border-light)', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>←</button>
                    <button onClick={() => setActiveVoice(i => (i + 1) % voices.length)}
                      style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--border-light)', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>→</button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
      <style>{`@media (max-width: 860px) { .stats-grid { grid-template-columns: 1fr !important; } .voices-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
