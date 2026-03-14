import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="contact" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '80px 48px', background: 'var(--surface)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <p className="label" style={{ justifyContent: 'center' }}>Contact</p>
              <h2 className="section-title" style={{ marginBottom: 20 }}>お問い合わせ</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: 40 }}>サービス導入のご相談・資料請求・採用についてはメールにてご連絡ください。</p>
              <motion.a href="mailto:info@robottte.com" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', padding: '16px 48px', background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.05em', borderRadius: 4, boxShadow: '0 0 40px rgba(79,124,255,0.3)', marginBottom: 20 }}>
                info@robottte.com
              </motion.a>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)' }}>通常2営業日以内にご返信いたします</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}