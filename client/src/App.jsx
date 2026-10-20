import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Moon, Menu, X, Github, Linkedin, Mail, Download, ExternalLink, 
  MapPin, GraduationCap, Briefcase, Award, CheckCircle2, 
  Code2, Terminal, Database, Layers, ArrowUpRight, Sparkles, Send, FileText,
  Search, Bot, ArrowUp, Copy, Check, Eye, Cloud, Sunset
} from 'lucide-react';
import { portfolioData } from './portfolioData.js';
import CommandPalette from './components/CommandPalette.jsx';
import AiChatModal from './components/AiChatModal.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import Toast from './components/Toast.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import DynamicSky from './components/DynamicSky.jsx';
import CometDial from './components/CometDial.jsx';
import GlassSurface from './components/GlassSurface.jsx';
import GooeyNav from './components/GooeyNav.jsx';
import TechText from './components/TechText.jsx';

// ==========================================
// 1. NAVBAR
// ==========================================
function Navbar({ 
  isDarkMode, 
  setIsDarkMode, 
  onOpenCmd, 
  onOpenAi,
  showToast 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const isNavigatingRef = useRef(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Resume', href: '#resume' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Certs', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      if (isNavigatingRef.current) return;

      const sectionIds = [
        'hero',
        'about',
        'skills',
        'projects',
        'resume',
        'timeline',
        'certifications',
        'contact'
      ];

      const scrollPos = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = id === 'hero' ? document.querySelector('.hero') : document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            if (id === 'hero') {
              setActiveNavIndex(0);
            } else {
              const foundIdx = navItems.findIndex(item => item.href === `#${id}`);
              if (foundIdx !== -1) setActiveNavIndex(foundIdx);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectNav = (index, href) => {
    setActiveNavIndex(index);
    isNavigatingRef.current = true;
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 700);
    if (href) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <GlassSurface
          width="100%"
          height={64}
          borderRadius={32}
          distortionScale={-140}
          borderWidth={0.05}
          blur={10}
          displace={0.3}
          backgroundOpacity={isDarkMode ? 0.22 : 0.45}
          saturation={1.2}
          className="navbar-glass-surface"
        >
          <div className="nav-inner">
            <a 
              href="#" 
              className="nav-logo"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveNavIndex(0);
              }}
            >
              <div className="logo-badge">TS</div>
              <span className="logo-name">Tejender.dev</span>
            </a>

            {/* Desktop Center Gooey Nav */}
            <div className="nav-center-dock">
              <GooeyNav
                items={navItems}
                activeIndex={activeNavIndex}
                onChange={(idx) => handleSelectNav(idx, navItems[idx]?.href)}
                theme={isDarkMode ? 'dark' : 'light'}
                size="sm"
                frame={false}
                color="var(--accent)"
                activeTextColor={isDarkMode ? '#0a0b0e' : '#1a2e05'}
                colors={isDarkMode ? ['#bef264', '#a3e635', '#38bdf8'] : ['#65a30d', '#84cc16', '#0284c7']}
                particleCount={12}
                spread={36}
                animationTime={480}
                timeVariance={200}
                gooeyness={0.55}
                wobble={0.35}
                hoverEffect={true}
                className="portfolio-gooey-nav"
              />
            </div>

            {/* Right Action Tools */}
            <div className="nav-actions">
              <button 
                onClick={onOpenCmd} 
                className="cmd-trigger-btn"
                title="Search & Commands (Cmd+K)"
              >
                <Search size={14} />
                <span className="cmd-text">Search</span>
                <kbd className="cmd-kbd">⌘K</kbd>
              </button>

              <button 
                onClick={onOpenAi} 
                className="btn-icon"
                style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
                title="Ask Tejender AI Assistant"
              >
                <Bot size={18} />
              </button>

              <button 
                onClick={() => {
                  const next = !isDarkMode;
                  setIsDarkMode(next);
                  showToast(`Switched to ${next ? 'Dark' : 'Light'} Mode`);
                }} 
                className="btn-icon"
                title="Toggle Theme"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <a href="#resume" className="btn btn-primary nav-cv-btn" style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}>
                CV
              </a>
            </div>

            {/* Mobile Drawer Toggle */}
            <div className="mobile-toggle" style={{ gap: '0.4rem' }}>
              <button onClick={onOpenCmd} className="btn-icon" title="Command Palette">
                <Search size={16} />
              </button>
              <button onClick={onOpenAi} className="btn-icon" style={{ color: 'var(--accent)' }} title="AI Assistant">
                <Bot size={16} />
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="btn-icon">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="btn-icon" aria-label="Toggle menu">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </GlassSurface>
      </nav>

      {/* Mobile Drawer with GlassSurface */}
      <div className={`mobile-menu-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={20}
          distortionScale={-110}
          borderWidth={0.06}
          blur={12}
          displace={0.35}
          backgroundOpacity={isDarkMode ? 0.35 : 0.65}
          className="mobile-glass-drawer"
        >
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-links">
              {navItems.map((item, idx) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    handleSelectNav(idx, item.href);
                  }}
                  className={`mobile-nav-link ${activeNavIndex === idx ? 'active' : ''}`}
                >
                  <span>{item.label}</span>
                  {activeNavIndex === idx && <span className="mobile-active-dot" />}
                </a>
              ))}
            </div>
            <div className="mobile-drawer-footer">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCmd();
                }} 
                className="cmd-trigger-btn" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Search size={14} />
                <span>Command Palette (⌘K)</span>
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAi();
                }} 
                className="btn btn-secondary" 
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.8rem' }}
              >
                <Bot size={16} /> Ask AI
              </button>
            </div>
          </div>
        </GlassSurface>
      </div>
    </>
  );
}

// ==========================================
// 2. HERO / LANDING SECTION (Typewriter & Code Terminal)
// ==========================================
function Hero({ onOpenAi, showToast, skyTime, onSkyChange }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    const roles = portfolioData.typewriterRoles;
    const current = roles[currentRoleIndex];
    let timeout;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const delta = isDeleting ? 35 : 75;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting 
            ? current.substring(0, displayText.length - 1) 
            : current.substring(0, displayText.length + 1)
        );
      }, delta);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(portfolioData.codeSnippet);
    setCodeCopied(true);
    showToast('Code snippet copied!');
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Dynamic Sky CometDial Knob replacing location tag */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
          <CometDial
            value={skyTime}
            min={0}
            max={100}
            step={1}
            unit="%"
            label="Sky Atmosphere"
            accent="var(--accent)"
            ink="var(--text-primary)"
            size={110}
            sweep={320}
            thickness={4.5}
            speed={16}
            tapBounce={0.06}
            flickBounce={0.02}
            momentum={0}
            cometReach={90}
            cometWidth={6}
            onChange={onSkyChange}
          />
        </div>

        <h1 className="sr-only">Tejender Singh Shekhawat - MERN & AI Developer</h1>
        <div className="hero-tech-text-container">
          <TechText
            text="TEJENDER SINGH"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontWeight={800}
            fontSize={96}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={16}
            color="var(--text-primary)"
            accentColor="var(--accent)"
            intro="assemble"
            introDuration={1.8}
            clickKick
            draggable
            selection
            labels
            sweep
            guides={false}
          />
        </div>

        <div className="typewriter-box">
          <span>{displayText}</span>
          <span className="cursor"></span>
        </div>

        <p className="hero-description">
          Building responsive full-stack applications with the MERN stack and AI integrations. Focused on clean architecture, scalable APIs, and memorable user experiences.
        </p>

        <div className="hero-actions">
          <a href="/api/resume/pdf" download="Tejender_Singh_Resume.pdf" className="btn btn-primary">
            <Download size={16} /> Download CV (PDF)
          </a>
          <a href="/api/resume/docx" download="Tejender_Singh_Resume.docx" className="btn btn-secondary">
            <FileText size={16} /> Download Word (.docx)
          </a>
          <button onClick={onOpenAi} className="btn btn-secondary" style={{ borderColor: 'var(--accent)' }}>
            <Bot size={16} style={{ color: 'var(--accent)' }} /> Ask Tejender AI
          </button>
          <a href="#projects" className="btn btn-secondary">
            View Projects →
          </a>
        </div>

        <div className="hero-socials">
          <a href={portfolioData.github} target="_blank" rel="noreferrer" className="social-icon-btn" title="GitHub">
            <Github size={18} />
          </a>
          <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" title="LinkedIn">
            <Linkedin size={18} />
          </a>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(portfolioData.email);
              showToast('Email address copied to clipboard!');
            }}
            className="social-icon-btn" 
            title="Copy Email"
          >
            <Mail size={18} />
          </button>
        </div>

        {/* Minimalist Code Philosophy Terminal Preview */}
        <div className="code-terminal" style={{ maxWidth: '620px', margin: '2rem auto 0 auto', textAlign: 'left' }}>
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red"></span>
              <span className="terminal-dot dot-yellow"></span>
              <span className="terminal-dot dot-green"></span>
            </div>
            <div className="terminal-title">tejender.config.ts</div>
            <button onClick={handleCopyCode} className="terminal-copy-btn">
              {codeCopied ? <Check size={12} /> : <Copy size={12} />}
              <span>{codeCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="terminal-body">
            <code>{portfolioData.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. ABOUT ME
// ==========================================
function About({ showToast }) {
  return (
    <section id="about" className="section-wrapper bg-alt">
      <div className="container">
        <div className="section-header">
          <div className="badge">About Me</div>
          <h2 className="section-title">Engineering Intelligent Solutions</h2>
          <p className="section-subtitle">Bridging software engineering, modern web technologies, and artificial intelligence.</p>
          <div className="divider"></div>
        </div>

        <div className="about-grid">
          <div className="profile-card">
            <div className="profile-avatar">TS</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>
              {portfolioData.name}
            </h3>
            <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.25rem' }}>
              CS & AI Undergraduate • JK Lakshmipat University
            </p>

            <div className="profile-details">
              <div className="profile-detail-row">
                <MapPin size={16} style={{ color: 'var(--accent)' }} />
                <span>{portfolioData.location}</span>
              </div>
              <div className="profile-detail-row">
                <GraduationCap size={16} style={{ color: 'var(--accent)' }} />
                <span>B.Tech CS & AI (2024–2028)</span>
              </div>
              <div className="profile-detail-row">
                <Briefcase size={16} style={{ color: 'var(--accent)' }} />
                <span>Available for Internships (2026)</span>
              </div>
              <div className="profile-detail-row" style={{ cursor: 'pointer' }} onClick={() => {
                navigator.clipboard.writeText(portfolioData.email);
                showToast('Email copied to clipboard!');
              }}>
                <Mail size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: '0.8rem' }}>{portfolioData.email}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="about-text">{portfolioData.bio}</p>
            <p className="about-text">
              I enjoy transforming challenging requirements into sleek, production-grade applications. Whether optimizing React component renders, architecting MongoDB schemas, or experimenting with computer vision models, my focus is always on clarity, performance, and impact.
            </p>

            <div className="stats-grid">
              {portfolioData.stats.map((s, i) => (
                <div key={i} className="stat-box">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  {s.description && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {s.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. SKILLS SECTION (Interactive Search & Tabs)
// ==========================================
function Skills() {
  const [tab, setTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', 'Frontend', 'Backend', 'Tools & Technologies'];

  const filtered = portfolioData.skills.filter((skill) => {
    const matchesTab = tab === 'All' || skill.category === tab;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.proficiency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="skills" className="section-wrapper">
      <div className="section-header">
        <div className="badge">Technical Skills</div>
        <h2 className="section-title">Skills & Technical Arsenal</h2>
        <p className="section-subtitle">Grouped by specialization with proficiency meters and real-time search.</p>
        <div className="divider"></div>
      </div>

      <div className="filter-tabs">
        {categories.map((c) => (
          <button 
            key={c} 
            onClick={() => setTab(c)} 
            className={`tab-btn ${tab === c ? 'active' : ''}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Live Search Filter */}
      <div className="skill-search-wrapper">
        <Search size={16} className="skill-search-icon" />
        <input 
          type="text" 
          placeholder="Filter skills (e.g. React, MongoDB, Node, Git)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="skill-search-input"
        />
      </div>

      <div className="skills-grid">
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No skills match "{searchQuery}".
          </div>
        ) : (
          filtered.map((skill) => (
            <div key={skill.name} className="skill-card">
              <div className="skill-top">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-meta">
                  <span className="skill-badge">{skill.proficiency}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

// ==========================================
// 5. PROJECTS SHOWCASE (Deep Dive Modals)
// ==========================================
function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Full Stack', 'Frontend', 'AI / Python'];

  const filtered = filter === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section-wrapper bg-alt">
      <div className="container">
        <div className="section-header">
          <div className="badge">Portfolio Work</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Explore interactive full-stack and machine learning applications with architecture deep-dives and live repos.</p>
          <div className="divider"></div>
        </div>

        <div className="filter-tabs">
          {categories.map((c) => (
            <button 
              key={c} 
              onClick={() => setFilter(c)} 
              className={`tab-btn ${filter === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p) => (
            <div key={p.id} className="project-card">
              <div className="project-header-banner">
                <span className="project-category-badge">{p.category}</span>
                {p.featured && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)' }}>
                    <Sparkles size={14} /> Featured
                  </span>
                )}
              </div>

              <div className="project-body">
                <div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.tagline || p.description}</p>
                </div>

                <div>
                  <div className="tech-badges">
                    {p.tech.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                    <button 
                      onClick={() => onSelectProject(p)}
                      className="btn btn-secondary" 
                      style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem', justifyContent: 'center' }}
                    >
                      <Eye size={14} /> Explore Architecture & Details
                    </button>
                  </div>

                  <div className="project-links">
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                      <Github size={15} /> Source Code
                    </a>
                    <a href={p.live} target="_blank" rel="noreferrer" className="project-link" style={{ color: 'var(--accent)' }}>
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. CV / RESUME DOWNLOAD CARD
// ==========================================
function ResumeDownload() {
  return (
    <section id="resume" className="section-wrapper">
      <div className="section-header">
        <div className="badge">Curriculum Vitae</div>
        <h2 className="section-title">Download Resume</h2>
        <p className="section-subtitle">Access my curriculum vitae in both PDF and Word (.docx) formats directly served from the backend.</p>
        <div className="divider"></div>
      </div>

      <div className="resume-card">
        <div>
          <div className="badge" style={{ marginBottom: '1rem' }}>Backend-Served Files</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            {portfolioData.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Download my complete curriculum vitae including coursework in algorithms, full-stack systems engineering, hackathon recognitions, and contact details.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
            <span>Updated for 2026 Academic & Industry Opportunities</span>
          </div>
        </div>

        <div className="resume-download-box">
          <a href="/api/resume/pdf" download="Tejender_Singh_Resume.pdf" className="download-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="download-format-badge">PDF</div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Download PDF Format</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Standard printable version</p>
              </div>
            </div>
            <Download size={18} style={{ color: 'var(--accent)' }} />
          </a>

          <a href="/api/resume/docx" download="Tejender_Singh_Resume.docx" className="download-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="download-format-badge">DOCX</div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Download Word (.docx) Format</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Editable document version</p>
              </div>
            </div>
            <Download size={18} style={{ color: 'var(--accent)' }} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. TIMELINE (Education & Experience)
// ==========================================
function Timeline() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' 
    ? portfolioData.timeline 
    : portfolioData.timeline.filter(t => t.type === filter);

  return (
    <section id="timeline" className="section-wrapper bg-alt">
      <div className="container">
        <div className="section-header">
          <div className="badge">Career & Studies</div>
          <h2 className="section-title">Education & Experience Timeline</h2>
          <p className="section-subtitle">A chronological journey through academic milestones and leadership roles.</p>
          <div className="divider"></div>
        </div>

        <div className="filter-tabs">
          {['all', 'education', 'experience'].map((m) => (
            <button 
              key={m} 
              onClick={() => setFilter(m)} 
              className={`tab-btn ${filter === m ? 'active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="timeline-container">
          {filtered.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div className="timeline-period">{item.period}</div>
                  {item.highlight && (
                    <span className="badge" style={{ margin: 0, padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
                      {item.highlight}
                    </span>
                  )}
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-org">{item.organization}</h4>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. CERTIFICATIONS & ACHIEVEMENTS
// ==========================================
function Certifications() {
  return (
    <section id="certifications" className="section-wrapper">
      <div className="section-header">
        <div className="badge">Credentials</div>
        <h2 className="section-title">Certifications & Achievements</h2>
        <p className="section-subtitle">Verified credentials, hackathon recognitions, and professional development programs.</p>
        <div className="divider"></div>
      </div>

      <div className="cert-grid">
        {portfolioData.certifications.map((c) => (
          <div key={c.id} className="cert-card">
            <div>
              <div className="cert-icon">
                <Award size={22} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem' }}>
                <span>{c.badgeText}</span>
                <span style={{ color: 'var(--text-muted)' }}>{c.date}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.25rem' }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                {c.issuer}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {c.description}
              </p>
            </div>

            {c.link && (
              <a href={c.link} target="_blank" rel="noreferrer" className="project-link" style={{ fontSize: '0.75rem' }}>
                <span>Verify Credential</span>
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 9. CONTACT FORM (Connected to Express API)
// ==========================================
function Contact({ showToast }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        showToast('Message sent successfully!');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit form.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Could not connect to the backend server. Please verify the server is running.');
    }
  };

  return (
    <section id="contact" className="section-wrapper bg-alt">
      <div className="container">
        <div className="section-header">
          <div className="badge">Get in Touch</div>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">Have an inquiry, project idea, or internship opportunity? Drop me a message!</p>
          <div className="divider"></div>
        </div>

        <div className="contact-grid">
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Let's Collaborate
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              I am actively looking for full-stack engineering internships, research collaborations, and open-source opportunities.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div 
                className="download-row" 
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigator.clipboard.writeText(portfolioData.email);
                  showToast('Email address copied!');
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} style={{ color: 'var(--accent)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email (Click to copy)</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{portfolioData.email}</div>
                  </div>
                </div>
                <Copy size={16} style={{ color: 'var(--text-muted)' }} />
              </div>

              <div className="download-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MapPin size={18} style={{ color: 'var(--accent)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{portfolioData.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Sharma"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea 
                  rows={4} 
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="form-textarea"
                />
              </div>

              {status === 'success' && (
                <div className="alert-success">
                  <CheckCircle2 size={16} />
                  <span>Thank you! Your message was sent and stored in the database.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="alert-error">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                {status === 'loading' ? 'Sending Message...' : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 10. FOOTER
// ==========================================
function Footer({ onOpenAi, onOpenCmd }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem' }}>
            Tejender Singh<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Tejender Singh Shekhawat. Built with React, Vite, Express & MongoDB.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={onOpenCmd} 
            className="btn-icon" 
            title="Command Palette (Cmd+K)"
          >
            <Search size={16} />
          </button>
          <button 
            onClick={onOpenAi} 
            className="btn-icon" 
            style={{ color: 'var(--accent)' }} 
            title="Ask AI Assistant"
          >
            <Bot size={16} />
          </button>
          <a href={portfolioData.github} target="_blank" rel="noreferrer" className="social-icon-btn" title="GitHub">
            <Github size={16} />
          </a>
          <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn" title="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${portfolioData.email}`} className="social-icon-btn" title="Email">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [skyTime, setSkyTime] = useState(85); // 0 = Day, 50 = Sunset, 100 = Night
  const [cmdOpen, setCmdOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Synchronize skyTime with theme
  const handleSkyTimeChange = (newVal) => {
    setSkyTime(newVal);
    if (newVal >= 50 && !isDarkMode) {
      setIsDarkMode(true);
    } else if (newVal < 50 && isDarkMode) {
      setIsDarkMode(false);
    }
  };

  const handleThemeToggle = (nextMode) => {
    setIsDarkMode(nextMode);
    setSkyTime(nextMode ? 85 : 15);
  };

  // Apply Theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Dynamic Procedural Cloudy Sky Canvas */}
      <DynamicSky time={skyTime} />

      {/* Scroll Progress Bar at the top */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar 
        isDarkMode={isDarkMode} 
        setIsDarkMode={handleThemeToggle}
        onOpenCmd={() => setCmdOpen(true)}
        onOpenAi={() => setAiOpen(true)}
        showToast={showToast}
      />

      {/* Main Content Sections */}
      <main>
        <Hero 
          onOpenAi={() => setAiOpen(true)} 
          showToast={showToast} 
          skyTime={skyTime}
          onSkyChange={handleSkyTimeChange}
        />
        <About 
          showToast={showToast} 
        />
        <Skills />
        <Projects 
          onSelectProject={(p) => setSelectedProject(p)} 
        />
        <ResumeDownload />
        <Timeline />
        <Certifications />
        <Contact 
          showToast={showToast} 
        />
      </main>

      <Footer 
        onOpenAi={() => setAiOpen(true)}
        onOpenCmd={() => setCmdOpen(true)}
      />

      {/* Floating Ask Tejender AI Launcher */}
      <button 
        onClick={() => setAiOpen(true)} 
        className="ai-floating-launcher"
        title="Ask Tejender AI Assistant"
      >
        <span className="pulse-beacon" style={{ margin: 0 }}></span>
        <span className="ai-floating-icon-glow">
          <Bot size={18} />
        </span>
        <span>Ask Tejender AI</span>
      </button>

      {/* Back to top button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="back-to-top-btn"
          title="Back to Top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Modals & Overlays */}
      <CommandPalette 
        isOpen={cmdOpen} 
        onClose={() => setCmdOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={handleThemeToggle}
        setSkyTime={handleSkyTimeChange}
        onOpenAi={() => setAiOpen(true)}
        onOpenProject={(p) => setSelectedProject(p)}
        showToast={showToast}
      />

      <AiChatModal 
        isOpen={aiOpen} 
        onClose={() => setAiOpen(false)}
        showToast={showToast}
      />

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <Toast 
        message={toastMessage} 
      />
    </div>
  );
}
