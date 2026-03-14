import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    num: '01', name: 'HR Monster', tag: '採用管理', color: '#4f7cff', glow: 'rgba(79,124,255,0.18)',
    desc: '現場職種に特化した採用管理システム。求人票作成から応募者管理・面接調整まで、採用業務を一元化します。',
    href: 'https://hr-monster.io/', linkLabel: 'hr-monster.io →',
    icon: (<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={44} height={44}><circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.2"/><path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  },
  {
    num: '02', name: 'Talent Keeper', tag: '定着支援', color: '#7c5cfc', glow: 'rgba(124,92,252,0.18)',
    desc: '入社後フォローを自動化し早期離職を防止。スタッフの満足度・エンゲージメントを継続的に可視化します。',
    href: '#contact', linkLabel: 'お問い合わせ →',
    icon: (<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={44} height={44}><path d="M24 6L6 16v16l18 10 18-10V16L24 6z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M24 6v26M6 16l18 10 18-10" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/></svg>),
  },
  {
    num: '03', name: 'HR Chat', tag: 'AI チャット', color: '#00d4aa', glow: 'rgba(0,212,170,0.18)',
    desc: 'AIを活用した求職者・スタッフ向けチャットシステム。24時間対応で採用・相談・情報提供をスムーズに。',
    href: '#contact', linkLabel: 'お問い合わせ →',
    icon: (<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width={44} height={44}><path d="M40 8H8a2 2 0 00-2 2v22a2 2 0 002 2h8l8 8 8-8h8a2 2 0 002-2V10a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M16 21h16M16 27h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  },
]

function ServiceCard({ s, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '44px 36px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: s.glow, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 24 }}>{s.num}</div>
        <div style={{ color: s.color, marginBottom: 20 }}>{s.icon}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>{s.name}</h3>
        <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', padding: '4px 12px', borderRadius: 100, background: `${s.color}18`, color: s.color, marginBottom: 20, alignSelf: 'flex-start' }}>{s.tag}</span>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.85, flex: 1, marginBottom: 28 }}>{s.desc}</p>
        <a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener" style={{ fontSize: '0.88rem', fontWeight: 700, color: s.color }}>{s.linkLabel}</a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section id="services" style={{ padding: '120px 0', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Services</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2 }}>3つのプロダクトで、<br />人事の課題をまるごと解決</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="services-grid">
          {services.map((s, i) => <ServiceCard key={s.name} s={s} index={i} />)}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .services-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
