import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { num: '3,000+', label: '導入事業所数', sub: 'sites' },
  { num: '98.02%', label: '継続率', sub: 'retention' },
  { num: '24/365', label: '自動対応', sub: 'automation' },
]
const voices = [
  { text: '応募者が応募に至るタイミングで逃さずサポートしてくれる。夜間の応募にも即対応できるようになった。', company: '介護福祉事業者', industry: '介護' },
  { text: '日程調整やロボでの回答が応募者管理画面に自動でアップされる流れが当たり前になった。採用担当の工数が劇的に削減された。', company: '医療法人', industry: '医療' },
]
const industries = ['介護福祉', '医療', '保育', '派遣・紹介', '飲食・宿泊', '清掃業', '物流', '警備']

export default function Results() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="results" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 72 }}>
          <p className="label">Results</p>
          <h2 className="section-title">現場が証明する、<br />実績。</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 72 }} className="stats-grid">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ padding: '48px 40px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: 12, letterSpacing: '-0.03em' }}>{s.num}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text-dim)', marginBottom: 28, textTransform: 'uppercase' }}>Customer Voices</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="voices-grid">
            {voices.map((v, i) => (
              <div key={i} style={{ padding: '36px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', borderLeft: '3px solid var(--accent)', boxShadow: 'var(--shadow)' }}>
                <p style={{ fontSize: '0.98rem', lineHeight: 2, color: 'var(--text-muted)', marginBottom: 24 }}>"{v.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 6 }}>{v.industry}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 500 }}>{v.company}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text-dim)', marginBottom: 20, textTransform: 'uppercase' }}>Deployment Industries</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {industries.map(ind => (
              <span key={ind} style={{ fontSize: '0.82rem', fontWeight: 500, padding: '7px 18px', border: '1.5px solid var(--border)', color: 'var(--text-muted)', borderRadius: 8, background: 'var(--surface)' }}>{ind}</span>
            ))}
          </div>
        </motion.div>
      </div>
      <style>{`@media (max-width: 860px) { .stats-grid { grid-template-columns: 1fr !important; } .voices-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
