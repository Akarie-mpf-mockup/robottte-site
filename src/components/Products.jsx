import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const products = [
  { phase: '応募前', num: '01', name: 'HR Chat', color: '#00A0E8', desc: '応募前の疑問・不安にAIが24時間対応。応募意欲を高め、条件のミスマッチを事前に解消する。企業担当者の負担を減らしながら、応募者との丁寧な関係構築を支援する。', features: ['24時間365日対応', '応募前の疑問を即解決', 'FAQ自動学習・更新'], href: '#contact' },
  { phase: '選考中', num: '02', name: 'HR Monster', color: '#0080C0', desc: '応募受付から面接調整まで、人とシステムの役割分担を設計しながら業務を効率化。条件分岐で適切な候補者を面接へつなぎ、複数媒体の応募を一元管理する。', features: ['応募対応・面接調整支援', '条件分岐スクリーニング', '複数媒体一元管理'], href: 'https://hr-monster.io/' },
  { phase: '入社後', num: '03', name: 'Talent Keeper', color: '#006EA3', desc: '入社後フォローを継続的にサポートし、離職予兆を早期に把握。スタッフが自律的に定着できる環境づくりを、企業と一緒に考える。', features: ['入社後フォロー継続支援', '離職予兆の早期把握', 'エンゲージメント可視化'], href: '#contact' },
]

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="products" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 64 }}>
          <p className="label">Products</p>
          <h2 className="section-title" style={{ marginBottom: 32 }}>応募前 → 選考中 → 入社後</h2>

        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 56 }} className="products-grid">
          {products.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,160,232,0.14)', transition: { duration: 0.25 } }}
              style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius)', borderTop: `3px solid ${p.color}`, padding: '40px 32px', boxShadow: 'var(--shadow)', transition: 'box-shadow 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', padding: '5px 14px', borderRadius: 6, background: `${p.color}18`, color: p.color }}>{p.phase}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', opacity: 0.5 }}>{p.num}</span>
              </div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: p.color, marginBottom: 14, letterSpacing: '-0.03em' }}>{p.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: 28 }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, display: 'block', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel="noopener"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: p.color, letterSpacing: '0.04em' }}>
                Learn more →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .products-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
