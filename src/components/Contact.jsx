import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="contact" className="section" style={{ background: 'linear-gradient(160deg, #EDF6FC 0%, #F4F8FB 100%)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', padding: '80px 56px', background: 'rgba(255,255,255,0.85)', borderRadius: 20, border: '1px solid rgba(0,160,232,0.15)', boxShadow: '0 16px 64px rgba(0,160,232,0.10)', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,160,232,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <p className="label" style={{ justifyContent: 'center' }}>Contact</p>
              <h2 className="section-title" style={{ marginBottom: 20 }}>お問い合わせ</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 2, marginBottom: 44, maxWidth: 480, margin: '0 auto 44px' }}>
                サービス導入のご相談・資料請求・採用についてはメールにてご連絡ください。
              </p>
              {/* Pulsing glow CTA */}
              <motion.a href="mailto:info@robottte.com"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ['0 6px 28px rgba(0,160,232,0.35)', '0 6px 44px rgba(0,160,232,0.65)', '0 6px 28px rgba(0,160,232,0.35)'] }}
                transition={{ boxShadow: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }}
                style={{ display: 'inline-block', padding: '17px 52px', background: 'var(--accent)', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.03em', borderRadius: 12, marginBottom: 20 }}>
                info@robottte.com
              </motion.a>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 500 }}>通常2営業日以内にご返信いたします</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
