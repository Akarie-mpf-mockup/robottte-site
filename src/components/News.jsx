import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function News() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [news, setNews] = useState([])
  useEffect(() => {
    fetch('/data/news.json').then(r => r.json()).then(setNews).catch(() => setNews([]))
  }, [])
  return (
    <section id="news" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 56 }}>
          <p className="label">News</p>
          <h2 className="section-title">お知らせ</h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {news.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ display: 'grid', gridTemplateColumns: '140px 120px 1fr auto', alignItems: 'center', gap: 32, padding: '24px 0', borderBottom: '1px solid var(--border)' }} className="news-row">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>{item.date}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', padding: '3px 10px', borderRadius: 2, background: 'rgba(79,124,255,0.08)', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{item.category}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.title}</span>
              {item.url ? <a href={item.url} target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', whiteSpace: 'nowrap' }}>詳細 →</a> : <span />}
            </motion.div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', marginTop: 32 }}>※ ニュースの追加・更新は public/data/news.json を編集してください</p>
      </div>
      <style>{`@media (max-width: 700px) { .news-row { grid-template-columns: 1fr !important; gap: 8px !important; } }`}</style>
    </section>
  )
}