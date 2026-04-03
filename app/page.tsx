'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import s from './portfolio.module.css'

/* ─── DATA ───────────────────────────── */
const SKILLS = [
  { cat: 'Backend',  name: 'Python / FastAPI',    lvl: 'Expert',      pct: .90, color: 'var(--gold)' },
  { cat: 'Backend',  name: 'Django / DRF',         lvl: 'Advanced',    pct: .82, color: 'var(--gold)' },
  { cat: 'Frontend', name: 'Next.js / React',      lvl: 'Advanced',    pct: .78, color: 'var(--teal)' },
  { cat: 'Frontend', name: 'Tailwind CSS',          lvl: 'Proficient',  pct: .75, color: 'var(--teal)' },
  { cat: 'Database', name: 'PostgreSQL',            lvl: 'Advanced',    pct: .80, color: '#7B9AE0' },
  { cat: 'Database', name: 'Supabase / Firebase',  lvl: 'Proficient',  pct: .72, color: '#7B9AE0' },
  { cat: 'ML / AI',  name: 'Scikit-learn',          lvl: 'Proficient',  pct: .70, color: 'var(--red)' },
  { cat: 'ML / AI',  name: 'Pandas / NumPy',        lvl: 'Advanced',    pct: .78, color: 'var(--red)' },
  { cat: 'DevOps',   name: 'Docker',                lvl: 'Intermediate',pct: .62, color: 'var(--muted)' },
  { cat: 'DevOps',   name: 'Git / GitHub',          lvl: 'Expert',      pct: .92, color: 'var(--muted)' },
  { cat: 'Security', name: 'JWT / OAuth2',          lvl: 'Advanced',    pct: .80, color: '#C8A060' },
  { cat: 'Security', name: 'Secure Architecture',   lvl: 'Proficient',  pct: .74, color: '#C8A060' },
]

const PROJECTS = [
  {
    num: '01', tagClass: s.ptagFs, tagLabel: 'Full-Stack',
    title: 'Personal Progress Tracker',
    desc: 'Serverless discipline system built with Next.js and Supabase. Daily execution tracking with secure data isolation and row-level security.',
    stack: ['Next.js','Supabase','TypeScript','PostgreSQL'],
    links: [{ label: 'OPEN', href: '/', hi: true }, { label: 'GITHUB', href: 'https://github.com/JediScout10', ext: true }],
  },
  {
    num: '02', tagClass: s.ptagMl, tagLabel: 'ML / Security',
    title: 'FinShield — Fraud Detection',
    desc: 'ML-powered fraud detection backend with behavioral risk analysis, IP tracking, Firebase auth telemetry, and secure transaction validation.',
    stack: ['Python','FastAPI','Firebase','Scikit-learn','Docker'],
    links: [{ label: 'LIVE', href: 'https://exekillers-hackwins2026.onrender.com/', hi: true, ext: true }, { label: 'GITHUB', href: 'https://github.com/JediScout10', ext: true }],
  },
  {
    num: '03', tagClass: s.ptagWeb, tagLabel: 'Web / Django',
    title: 'CareConnect',
    desc: 'Django-based mental health platform integrating structured assessments and AI-powered analysis tools for clinical insights.',
    stack: ['Django','Python','PostgreSQL','REST API'],
    links: [{ label: 'GITHUB', href: 'https://github.com/JediScout10', ext: true }],
  },
  {
    num: '04', tagClass: s.ptagDo, tagLabel: 'DevOps',
    title: 'Secure Auth System',
    desc: 'JWT-based authentication system with refresh token rotation, device fingerprinting, brute-force protection, and audit logging.',
    stack: ['FastAPI','JWT','Redis','PostgreSQL'],
    links: [{ label: 'GITHUB', href: 'https://github.com/JediScout10', ext: true }],
  },
]

const CERTS = [
  { abbr: 'GCP', name: 'Google Cloud Fundamentals',      org: 'Google · 2024' },
  { abbr: 'ML',  name: 'Machine Learning Specialization', org: 'Coursera / DeepLearning.AI · 2024' },
  { abbr: 'PY',  name: 'Python for Data Science',         org: 'IBM · 2023' },
  { abbr: 'SEC', name: 'Cybersecurity Fundamentals',      org: 'IBM · 2024' },
  { abbr: 'SQL', name: 'SQL for Data Science',             org: 'UC Davis / Coursera · 2023' },
  { abbr: 'API', name: 'REST API Design & Security',       org: 'Postman · 2024' },
]

const SFX_WORDS = ['WHOOSH!','ZOOM!','CLICK!','ZAPP!','BOOM!','FLASH!']
const SFX_COLORS = ['var(--gold)','var(--red)','var(--teal)','var(--cream)']

/* ─── HELPERS ────────────────────────── */
function useIntersect(cls: string, addCls: string) {
  useEffect(() => {
    const els = document.querySelectorAll(`.${cls}`)
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(addCls)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [cls, addCls])
}

/* ─── COMPONENT ──────────────────────── */
export default function PortfolioPage() {
  const toastRef = useRef<HTMLDivElement>(null)
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeSection, setActiveSection] = useState('')
  const [sfxVisible, setSfxVisible] = useState(false)
  const [sfxStyle, setSfxStyle] = useState<React.CSSProperties>({})
  const [sfxText, setSfxText] = useState('')
  const [sfxColor, setSfxColor] = useState('')

  /* Reveals */
  useIntersect(s.rev,  s.revV)
  useIntersect(s.revL, s.revLV)
  useIntersect(s.revR, s.revRV)

  /* Skill bar animation */
  useEffect(() => {
    const skEls = document.querySelectorAll(`.${s.sk}`)
    const skIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add(s.skLit); skIO.unobserve(e.target) }
      })
    }, { threshold: 0.2 })
    skEls.forEach(el => skIO.observe(el))
    return () => skIO.disconnect()
  }, [])

  /* Nav active section */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.4, rootMargin: '-52px 0px 0px 0px' })
    sections.forEach(sec => navIO.observe(sec))
    return () => navIO.disconnect()
  }, [])

  /* SFX click handler */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const word  = SFX_WORDS[Math.floor(Math.random() * SFX_WORDS.length)]
      const color = SFX_COLORS[Math.floor(Math.random() * SFX_COLORS.length)]
      setSfxText(word)
      setSfxColor(color)
      setSfxStyle({ left: e.clientX - 60 + 'px', top: e.clientY - 60 + 'px' })
      setSfxVisible(true)
      if (toastTimeout.current) clearTimeout(toastTimeout.current)
      toastTimeout.current = setTimeout(() => setSfxVisible(false), 700)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  /* Contact form */
  const handleContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name  = (form.elements.namedItem('cf-name')  as HTMLInputElement).value
    const email = (form.elements.namedItem('cf-email') as HTMLInputElement).value
    const msg   = (form.elements.namedItem('cf-msg')   as HTMLTextAreaElement).value
    window.location.href = `mailto:rohitsanjupatil.rsp10@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`
  }

  return (
    <div className={s.root}>
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bangers&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;600&family=Permanent+Marker&display=swap');`}</style>

      {/* SFX Toast */}
      <div
        ref={toastRef}
        className={`${s.sfxToast}${sfxVisible ? ' ' + s.sfxToastPop : ''}`}
        style={{ ...sfxStyle, color: sfxColor }}
      >
        {sfxText}
      </div>

      {/* ─── NAV ──────────────────────────── */}
      <nav className={s.nav}>
        <a href="#hero" className={s.nl}>RSP</a>
        <ul className={s.na}>
          {['about','skills','projects','contact'].map(sec => (
            <li key={sec}>
              <a
                href={`#${sec}`}
                className={`${s.naLink}${activeSection === sec ? ' ' + s.naLinkOn : ''}`}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:rohitsanjupatil.rsp10@gmail.com" className={s.nr}>Hire Me →</a>
      </nav>

      {/* ─── MANGA PAGE ───────────────────── */}
      <div className={s.mangaPage}>

        {/* ═══ ① HERO ════════════════════════ */}
        <section id="hero" className={s.hero}>
          <div className={s.heroBg} />

          <div className={s.heroL}>
            <div className={s.heroChapter}>
              PORTFOLIO · ISSUE 001 · 2025
              <span>NEW</span>
            </div>
            <h1 className={s.heroName}>
              <div className="line1">ROHIT</div>
              <div className="line2">SANJU</div>
              <div className="line3">PATIL.</div>
            </h1>
            <p className={s.heroRole}>// Software Engineer · Full-Stack · AI/ML</p>
            <p className={s.heroDesc}>
              Building secure backend systems and full-stack applications
              designed for long-term maintainability and real-world constraints.
              Based in Mumbai, Maharashtra.
            </p>
            <div className={s.heroBtns}>
              <a href="#projects" className={s.btnA}>View Projects</a>
              <a href="#contact"  className={s.btnB}>Get in Touch</a>
            </div>
            <div className={s.heroStats}>
              <div className={s.hstat}><div className={s.hstatN}>5+</div><div className={s.hstatL}>Projects</div></div>
              <div className={s.hstat}><div className={s.hstatN}>6</div><div className={s.hstatL}>Internships</div></div>
              <div className={s.hstat}><div className={s.hstatN}>2027</div><div className={s.hstatL}>Graduate</div></div>
            </div>
          </div>

          <div className={`${s.heroR} ${s.htWarm}`}>
            <div className={s.actionBg} style={{ bottom: '-2rem', right: '-1rem', fontSize: 'clamp(8rem,18vw,22rem)' }}>RSP</div>
            <div className={s.heroIssue}>APSIT · MUMBAI UNIV<br />ISSUE #001</div>
            <div className={s.heroBubble}>
              <div className={`${s.bubble} ${s.tailBl}`} style={{ fontSize: '.78rem' }}>
                Hey! Welcome to my portfolio.<br />Scroll down to see my work!
              </div>
            </div>
            <img className={s.heroChar} src="/static/character_wave.png" alt="Rohit waving" />
          </div>
        </section>

        <div className={s.gutterLine} />

        {/* ═══ ② ABOUT ═══════════════════════ */}
        <section id="about">
          <div className={s.aboutSpread}>
            <div className={`${s.aboutCharPanel} ${s.htCool} ${s.revL}`}>
              <div className={s.actionBg}>ORIGIN</div>
              <div className={s.aboutCharBubble}>
                <div className={`${s.bubble} ${s.tailBr}`} style={{ fontSize: '.76rem', maxWidth: '200px' }}>
                  This is me in my natural habitat — thinking about clean architecture.
                </div>
              </div>
              <img className={s.aboutChar} src="/static/character_idle.png" alt="Rohit thinking about architecture" />
            </div>

            <div className={s.aboutTextPanel}>
              <div className={s.actionBg}>LORE</div>
              <div className={`${s.panelInner} ${s.rev}`}>
                <div className={s.chLabel}>Chapter 02 · Origin Story</div>
                <h2 className={s.aboutNameBig}>ROHIT<br /><em>SANJU PATIL</em></h2>
                <p className={s.aboutPara}>
                  Final-year B.E. CS student at APSIT, Mumbai University. I build systems that are
                  secure by design — from backend APIs to full-stack products. My work focuses on
                  correctness, maintainability, and real-world constraints.
                </p>
                <p className={s.aboutPara}>
                  I&apos;ve completed 6 internships across domains including ML, web security, and
                  enterprise systems. Currently focused on backend engineering and AI-integrated products.
                </p>
                <div className={s.aboutTags}>
                  {['Python','FastAPI','Next.js','Django','Supabase','Firebase','ML/AI','Docker','PostgreSQL'].map(t => (
                    <span key={t} className={s.atag}>{t}</span>
                  ))}
                </div>
                <div className={s.eduBox}>
                  <h4>B.E. COMPUTER SCIENCE</h4>
                  <p>APSIT · Mumbai University · 2021–2025 · CGPA 8.4</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={s.gutterLine} />

        {/* ═══ ③ SKILLS ══════════════════════ */}
        <section id="skills">
          <div className={s.skillsPanel}>
            <div className={s.actionBg}>POWER</div>
            <div className={`${s.skillsHeader} ${s.rev}`}>
              <div className={s.shL}>
                <div className={s.chLabel}>Chapter 03 · Power Level</div>
                <h2>SKILL<br /><span>SET</span></h2>
              </div>
              <div className={s.shR}>// Measured in<br />real-world deployment</div>
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <img
                src="/static/character_think.png"
                alt="Rohit thinking about skills"
                style={{ width: 'min(160px,22vw)', filter: 'drop-shadow(0 -4px 20px rgba(200,52,26,.2))', flexShrink: 0 }}
              />
              <div className={s.skillGrid} style={{ flex: 1 }}>
                {SKILLS.map((sk, i) => (
                  <div
                    key={i}
                    className={s.sk}
                    style={{ '--bar-color': sk.color, '--pct': sk.pct } as React.CSSProperties}
                  >
                    <div className={s.skCat} style={{ color: sk.color }}>{sk.cat}</div>
                    <div className={s.skName}>{sk.name}</div>
                    <div className={s.skLvl}>{sk.lvl} · {Math.round(sk.pct * 100)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={s.gutterLine} />

        {/* ═══ ④ PROJECTS ════════════════════ */}
        <section id="projects">
          <div className={s.projectsSection}>
            <div className={s.projectsHdr}>
              <div className={`${s.phL} ${s.rev}`}>
                <div className={s.chLabel}>Chapter 04 · Mission Log</div>
                <h2>ACTIVE<br /><span>PROJECTS</span></h2>
              </div>
              <div className={`${s.phR} ${s.revR}`}>
                <div className={s.phBubble}>
                  <div className={`${s.bubble} ${s.tailBr}`} style={{ fontSize: '.74rem' }}>
                    These are live. Go check them out.
                  </div>
                </div>
                <img className={s.phChar} src="/static/character_point.png" alt="Rohit pointing at projects" />
              </div>
            </div>

            <div className={s.projGrid}>
              {PROJECTS.map((p, i) => (
                <div key={i} className={`${s.pcard} ${s.rev}`}>
                  <div className={s.pcardNum}>{p.num}</div>
                  <span className={`${s.ptag} ${p.tagClass}`}>{p.tagLabel}</span>
                  <div className={s.pt}>{p.title}</div>
                  <p className={s.pd}>{p.desc}</p>
                  <div className={s.pstack}>
                    {p.stack.map(st => <span key={st} className={s.pst}>{st}</span>)}
                  </div>
                  <div className={s.plinks}>
                    {p.links.map(l => (
                      <a
                        key={l.label}
                        href={l.href}
                        {...(l.ext ? { target: '_blank', rel: 'noopener' } : {})}
                        className={`${s.pl}${l.hi ? ' ' + s.plHi : ''}`}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={s.gutterLine} />

        {/* ═══ ⑤ CERTS ═══════════════════════ */}
        <section id="certs">
          <div className={s.certsSection}>
            <div className={`${s.certsHdr} ${s.rev}`}>
              <div>
                <div className={s.chLabel}>Chapter 05 · Credentials</div>
                <h2>CERTIFI<br /><span>CATIONS</span></h2>
              </div>
              <img className={s.certChar} src="/static/character_idle.png" alt="Rohit with certifications" />
            </div>

            <div className={s.certsGrid}>
              {CERTS.map((c, i) => (
                <div key={i} className={`${s.cc} ${s.rev}`}>
                  <div className={s.ci}>{c.abbr}</div>
                  <div>
                    <div className={s.cn}>{c.name}</div>
                    <div className={s.co}>{c.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={s.gutterLine} />

        {/* ═══ ⑥ CONTACT ═════════════════════ */}
        <section id="contact">
          <div className={s.contactSection}>
            <div className={`${s.contactLeft} ${s.revL}`}>
              <div className={s.chLabel}>Chapter 06 · Transmission</div>
              <h2 className={s.clBig}>LET&apos;S<br /><span>LINK UP</span></h2>
              <p className={s.clSub}>
                Open to backend engineering roles, AI/ML projects, and consulting work.
                Based in Mumbai — available remotely worldwide.
              </p>
              <div className={s.contactLinks}>
                <a href="mailto:rohitsanjupatil.rsp10@gmail.com" className={s.clink}>
                  <span className={s.clLbl}>Email</span>
                  rohitsanjupatil.rsp10@gmail.com
                </a>
                <a href="https://github.com/JediScout10" target="_blank" rel="noopener" className={s.clink}>
                  <span className={s.clLbl}>GitHub</span>
                  github.com/JediScout10
                </a>
                <a href="https://www.linkedin.com/in/rohit-patil-3b5579321" target="_blank" rel="noopener" className={s.clink}>
                  <span className={s.clLbl}>LinkedIn</span>
                  linkedin.com/in/rohit-patil-3b5579321
                </a>
                <a href="https://exekillers-hackwins2026.onrender.com/" target="_blank" rel="noopener" className={s.clink}>
                  <span className={s.clLbl}>Live Demo</span>
                  FinShield · Fraud Detection System
                </a>
              </div>
            </div>

            <div className={s.contactRight}>
              <div className={s.actionBg}>SEND</div>
              <img
                src="/static/character_talk.png"
                alt="Rohit ready to talk"
                style={{ width: 'min(140px,20vw)', filter: 'drop-shadow(-4px 0 18px rgba(232,168,40,.2))', marginBottom: '1.5rem', position: 'relative', zIndex: 2, alignSelf: 'flex-end' }}
              />
              <form className={s.contactForm} onSubmit={handleContact}>
                <div className={s.fg}>
                  <label className={s.fl} htmlFor="cf-name">Name</label>
                  <input id="cf-name" name="cf-name" className={s.fi} type="text" placeholder="Your name" required />
                </div>
                <div className={s.fg}>
                  <label className={s.fl} htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="cf-email" className={s.fi} type="email" placeholder="your@email.com" required />
                </div>
                <div className={s.fg}>
                  <label className={s.fl} htmlFor="cf-msg">Message</label>
                  <textarea id="cf-msg" name="cf-msg" className={s.fi} placeholder="What are you building?" required />
                </div>
                <button className={s.fsub} type="submit">TRANSMIT MESSAGE →</button>
              </form>
            </div>
          </div>
        </section>

        {/* TBC */}
        <div className={s.tbc}>
          <span className={s.tbcL}>TO BE CONTINUED…</span>
          <span className={s.tbcR}>NEXT CHAPTER: MORE PROJECTS // STAY TUNED</span>
        </div>

      </div>{/* /.mangaPage */}
    </div>
  )
}
