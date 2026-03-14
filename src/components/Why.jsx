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
          <h2 className="section-title" style={{ marginBottom: 16, maxWidth: 640 }}>雇用のインフラを、<br />再設計する。</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 2, maxWidth: 560, marginBottom: 72 }}>
            労働集約産業が直面する構造課題——人手不足、高離職率、多拠点管理——は、個別の努力では解決できない。robottteはこれを、テクノロジーで構造ごと変える。
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 80 }} className="problem-grid">
          {problems.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              style={{ padding: '40px 32px', background: 'var(--surface)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.15em', marginBottom: 20 }}>{p.time}</div>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 24 }}>{p.scene}</p>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--accent)', background: 'rgba(79,124,255,0.08)', padding: '4px 12px', borderRadius: 2 }}>{p.impact}</span>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.7 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-dim)', marginRight: 8 }}>FOCUS_INDUSTRIES /</span>
          {industries.map(ind => (
            <span key={ind} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', padding: '6px 16px', border: '1px solid var(--border2)', borderRadius: 2, color: 'var(--text-muted)' }}>{ind}</span>
          ))}
        </motion.div>
      </div>
      <style>{`@media (max-width: 860px) { .problem-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}