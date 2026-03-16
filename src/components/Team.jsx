import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

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

const pillarColors = {
  '事業経験': { bg: 'rgba(0,160,232,0.08)', color: '#00A0E8', border: 'rgba(0,160,232,0.25)' },
  '技術':     { bg: 'rgba(0,128,192,0.08)', color: '#0080C0', border: 'rgba(0,128,192,0.25)' },
  '現場理解': { bg: 'rgba(0,110,163,0.08)', color: '#006EA3', border: 'rgba(0,110,163,0.25)' },
}

function Avatar({ member, size = 56 }) {
  const c = pillarColors[member.pillar]
  if (member.photo) {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-light)', background: 'var(--bg2)', flexShrink: 0 }}>
        <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
    )
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: c.bg, border: `2px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: size * 0.30, fontWeight: 700, color: c.color, letterSpacing: '0.05em' }}>
        {member.initials}
      </span>
    </div>
  )
}

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredId, setHoveredId] = useState(null)

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {members.map((m, i) => {
            const c = pillarColors[m.pillar]
            const isHovered = hoveredId === i

            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 90, scale: 0.93 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 480, damping: 26, delay: 0.15 + i * 0.08 }}
                onMouseEnter={() => setHoveredId(i)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: isHovered ? c.bg : 'var(--surface)',
                  borderRadius: 'var(--radius)',
                  border: `1px solid ${isHovered ? c.border : 'var(--border-light)'}`,
                  borderTop: `3px solid ${c.color}`,
                  boxShadow: isHovered ? `0 12px 40px ${c.bg.replace('0.08', '0.20')}` : 'var(--shadow)',
                  overflow: 'hidden',
                  transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}>

                {/* 常時表示：アバター＋名前＋役職 */}
                <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
                  <Avatar member={m} size={56} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                      {m.name || m.initials}
                      {m.nameEn && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 400, marginLeft: 10 }}>{m.nameEn}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '3px 12px', borderRadius: 6, background: 'var(--bg2)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>{m.role}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: 6, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{m.pillar} / {m.pillarEn}</span>
                    </div>
                  </div>
                  <motion.span
                    animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: c.color, fontWeight: 600, flexShrink: 0 }}>
                    詳細 ↓
                  </motion.span>
                </div>

                {/* ホバーで展開 */}
                <AnimatePresence initial={false}>
                  {isHovered && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 28px 28px', borderTop: `1px solid ${c.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, paddingTop: 24 }} className="team-detail-grid">
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.color, marginBottom: 10 }}>Profile</p>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>{m.bio}</p>
                        </div>
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.color, marginBottom: 10 }}>Career</p>
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {m.career.map((item, j) => (
                              <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, display: 'block', flexShrink: 0, marginTop: 6 }} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`@media (max-width: 600px) { .team-detail-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
