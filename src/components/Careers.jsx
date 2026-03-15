import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function Careers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [jobs, setJobs] = useState([])
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    fetch('/data/careers.json').then(r => r.json()).then(setJobs).catch(() => setJobs([]))
  }, [])

  return (
    <section id="careers" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 56 }}>
          <p className="label">Careers</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>一緒に、ハビタブルゾーンを拡げよう</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 2, maxWidth: 520 }}>
            少数精鋭で大きなインパクトを。robottteは現在、各ポジションで仲間を募集しています。<br />
            カードにカーソルを乗せると詳細をご覧いただけます。
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {jobs.map((job, i) => {
            const isHovered = hoveredId === job.id
            const accent = job.color || 'var(--accent)'
            const bgAccent = accent + '12'
            const borderAccent = accent + '55'

            return (
              <motion.div key={job.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(job.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: isHovered ? bgAccent : 'var(--surface)',
                  borderRadius: 'var(--radius)',
                  border: `1px solid ${isHovered ? borderAccent : 'var(--border-light)'}`,
                  borderTop: `3px solid ${accent}`,
                  boxShadow: isHovered ? `0 12px 40px ${accent}22` : 'var(--shadow)',
                  overflow: 'hidden',
                  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}>

                {/* 常時表示エリア */}
                <div style={{ padding: '28px 36px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24 }} className="job-row-inner">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{job.title}</h3>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px', background: bgAccent, color: accent, borderRadius: 6, border: `1px solid ${borderAccent}`, whiteSpace: 'nowrap' }}>{job.type}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 8 }}>{job.description}</p>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 500 }}>📍 {job.location}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <motion.div
                      animate={{ y: isHovered ? 4 : 0, opacity: isHovered ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: accent, fontWeight: 600 }}>
                      詳細を見る ↓
                    </motion.div>
                  </div>
                </div>

                {/* ホバーで展開される詳細エリア */}
                <AnimatePresence initial={false}>
                  {isHovered && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 36px 32px', borderTop: `1px solid ${borderAccent}` }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, paddingTop: 28 }} className="job-detail-grid">

                          {/* 業務内容 */}
                          <div>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 14 }}>業務内容</p>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {job.duties.map((d, j) => (
                                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, display: 'block', flexShrink: 0, marginTop: 7 }} />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 必須要件 */}
                          <div>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 14 }}>必須要件</p>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {job.required.map((r, j) => (
                                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, display: 'block', flexShrink: 0, marginTop: 7 }} />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 歓迎要件 + CTAボタン */}
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
                            <div>
                              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: 14 }}>歓迎要件</p>
                              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {job.preferred.map((p, j) => (
                                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.84rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, opacity: 0.5, display: 'block', flexShrink: 0, marginTop: 7 }} />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <a href="mailto:kiban@robottte.com"
                              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', padding: '12px 28px', border: 'none', borderRadius: 8, background: `linear-gradient(130deg, ${accent} 0%, ${accent}cc 100%)`, boxShadow: `0 4px 20px ${accent}44`, display: 'inline-block', textAlign: 'center', transition: 'opacity 0.2s' }}
                              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                              メールで問い合わせる →
                            </a>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {jobs.length === 0 && (
            <div style={{ padding: '48px 32px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)' }}>
              現在募集中のポジションはありません
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .job-detail-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .job-detail-grid { grid-template-columns: 1fr !important; } .job-row-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
