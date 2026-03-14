import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── メンバーデータ ────────────────────────────────────────────────
const members = [
  {
    name: '高橋 健一',
    nameEn: 'Kenichi Takahashi',
    role: 'Founder / CEO',
    pillar: '事業経験',
    pillarDesc: 'Business',
    photo: '/images/プロフィール-removebg-preview.jpeg',
    bio: '東京外国語大学卒業後、ユニリーバ・ベネッセ（介護事業）を経て、株式会社アカリエを創業。従業員150名規模まで事業を成長させ EXIT を経験。労働集約産業の経営課題を内側から知り尽くした起業家として、robottteを創業。',
    career: ['東京外国語大学', 'ユニリーバ', 'ベネッセ（介護事業）', '株式会社アカリエ 創業 / EXIT', 'robottte 創業'],
  },
  {
    name: '清水 愛理',
    nameEn: 'Airi Shimizu',
    role: 'Engineer',
    pillar: '技術',
    pillarDesc: 'Technology',
    photo: null,
    bio: 'エンジニア歴20年のフルスタックエンジニア。ニコンシステムズ、アカリエでの開発を経てrobottteへ。現場業務を熟知した視点から、使われるプロダクトを設計・開発する。',
    career: ['ニコンシステムズ', '株式会社アカリエ', 'robottte'],
  },
  {
    name: '林 和',
    nameEn: null,
    role: 'Customer Success',
    pillar: '現場理解',
    pillarDesc: 'Field',
    photo: null,
    bio: '介護士として現場経験を積んだカスタマーサクセス担当。サービスを使う人たちの「生の声」を最もリアルに受け取り、プロダクトと現場をつなぐ橋渡しを担う。現場視点のフィードバックがプロダクトの解像度を高める。',
    career: ['介護士（現場経験）', 'robottte CS'],
  },
]
// ────────────────────────────────────────────────────────────────────

const pillarColors = {
  '事業経験': { bg: 'rgba(0,160,232,0.08)', color: '#00A0E8', border: 'rgba(0,160,232,0.25)' },
  '技術':     { bg: 'rgba(0,128,192,0.08)', color: '#0080C0', border: 'rgba(0,128,192,0.25)' },
  '現場理解': { bg: 'rgba(0,110,163,0.08)', color: '#006EA3', border: 'rgba(0,110,163,0.25)' },
}

function Avatar({ name, nameEn, photo, size = 100 }) {
  if (photo) {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-light)', background: 'var(--bg2)', flexShrink: 0 }}>
        <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
    )
  }
  // 英語名があれば頭文字2文字 (例: "Airi Shimizu" → "AS")、なければ姓の一文字
  const initials = nameEn
    ? nameEn.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : name.trim().slice(0, 1)
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--accent-light)', border: '3px solid rgba(0,160,232,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: size * 0.30, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em' }}>
        {initials}
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

        {/* ヘッダー */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} style={{ marginBottom: 56 }}>
          <p className="label">Team</p>
          <h2 className="section-title" style={{ marginBottom: 16 }}>創業者・メンバー</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 2, maxWidth: 580 }}>
            現場を知る人間、技術を持つ人間、事業を動かしてきた人間。<br />
            この3つの軸が重なるチームだからこそ、構造課題に向き合えると信じている。
          </p>
        </motion.div>

        {/* 3つの軸バッジ */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 52 }}>
          {Object.entries(pillarColors).map(([label, c]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 10, background: c.bg, border: `1.5px solid ${c.border}` }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, display: 'block' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: c.color }}>{label}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: c.color, opacity: 0.7 }}>/ {c.border && `${label === '事業経験' ? 'Business' : label === '技術' ? 'Technology' : 'Field'}`}</span>
            </div>
          ))}
        </motion.div>

        {/* メンバーカード */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="team-grid">
          {members.map((m, i) => {
            const c = pillarColors[m.pillar]
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: `0 16px 48px ${c.bg.replace('0.08', '0.18')}`, transition: { duration: 0.25 } }}
                style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', borderTop: `3px solid ${c.color}`, boxShadow: 'var(--shadow)', overflow: 'hidden', transition: 'box-shadow 0.3s' }}>

                {/* カードトップ: アバター + 名前 */}
                <div style={{ padding: '36px 36px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>
                  <Avatar name={m.name} nameEn={m.nameEn} photo={m.photo} size={96} />
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontFamily: 'Inter, Noto Sans JP, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{m.name}</div>
                    {m.nameEn && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.05em', marginBottom: 14 }}>{m.nameEn}</div>}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '4px 14px', borderRadius: 6, background: 'var(--bg2)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>{m.role}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 700, padding: '4px 14px', borderRadius: 6, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{m.pillar}</span>
                    </div>
                  </div>
                </div>

                {/* カードボディ: bio + career */}
                <div style={{ padding: '28px 36px 36px' }}>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 24 }}>{m.bio}</p>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12 }}>Career</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {m.career.map((c_item, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, display: 'block', flexShrink: 0, marginTop: 6 }} />
                          {c_item}
                        </li>
                      ))}
                    </ul>
                  </div>
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
