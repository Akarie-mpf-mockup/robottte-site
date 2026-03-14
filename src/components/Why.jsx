import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const problems = [
  { time: '23:47', scene: '夜、応募が来ても誰も対応できない。', impact: '機会損失' },
  { time: '14:23', scene: '面接調整だけで、採用担当の1日が終わる。', impact: '工数浪費' },
  { time: '—', scene: '辞めた理由を、会社は誰も知らない。', impact: '構造的盲点' },
]
const industries = ['医療', '介護', '保育', '物流', '飲食', '清掃/ビル管理']

export default function Why() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="why" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p className="label">Philosophy</p>
          <h2 className="section-title" style={{ marginBottom: 16, maxWidth: 640 }}>エッセンシャルワーカーの働く現場を、<br />持続可能にする。</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 2, maxWidth: 560, marginBottom: 64 }}>
            労働集約産業が直面する構造課題——人手不足、高離職率、多拠点管理——は、個別の努力では解決できない。robottteはこれを、テクノロジーで構造ごと変える。
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 72 }} className="problem-grid">
          {problems.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              whileHover={{ y: -6, rotateY: 2, boxShadow: '0 20px 50px rgba(0,160,232,0.12)', transition: { type: 'spring', stiffness: 300, damping: 22 } }}
              style={{ padding: '40px 32px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)', opacity: 0.55, borderRadius: 'var(--radius) var(--radius) 0 0' }} />
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', opacity: 0.4, marginBottom: 20, letterSpacing: '0.02em' }}>{p.time}</div>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: 28, fontWeight: 500 }}>{p.scene}</p>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 400 }}
                style={{ display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--accent)', background: 'var(--accent-light)', padding: '5px 14px', borderRadius: 6 }}>
                {p.impact}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-dim)', textTransform: 'uppercase', marginRight: 4 }}>Focus Industries</span>
          {industries.map((ind, i) => (
            <motion.span key={ind}
              initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.7 + i * 0.06 }}
              style={{ fontFamily: 'Inter, Noto Sans JP, sans-serif', fontSize: '0.8rem', fontWeight: 500, padding: '6px 18px', border: '1.5px solid var(--border)', borderRadius: 8, color: 'var(--text-muted)', background: 'var(--surface)' }}>
              {ind}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <style>{`@media (max-width: 860px) { .problem-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
