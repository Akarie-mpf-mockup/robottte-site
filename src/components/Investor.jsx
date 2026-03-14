import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const investorMessage = {
  quote: 'robottteが解こうとしている課題は、日本社会の構造そのものです。人口減少が不可逆である以上、労働集約産業のDXは必然。そのインフラを最初に制する会社に投資しました。',
  name: '投資家名 ○○',
  title: '○○ Capital / Partner',
}

export default function Investor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="investor" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p className="label">Investors</p>
          <h2 className="section-title" style={{ marginBottom: 56 }}>投資家メッセージ</h2>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 64px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', borderLeft: '3px solid var(--accent)', boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,160,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '4rem', color: 'var(--accent)', opacity: 0.2, lineHeight: 1, marginBottom: 8 }}>"</div>
              <p style={{ fontSize: '1.08rem', lineHeight: 2.1, color: 'var(--text-muted)', marginBottom: 40 }}>{investorMessage.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-light)', border: '2px solid var(--border)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>{investorMessage.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 500, marginTop: 2 }}>{investorMessage.title}</div>
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: 20 }}>
            ※ 投資家メッセージはsrc/components/Investor.jsxを編集して更新できます
          </p>
        </motion.div>
      </div>
    </section>
  )
}
