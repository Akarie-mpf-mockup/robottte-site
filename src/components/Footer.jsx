export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <a href="#" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', background: 'linear-gradient(135deg, #4f7cff, #7c5cfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>robottte</a>
          <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[['サービス','#services'],['会社概要','#about'],['採用','#team'],['お問い合わせ','#contact']].map(([label, href]) => (
              <a key={href} href={href} style={{ fontSize: '0.83rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{label}</a>
            ))}
          </nav>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>© 2024 robottte Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
