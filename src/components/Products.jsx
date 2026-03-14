import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const products = [
  { phase: '採用前', num: '01', name: 'HR Chat', color: '#00d4aa', desc: '応募前の疑問・不安をAIが24時間対応。応募意欲を高め、条件ミスマッチを事前に解消する。', features: ['24時間365日自動対応', '応募前の疑問を即解決', 'FAQ自動学習'], href: '#contact' },
  { phase: '採用中', num: '02', name: 'HR Monster', color: '#4f7cff', desc: '応募受付から面接調整まで全自動。条件分岐で規定クリア者だけを面接へ。複数媒体の応募を一元管理。', features: ['応募対応・面接自動化', '条件分岐スクリーニング', '複数媒体一元管理'], href: 'https://hr-monster.io/' },
  { phase: '入社後', num: '03', name: 'Talent Keeper', color: '#7c5cfc', desc: '入社後フォローを自動化し、離職予兆を早期検知。スタッフの満足度・定着率を継続的に改善する。', features: ['入社後フォロー自動化', '離職予兆の早期検知', 'エンゲージメント可視化'], href: '#contact' },
]

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="products" className="section">
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 72 }}>
          <p className="label">Products</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>採用前 → 採用中 → 入社後</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 2, maxWidth: 560 }}>3つのプロダクトが一気通貫で連携。「応募 → 就業 → 定着」の全フローを自動化・最適化する。</p>
        </motion.div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 40, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(79,124,255,0.3), rgba(124,92,252,0.3), transparent)', zIndex: 0 }} className="flow-line" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }} className="products-grid">
            {products.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `2px solid ${p.color}`, padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `${p.color}10`, filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', padding: '4px 12px', borderRadius: 2, background: `${p.color}15`, color: p.color }}>{p.phase}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>{p.num}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: p.color, marginBottom: 16, letterSpacing: '-0.02em' }}>{p.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.9, marginBottom: 28 }}>{p.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                    {p.features.map(f => (
                      <li key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, display: 'block', flexShrink: 0 }} />{f}
                      </li>
                    ))}
                  </ul>
                  <a href={p.href} target={p.href.startsWith('http') ? '_blank' : undefined} rel="noopener" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: p.color }}>Learn more →</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .products-grid { grid-template-columns: 1fr !important; } .flow-line { display: none; } }`}</style>
    </section>
  )
}