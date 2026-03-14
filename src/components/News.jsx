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
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 48 }}>
          <p className="label">News</p>
          <h2 className="section-title">お知らせ</h2>
        </motion.div>
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          {news.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{ display: 'grid', gridTemplateColumns: '140px 120px 1fr auto', alignItems: 'center', gap: 28, padding: '22px 32px', borderBottom: i < news.length - 1 ? '1px solid var(--border-light)' : 'none' }}
              className="news-row">
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-dim)' }}>{item.date}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px', borderRadius: 6, background: 'var(--accent-light)', color: 'var(--accent)', whiteSpace: 'nowrap', width: 'fit-content' }}>{item.category}</span>
              <span style={{ fontSize: '0.92rem', color: 'var(--text)', fontWeight: 400 }}>{item.title}</span>
              {item.url
                ? <a href={item.url} target="_blank" rel="noopener" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap' }}>詳細 →</a>
                : <span />}
            </motion.div>
          ))}
          {news.length === 0 && (
            <div style={{ padding: '48px 32px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
              ニュースはまだありません
            </div>
          )}
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 20 }}>※ ニュースの追加・更新は public/data/news.json を編集してください</p>
      </div>
      <style>{`@media (max-width: 700px) { .news-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 20px 24px !important; } }`}</style>
    </section>
  )
}
