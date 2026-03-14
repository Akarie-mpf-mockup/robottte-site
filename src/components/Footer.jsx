export default function Footer() {
  const nav = [['Philosophy','#why'],['Products','#products'],['Results','#results'],['News','#news'],['Careers','#careers'],['Contact','#contact']]
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 0', background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 32 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12 }}>robottte</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--text-dim)', lineHeight: 1.8 }}>Designing the Habitable Zone<br />for Human Work.</p>
          </div>
          <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {nav.map(([label, href]) => (
              <a key={href} href={href} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-dim)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-muted)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>{label}</a>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)' }}>© 2024 robottte Inc. All rights reserved.</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)' }}>Habitable Zone for Human Work.</p>
        </div>
      </div>
    </footer>
  )
}