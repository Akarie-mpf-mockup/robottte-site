import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function PressModal({ press, onClose }) {
  const scrollRef = useRef(null)
  const sectionRefs = useRef({})
  const chipRefs = useRef({})
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (!press) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    setActiveId('press-section-0')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [press, onClose])

  useEffect(() => {
    if (!press || !scrollRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const top = visible.reduce((a, b) => a.boundingClientRect.top < b.boundingClientRect.top ? a : b)
          setActiveId(top.target.id)
        }
      },
      { root: scrollRef.current, rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [press])

  useEffect(() => {
    if (!activeId) return
    const chip = chipRefs.current[activeId]
    chip?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeId])

  const handleTocClick = (id) => {
    const el = sectionRefs.current[id]
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
    }
  }

  const para = { fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: 12 }
  const sectionHeading = { fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '1.18rem', fontWeight: 700, lineHeight: 1.5, letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: 14 }

  const renderParas = (arr) => arr?.map((p, i) => <p key={i} style={para}>{p}</p>)

  return (
    <AnimatePresence>
      {press && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(10, 25, 40, 0.55)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '5vh 24px', overflow: 'hidden',
          }}>
          <motion.article
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={e => e.stopPropagation()}
            ref={scrollRef}
            style={{
              position: 'relative',
              width: '100%', maxWidth: 820, maxHeight: '90vh',
              background: 'var(--surface)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-lg)',
              overflowY: 'auto', overflowX: 'hidden',
            }}>

            {/* Sticky TOC bar */}
            <div style={{
              position: 'sticky', top: 0, zIndex: 5,
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              borderBottom: '1px solid var(--border-light)',
            }}>
              <nav className="press-toc-nav" style={{ flex: 1, minWidth: 0, display: 'flex', gap: 6, overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                {press.sections.map((sec, i) => {
                  const id = `press-section-${i}`
                  const active = activeId === id
                  return (
                    <button key={id}
                      ref={el => { chipRefs.current[id] = el }}
                      onClick={() => handleTocClick(id)}
                      style={{
                        flexShrink: 0,
                        padding: '6px 12px',
                        fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '0.76rem', fontWeight: 600,
                        borderRadius: 999, border: '1px solid transparent', cursor: 'pointer',
                        background: active ? 'var(--accent)' : 'var(--bg2)',
                        color: active ? '#fff' : 'var(--text-muted)',
                        transition: 'background 0.2s, color 0.2s',
                        whiteSpace: 'nowrap',
                      }}>
                      {sec.tocLabel || sec.heading}
                    </button>
                  )
                })}
              </nav>
              <button onClick={onClose} aria-label="閉じる" className="press-close"
                style={{
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1px solid var(--border-light)',
                  background: 'rgba(255,255,255,0.95)', cursor: 'pointer',
                  fontSize: '1.15rem', color: 'var(--text-muted)',
                }}>×</button>
            </div>

            <div style={{ padding: '0 56px 48px' }} className="press-body">

              {/* Letter header */}
              <header style={{ paddingTop: 28, paddingBottom: 28, borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, padding: '4px 12px', borderRadius: 6, background: 'var(--accent-light)', color: 'var(--accent)' }}>{press.category}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'var(--text-dim)' }}>{press.date}</span>
                  {press.eyebrow && (
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.10em', color: 'var(--text-dim)', fontWeight: 600, marginLeft: 'auto' }}>{press.eyebrow}</span>
                  )}
                </div>
                <h1 style={{ fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 12 }}>
                  <span className="gradient-text">{press.title}</span>
                </h1>
                {press.subtitle && (
                  <p style={{ fontSize: '0.98rem', lineHeight: 1.65, color: 'var(--text)', fontWeight: 500, marginBottom: 18 }}>{press.subtitle}</p>
                )}
                {press.byline && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--text)', fontWeight: 700 }}>{press.byline.name}</span>
                    <span style={{ color: 'var(--text-dim)', marginLeft: 10 }}>{press.byline.role}</span>
                  </p>
                )}
              </header>

              {/* Intro */}
              {press.intro && (
                <div style={{ padding: '22px 0', borderBottom: '1px solid var(--border-light)' }}>
                  {renderParas(press.intro)}
                </div>
              )}

              {/* Sections */}
              {press.sections.map((sec, i) => {
                const id = `press-section-${i}`
                return (
                  <section key={id} id={id}
                    ref={el => { sectionRefs.current[id] = el }}
                    style={{ padding: '24px 0', borderBottom: '1px solid var(--border-light)', scrollMarginTop: 64 }}>
                    <h2 style={sectionHeading}>{sec.heading}</h2>
                    {renderParas(sec.body)}

                    {sec.quotes && (
                      <ul style={{ listStyle: 'none', padding: '4px 0 10px', margin: 0 }}>
                        {sec.quotes.map((q, j) => (
                          <li key={j} style={{ position: 'relative', padding: '8px 0 8px 22px', fontSize: '0.93rem', lineHeight: 1.8, color: 'var(--text)' }}>
                            <span style={{ position: 'absolute', left: 0, top: 16, width: 10, height: 2, background: 'var(--accent)' }} />
                            「{q}」
                          </li>
                        ))}
                      </ul>
                    )}

                    {sec.callout && (
                      <div style={{ margin: '10px 0 14px', padding: '16px 20px', background: 'var(--bg2)', borderLeft: '3px solid var(--accent)', borderRadius: 8 }}>
                        <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--text)', fontWeight: 600 }}>{sec.callout}</p>
                      </div>
                    )}

                    {sec.enumerated && (
                      <ol style={{ listStyle: 'none', counterReset: 'enum', padding: '4px 0 10px', margin: 0 }}>
                        {sec.enumerated.map((step, j) => (
                          <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0' }}>
                            <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j + 1}</span>
                            <span style={{ fontSize: '0.93rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}

                    {sec.products && (
                      <div style={{ display: 'grid', gap: 14, paddingTop: 6 }}>
                        {sec.products.map((p, j) => (
                          <div key={j} style={{ padding: '18px 20px', background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: 10, boxShadow: 'var(--shadow)' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                              <h3 style={{ fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--accent)' }}>{p.name}</h3>
                              <span style={{ fontSize: '0.83rem', color: 'var(--text)', fontWeight: 500 }}>{p.tagline}</span>
                            </div>
                            {p.body?.map((line, k) => (
                              <p key={k} style={{ ...para, marginBottom: 10 }}>{line}</p>
                            ))}
                            {p.metrics && (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginTop: 12 }}>
                                {p.metrics.map((m, k) => (
                                  <div key={k} style={{ background: 'var(--bg2)', borderRadius: 8, padding: '12px 14px' }}>
                                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.08rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.01em', marginBottom: 2 }}>{m.value}</div>
                                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>{m.label}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {p.caveat && (
                              <p style={{ marginTop: 12, padding: '10px 14px', fontSize: '0.83rem', lineHeight: 1.75, color: 'var(--text-muted)', background: 'rgba(0,160,232,0.04)', borderRadius: 6, borderLeft: '2px solid rgba(0,160,232,0.4)' }}>{p.caveat}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {sec.careers && (
                      <ul style={{ listStyle: 'none', padding: '10px 0 4px', margin: 0, display: 'grid', gap: 8 }}>
                        {sec.careers.map((c, j) => (
                          <li key={j} style={{ padding: '12px 16px', background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border-light)' }}>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{c.role}</div>
                            <div style={{ fontSize: '0.86rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{c.hint}</div>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sec.afterBody && (
                      <div style={{ paddingTop: sec.quotes || sec.callout || sec.enumerated || sec.careers || sec.products ? 14 : 0 }}>
                        {renderParas(sec.afterBody)}
                      </div>
                    )}
                  </section>
                )
              })}

              {press.closing && (
                <div style={{ padding: '32px 0 8px', textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 6 }}>{press.closing.date}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: 4 }}>{press.closing.role}</div>
                  <div style={{ fontFamily: 'Inter, M PLUS 1p, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{press.closing.name}</div>
                </div>
              )}

              {press.furtherReading?.length > 0 && (
                <div style={{ marginTop: 24, padding: '20px 24px', background: 'var(--bg2)', borderRadius: 12 }}>
                  <p className="label" style={{ marginBottom: 12 }}>もっと知りたい方へ</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                    {press.furtherReading.map((l, i) => (
                      <li key={i}>
                        <a href={l.href} onClick={l.scrollOnClose ? onClose : undefined}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent)' }}>
                          → {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {press.contact && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-light)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      お問い合わせ：<a href={`mailto:${press.contact}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>{press.contact}</a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
      <style>{`
        @media (max-width: 700px) {
          .press-body { padding: 0 22px 36px !important; }
        }
        .press-toc-nav::-webkit-scrollbar { display: none; }
        .press-close:hover { background: #fff !important; color: var(--text) !important; }
      `}</style>
    </AnimatePresence>
  )
}
