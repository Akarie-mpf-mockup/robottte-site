import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const rows = [['会社名','robottte株式会社'],['所在地','東京都'],['設立','2022年'],['事業内容','HRテクノロジープロダクトの開発・提供'],['対象業界','医療・介護・保育・物流・飲食']]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="about" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>About</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 28 }}>エッセンシャルワーカーの<br />未来をつくる</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.95, marginBottom: 16 }}>robottte株式会社は、医療・介護・保育・物流・飲食など、社会に欠かせない現場職種のHRテクノロジーに特化したスタートアップです。</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.95, marginBottom: 48 }}>採用難・高離職率・人手不足。現場の人事担当者が抱える課題に真剣に向き合い、効果の出るプロダクトを届け続けます。</p>
            <div style={{ display: 'flex', gap: 48 }}>
              {[['42','導入社数'],['3','プロダクト'],['2022','創業']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 800, background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: 4 }}>{num}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
              {rows.map(([th, td], i) => (
                <div key={th} style={{ display: 'grid', gridTemplateColumns: '38% 1fr', borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ padding: '18px 20px', background: 'var(--surface2)', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center' }}>{th}</div>
                  <div style={{ padding: '18px 20px', fontSize: '0.88rem', display: 'flex', alignItems: 'center' }}>{td}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  )
}
