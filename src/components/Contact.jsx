import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="contact" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 24, padding: '72px 56px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,124,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Contact</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 20 }}>お問い合わせ</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: 40 }}>サービスのご相談・資料請求・採用に関するご質問など、<br />お気軽にご連絡ください。</p>
            <motion.a href="mailto:info@robottte.com" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-block', padding: '16px 40px', borderRadius: 12, background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)', color: '#fff', fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-display)', boxShadow: '0 10px 36px rgba(79,124,255,0.35)', marginBottom: 20 }}>info@robottte.com</motion.a>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>※ 通常2営業日以内にご返信いたします。</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
