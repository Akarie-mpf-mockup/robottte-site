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
          <h2 className="section-title" style={{ marginBottom: 64 }}>投資家メッセージ</h2>
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '64px', background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '2px solid var(--gold)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(200,169,110,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'rgba(200,169,110,0.2)', lineHeight: 1, marginBottom: 8 }}>"</div>
              <p style={{ fontSize: '1.1rem', lineHeight: 2, color: 'var(--text-muted)', marginBottom: 40 }}>{investorMessage.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(200,169,110,0.3), rgba(200,169,110,0.1))', border: '1px solid rgba(200,169,110,0.2)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gold)' }}>{investorMessage.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-dim)' }}>{investorMessage.title}</div>
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: 24 }}>
            ※ 投資家メッセージはsrc/components/Investor.jsxを編集して更新できます
          </p>
        </motion.div>
      </div>
    </section>
  )
}