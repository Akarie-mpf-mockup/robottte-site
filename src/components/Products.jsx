import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const products = [
  { phase: '応募前', num: '01', name: 'HR Chat', color: '#00A0E8', desc: '応募前の疑問・不安にAIが24時間対応します。応募意欲を高め、条件のミスマッチを事前に解消。企業担当者の負担を減らしながら、応募者との丁寧な関係構築を支援します。', features: ['24時間365日対応', '応募前の疑問を即解決', 'FAQ自動学習・更新'], href: '#contact' },
  { phase: '選考中', num: '02', name: 'HR Monster', color: '#0080C0', desc: '応募受付から面接調整まで、人とシステムの役割分担を設計しながら業務を効率化します。条件分岐で適切な候補者を面接へつなぎ、複数媒体の応募を一元管理します。', features: ['応募対応・面接調整支援', '条件分岐スクリーニング', '複数媒体一元管理'], href: 'https://hr-monster.io/' },
  { phase: '入社後', num: '03', name: 'Talent Keeper', color: '#006EA3', desc: '入社後フォローを継続的にサポートし、離職予兆を早期に把握します。スタッフが自律的に定着できる環境づくりを、企業と一緒に考えていきます。', features: ['入社後フォロー継続支援', '離職予兆の早期把握', 'エンゲージメント可視化'], href: '#contact' },
]

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const p = products[active]

  return (
    <section id="products" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 80, scale: 0.93 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28 }} style={{ marginBottom: 48 }}>
          <p className="label">Products</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>採用が、自走する。</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 2, maxWidth: 520 }}>応募前の不安解消から選考中の業務効率化、入社後の定着まで。採用の全工程を、テクノロジーでカバーします。</p>
        </motion.div>

        {/* タブ */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28, delay: 0.1 }}
          style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {products.map((prod, i) => (
            <button key={prod.phase} onClick={() => setActive(i)}
              style={{
                padding: '10px 32px', borderRadius: 10,
                border: `2px solid ${active === i ? prod.color : 'var(--border-light)'}`,
                background: active === i ? prod.color + '14' : 'transparent',
                color: active === i ? prod.color : 'var(--text-dim)',
                fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.2s', outline: 'none',
              }}>
              {prod.phase}
            </button>
          ))}
        </motion.div>

        {/* コンテンツ */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              background: 'var(--surface)', borderRadius: 'var(--radius)',
              border: '1px solid var(--border-light)', borderTop: `3px solid ${p.color}`,
              padding: '48px 56px', boxShadow: 'var(--shadow)',
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center',
            }}
            className="product-card-inner">
            <div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', padding: '5px 14px', borderRadius: 6, background: p.color + '18', color: p.color, marginBottom: 20, display: 'inline-block' }}>{p.phase}</span>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '2.4rem', fontWeight: 800, color: p.color, marginBottom: 16, letterSpacing: '-0.03em' }}>{p.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: 28, maxWidth: 520 }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, display: 'block', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel="noopener"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: p.color, letterSpacing: '0.04em' }}>
                Learn more →
              </a>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9rem', fontWeight: 800, color: p.color, opacity: 0.07, lineHeight: 1, userSelect: 'none', flexShrink: 0 }}>
              {p.num}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <style>{`@media (max-width: 700px) { .product-card-inner { grid-template-columns: 1fr !important; padding: 32px 28px !important; } }`}</style>
    </section>
  )
}
