import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function Careers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    fetch('/data/careers.json').then(r => r.json()).then(setJobs).catch(() => setJobs([]))
  }, [])
  return (
    <section id="careers" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 56 }}>
          <p className="label">Careers</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>一緒に、ハビタブルゾーンを拡げよう</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 2, maxWidth: 520 }}>少数精鋭で大きなインパクトを。robottteは現在、各ポジションで仲間を募集しています。</p>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {jobs.map((job, i) => (
            <motion.div key={job.id}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ boxShadow: '0 8px 32px rgba(0,160,232,0.12)', borderColor: 'rgba(0,160,232,0.35)', y: -2, transition: { duration: 0.2 } }}
              style={{ padding: '32px 40px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 32, boxShadow: 'var(--shadow)', transition: 'border-color 0.3s, box-shadow 0.3s' }}
              className="job-row">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <h3 style={{ fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>{job.title}</h3>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: 6 }}>{job.type}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 10 }}>{job.description}</p>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 500 }}>📍 {job.location}</span>
              </div>
              <a href="#contact"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap', padding: '11px 24px', border: '1.5px solid var(--accent)', borderRadius: 8, transition: 'background 0.2s', background: 'transparent' }}
                onMouseEnter={e => { e.target.style.background = 'var(--accent)'; e.target.style.color = '#fff' }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)' }}>
                Apply →
              </a>
            </motion.div>
          ))}
          {jobs.length === 0 && (
            <div style={{ padding: '48px 32px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)' }}>
              現在募集中のポジションはありません
            </div>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .job-row { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
