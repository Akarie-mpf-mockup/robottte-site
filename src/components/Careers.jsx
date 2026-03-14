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
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 64 }}>
          <p className="label">Careers</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>一緒に、ハビタブルゾーンを拡げよう</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 2, maxWidth: 520 }}>少数精鋭で大きなインパクトを。robottteは現在、各ポジションで仲間を募集しています。</p>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {jobs.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ borderColor: 'rgba(79,124,255,0.3)' }}
              style={{ padding: '36px 40px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 32, transition: 'border-color 0.3s' }} className="job-row">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>{job.title}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', padding: '3px 10px', background: 'rgba(0,212,170,0.08)', color: 'var(--accent3)', borderRadius: 2 }}>{job.type}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 10 }}>{job.description}</p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>📍 {job.location}</span>
              </div>
              <a href="#contact" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--accent)', whiteSpace: 'nowrap', padding: '10px 20px', border: '1px solid rgba(79,124,255,0.3)', borderRadius: 4 }}>Apply →</a>
            </motion.div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', marginTop: 32 }}>※ 採用情報の追加・更新は public/data/careers.json を編集してください</p>
      </div>
      <style>{`@media (max-width: 700px) { .job-row { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}