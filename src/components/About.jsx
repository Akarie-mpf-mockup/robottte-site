import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── 会社概要データ ─────────────────────────────────────────────────
const companyInfo = [
  { label: '会社名',     value: '株式会社robottte' },
  { label: '英文社名',   value: 'robottte Inc.' },
  { label: '設立',       value: '2021年8月' },
  { label: '代表取締役', value: '高橋 健一' },
  { label: '資本金',     value: '66,090,100円' },
  { label: '累計調達額', value: '約1.6億円（2026年3月時点）' },
  { label: '事業内容',   value: 'HRテクノロジープロダクトの開発・提供' },
  { label: 'メンバー',   value: '創業期以前参画　5名' },
  { label: 'サポート',   value: '開発サポート　7名\nカスタマーサクセス　3名\n営業サポート　9名' },
  { label: '所在地',     value: '〒107-0062 東京都港区南青山二丁目2番15号 ウィン青山942' },
  { label: 'お問い合わせ', value: 'kiban@robottte.com' },
]

const history = [
  { year: '2021年8月',  text: '株式会社アカリエよりカーブアウトし、設立' },
  { year: '2023年4月',  text: 'シード期 約3,000万円調達' },
  { year: '2025年',     text: 'Talent Keeper（タレントキーパー）事業スタート' },
  { year: '2026年3月',  text: 'プレシリーズA期 Equity & Debt にて約1.3億円調達' },
]
// ────────────────────────────────────────────────────────────────────

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section" style={{ background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <img src="/images/robottte納品_slim.png" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: 340, height: 340, objectFit: 'contain', opacity: 0.06, pointerEvents: 'none', userSelect: 'none' }} />
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 80, scale: 0.93 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28 }} style={{ marginBottom: 72 }}>
          <p className="label">Company</p>
          <h2 className="section-title">会社概要</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }} className="about-grid">

          {/* 会社概要テーブル */}
          <motion.div initial={{ opacity: 0, x: -60, scale: 0.95 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28, delay: 0.1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {companyInfo.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '16px 20px 16px 0', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-dim)', whiteSpace: 'nowrap', verticalAlign: 'top', width: '7em' }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '16px 0', fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* 沿革 */}
          <motion.div initial={{ opacity: 0, x: 60, scale: 0.95 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28, delay: 0.18 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 32 }}>History</p>
            <div style={{ position: 'relative' }}>
              {/* 縦線 */}
              <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, background: 'linear-gradient(to bottom, var(--accent), rgba(0,160,232,0.15))' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 28 }}>
                {history.map((h, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28, delay: 0.25 + i * 0.06 }}
                    style={{ position: 'relative' }}>
                    {/* ドット */}
                    <div style={{ position: 'absolute', left: -32, top: 6, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', border: '2px solid white' }} />
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{h.year}</div>
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{h.text}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
