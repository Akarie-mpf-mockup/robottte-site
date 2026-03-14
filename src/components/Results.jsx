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
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 80 }}>
          <p className="label">Results</p>
          <h2 className="section-title">現場が証明する、<br />実績。</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 80 }} className="stats-grid">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ padding: '48px 40px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 800, background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 12 }}>{s.num}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: 32, textTransform: 'uppercase' }}>Customer_Voices /</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="voices-grid">
            {voices.map((v, i) => (
              <div key={i} style={{ padding: '36px', background: 'var(--surface2)', border: '1px solid var(--border)', borderLeft: '2px solid var(--accent)' }}>
                <p style={{ fontSize: '0.95rem', lineHeight: 2, color: 'var(--text-muted)', marginBottom: 24 }}>"{v.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', padding: '3px 10px', background: 'rgba(79,124,255,0.08)', color: 'var(--accent)', borderRadius: 2 }}>{v.industry}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>{v.company}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-dim)', marginBottom: 20, textTransform: 'uppercase' }}>Deployment_Industries /</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {industries.map(ind => (
              <span key={ind} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '6px 16px', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 2 }}>{ind}</span>
            ))}
          </div>
        </motion.div>
      </div>
      <style>{`@media (max-width: 860px) { .stats-grid { grid-template-columns: 1fr !important; } .voices-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}