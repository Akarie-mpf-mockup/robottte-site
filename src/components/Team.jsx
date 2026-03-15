import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── メンバーデータ ────────────────────────────────────────────────
const members = [
  {
    name: '高橋 健一',
    nameEn: 'Kenichi Takahashi',
    initials: 'KT',
    role: 'Founder / CEO',
    pillar: '事業経験',
    pillarEn: 'Business',
    photo: '/images/プロフィール-removebg-preview.jpeg',
    bio: '東京外国語大学卒業後、ユニリーバ・ベネッセ（介護事業）を経て、株式会社アカリエを創業。従業員150名規模まで事業を成長させ EXIT を経験。現場に何度も助けられながら事業を育て、その構造課題を肌で学んできた起業家として、robottteを創業。',
    career: ['東京外国語大学', 'ユニリーバ', 'ベネッセ（介護事業）', '株式会社アカリエ 創業 / EXIT', 'robottte 創業'],
  },
  {
    name: null,
    nameEn: null,
    initials: 'AS',
    role: 'Engineer',
    pillar: '技術',
    pillarEn: 'Technology',
    photo: null,
    bio: 'エンジニア歴20年のフルスタックエンジニア。大手メーカーのシステム開発、アカリエでの開発を経てrobottteへ。現場業務を熟知した視点から、使われるプロダクトを設計・開発する。',
    career: ['大手メーカーシステム', '株式会社アカリエ', 'robottte'],
  },
  {
    name: null,
    nameEn: null,
    initials: 'NH',
    role: 'Customer Success',
    pillar: '現場理解',
    pillarEn: 'Field',
    photo: null,
    bio: '介護士として現場経験を積んだカスタマーサクセス担当。サービスを使う人たちの「生の声」を最もリアルに受け取り、プロダクトと現場をつなぐ橋渡しを担う。現場視点のフィードバックがプロダクトの解像度を高める。',
    career: ['介護士（現場経験）', '株式会社アカリエ', 'robottte CS'],
  },
]
// ────────────────────────────────────────────────────────────────────

const pillarColors = {
  '事業経験': { bg: 'rgba(0,160,232,0.08)', color: '#00A0E8', border: 'rgba(0,160,232,0.25)' },
  '技術':     { bg: 'rgba(0,128,192,0.08)', color: '#0080C0', border: 'rgba(0,128,192,0.25)' },
  '現場理解': { bg: 'rgba(0,110,163,0.08)', color: '#006EA3', border: 'rgba(0,110,163,0.25)' },
}

function Avatar({ member, size = 96 }) {
  const c = pillarColors[member.pillar]
  if (member.photo) {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-light)', background: 'var(--bg2)', flexShrink: 0 }}>
        <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
    )
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: c.bg, border: `3px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: size * 0.30, fontWeight: 700, color: c.color, letterSpacing: '0.05em' }}>
        {member.initials}
      </span>
    </div>
  )
}

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="team" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">

        <motion.div ref={ref} initial={{ opacity: 0, y: 80, scale: 0.93 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28 }} style={{ marginBottom: 56 }}>
          <p className="label">Team</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>創業者・メンバー</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 2, maxWidth: 580 }}>
            現場を知る人間、技術を持つ人間、事業を動かしてきた人間。<br />
            この3つの軸が重なるチームだからこそ、構造課題に向き合えると信じている。
          </p>
        </motion.div>

        {/* 3つの軸バッジ */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 500, damping: 28, delay: 0.1 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 52 }}>
          {members.map(m => {
            const c = pillarColors[m.pillar]
            return (
              <div key={m.pillar} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 10, background: c.bg, border: `1.5px solid ${c.border}` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, display: 'block' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: c.color }}>{m.pillar}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: c.color, opacity: 0.6 }}>/ {m.pillarEn}</span>
              </div>
            )
          })}
        </motion.div>

        {/* メンバーカード */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="team-grid">
          {members.map((m, i) => {
            const c = pillarColors[m.pillar]
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 100, scale: 0.92 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 480, damping: 26, delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -6, boxShadow: `0 16px 48px ${c.bg.replace('0.08', '0.18')}`, transition: { duration: 0.25 } }}
                style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', borderTop: `3px solid ${c.color}`, boxShadow: 'var(--shadow)', overflow: 'hidden', transition: 'box-shadow 0.3s' }}>

                <div style={{ padding: '36px 36px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>
                  <Avatar member={m} size={96} />
                  <div style={{ marginTop: 20 }}>
                    {m.name && <div style={{ fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{m.name}</div>}
                    {m.nameEn && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.05em', marginBottom: 14 }}>{m.nameEn}</div>}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: m.nameEn ? 0 : 14 }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '4px 14px', borderRadius: 6, background: 'var(--bg2)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>{m.role}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 700, padding: '4px 14px', borderRadius: 6, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{m.pillar}</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '28px 36px 36px' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 24 }}>{m.bio}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12 }}>Career</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {m.career.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, display: 'block', flexShrink: 0, marginTop: 6 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .team-grid { grid-template-columns: 1fr !important; max-width: 520px; margin: 0 auto; } }`}</style>
    </section>
  )
}
