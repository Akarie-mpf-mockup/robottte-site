export default function Footer() {
  const nav = [['Philosophy','#why'],['Products','#products'],['Team','#team'],['Company','#about'],['News','#news'],['Careers','#careers'],['Contact','#contact']]
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '56px 0 40px', background: '#0F1923' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src="/images/robottte納品_slim.png" alt="robottte" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.03em', color: '#fff', marginBottom: 6 }}>robottte</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 400, color: 'rgba(255,255,255,0.35)', lineHeight: 1.9, letterSpacing: '0.02em' }}>
                Designing the Habitable Zone<br />for Human Work.
              </p>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            {nav.map(([label, href]) => (
              <a key={href} href={href}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>{label}</a>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>© 2024 robottte Inc. All rights reserved.</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>Habitable Zone for Human Work.</p>
        </div>
      </div>
    </footer>
  )
}
