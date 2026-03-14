import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const roles = ['Engineer', 'Sales', 'CS', 'Design', 'BizDev', 'Marketing']

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="team" style={{ padding: '120px 0', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Team</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 16 }}>一緒に、現場の未来を変えよう</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>robottteは現在、一緒に事業を作っていただける仲間を積極募集中です。</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden' }} className="hiring-grid">
          <div style={{ padding: '64px 56px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 14 }}>採用情報</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: 36 }}>エンジニア・セールス・カスタマーサクセスなど、各ポジションで募集中。少数精鋭で大きなインパクトを出す仕事です。</p>
            <motion.a href="#contact" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-block', padding: '13px 28px', borderRadius: 10, background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)', color: '#fff', fontSize: '0.92rem', fontWeight: 600, boxShadow: '0 8px 24px rgba(79,124,255,0.3)' }}>採用についてお問い合わせ</motion.a>
          </div>
          <div style={{ background: 'linear-gradient(135deg, rgba(79,124,255,0.1), rgba(124,92,252,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {roles.map((r, i) => (
                <motion.span key={r} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                  style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', fontWeight: 700, padding: '9px 20px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', letterSpacing: '0.04em' }}>{r}</motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <style>{`@media (max-width: 860px) { .hiring-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
