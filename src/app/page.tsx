/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';

/* ─── Data ─────────────────────────────────────────────────────────── */

const skills = [
  'Python', 'Django', 'React / Next.js', 'Node.js',
  'TypeScript', 'Azure', 'AWS', 'Docker',
  'Celery', 'PostgreSQL', 'Electron', 'Webflow',
  'WordPress', 'REST APIs',
];

const projects = [
  {
    tag: 'Maritime · SaaS Platform',
    desc: 'A comprehensive maritime sustainability and emission compliance platform for shipowners, fleet managers, and charterers. Ingests real-time vessel data to track CO₂ emissions, CII ratings, and energy performance — with a voyage optimisation engine and AI-driven fuel recommendations.',
    stack: 'React · Django · PostgreSQL · Azure · Docker · REST APIs',
    img: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1600&q=80',
    featured: true,
  },
  {
    tag: 'Marine Industry · IoT Dashboard',
    desc: 'An offshore vessel monitoring dashboard that ingests live sensor data directly from IoT devices aboard ships. Displays real-time engine metrics, temperature readings, fuel consumption, and hull health for marine engineers.',
    stack: 'React · Node.js · MQTT · Docker · PostgreSQL',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
  },
  {
    tag: 'Naval Architecture · Desktop App',
    desc: 'A cross-platform desktop application for vessel stability calculations in real time. Helps crew and naval architects assess loading conditions, metacentric height, and trim. Designed for offshore technical use with an offline-first architecture.',
    stack: 'Electron · Python · React · SQLite',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
  },
  {
    tag: 'Hospitality · Web Design',
    desc: "A premium restaurant website crafted to reflect the brand's culinary identity — animated menu reveals, reservation flow, and rich food photography layouts. Built on Webflow for a polished, client-editable experience.",
    stack: 'Webflow · CSS · Custom Interactions',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
  },
  {
    tag: 'Health & Fitness · Web Design',
    desc: 'A high-energy gym and fitness brand website with class schedules, membership tiers, trainer profiles, and a lead generation flow. Custom WordPress theme, mobile-first and fully SEO-optimised.',
    stack: 'WordPress · Custom Theme · SEO · CSS',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
  },
];

const experience = [
  {
    period: '2022 — Present',
    company: 'Independent',
    role: 'Freelance Developer',
    desc: 'Delivering end-to-end web and desktop solutions for clients across marine, hospitality, and SaaS industries. Projects span full-stack development, IoT integrations, desktop applications, and no-code builds on Webflow and WordPress.',
    tags: ['Django', 'React', 'Next.js', 'Electron', 'Webflow', 'WordPress'],
  },
  {
    period: '2023 — 2026',
    company: 'Startup',
    role: 'Software Developer',
    desc: 'Core developer at an early-stage startup, building scalable product features from scratch. Led architecture decisions, owned backend systems, and contributed across the full stack — from database design to production deployments on Azure and AWS.',
    tags: ['Python', 'Django', 'React', 'Azure', 'AWS', 'Docker', 'PostgreSQL'],
  },
  {
    period: '2022 — 2023',
    company: 'Startup',
    role: 'Technical Associate',
    desc: 'Joined as an early team member in a technical associate capacity. Supported product development, contributed to frontend and backend features, and helped establish foundational engineering practices in a fast-moving startup environment.',
    tags: ['Python', 'React', 'Node.js', 'REST APIs'],
  },
];

const marqueeItems = [
  'Full-Stack Development', 'Django & Python', 'React & Next.js',
  'Azure & AWS Cloud', 'Docker & Celery', 'Marine SaaS',
  'Electron Desktop Apps', 'PostgreSQL', 'Webflow', 'WordPress',
];

/* ─── Reveal wrapper ───────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, className = '',
}: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section label ────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-6">
      <span className="inline-block w-7.5 h-px bg-gold" />
      {children}
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const [darkMode, setDarkMode] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  /* ── Theme ── */
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--gold', '#C9A84C');
      root.style.setProperty('--gold-dim', '#8a6f30');
      root.style.setProperty('--cream', '#F5F0E8');
      root.style.setProperty('--ink', '#0E0D0C');
      root.style.setProperty('--ink2', '#1e1c19');
      root.style.setProperty('--ink3', '#2e2b25');
      root.style.setProperty('--muted', '#6b665c');
      root.style.setProperty('--border', 'rgba(201, 168, 76, 0.2)');
      document.body.style.background = '#0E0D0C';
      document.body.style.color = '#F5F0E8';
    } else {
      root.style.setProperty('--gold', '#8a5f10');
      root.style.setProperty('--gold-dim', '#b8902a');
      root.style.setProperty('--cream', '#1a1916');
      root.style.setProperty('--ink', '#FAF7F2');
      root.style.setProperty('--ink2', '#F0EBE1');
      root.style.setProperty('--ink3', '#E8E1D5');
      root.style.setProperty('--muted', '#7a7167');
      root.style.setProperty('--border', 'rgba(138, 95, 16, 0.18)');
      document.body.style.background = '#FAF7F2';
      document.body.style.color = '#1a1916';
    }
  }, [darkMode]);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  /* ── Custom cursor (desktop only) ── */
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;
    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    };
    const grow = () => {
      cursor.style.width = '16px'; cursor.style.height = '16px';
      follower.style.width = '56px'; follower.style.height = '56px';
    };
    const shrink = () => {
      cursor.style.width = '10px'; cursor.style.height = '10px';
      follower.style.width = '36px'; follower.style.height = '36px';
    };
    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Custom cursor — hidden on touch devices via CSS */}
      <div id="cursor" />
      <div id="cursor-follower" />

      {/* ── Theme Toggle ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={() => setDarkMode(v => !v)}
        aria-label="Toggle theme"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[200] w-11 h-11 md:w-11.5 md:h-11.5 rounded-full border border-(--border) bg-(--ink2) text-gold flex items-center justify-center text-lg transition-all duration-300 backdrop-blur-[10px] cursor-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? '○' : '●'}
      </motion.button>

      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-(--ink)" />
        <div className="absolute inset-0 hero-radial-bg" />
        <div className="hero-grid" />

        {/* Side decorative lines — hidden on small screens */}
        <div className="hidden md:block absolute left-8 lg:left-16 top-0 bottom-0 w-px hero-side-line" />
        <div className="hidden md:block absolute right-8 lg:right-16 top-0 bottom-0 w-px hero-side-line" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center gap-3 sm:gap-4 font-mono text-[0.65rem] sm:text-[0.72rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-gold mb-5 sm:mb-6"
          >
            <span className="inline-block w-6 sm:w-10 h-px bg-gold opacity-50" />
            Full-Stack Developer
            <span className="inline-block w-6 sm:w-10 h-px bg-gold opacity-50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="heading-font font-light leading-[0.88] tracking-[-0.02em] text-(--cream) mb-6 sm:mb-8 text-[clamp(4rem,14vw,11rem)]"
          >
            Rahul<br />
            <em className="italic text-gold">Builds.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="text-[0.88rem] sm:text-[0.95rem] text-(--muted) tracking-[0.03em] sm:tracking-[0.05em] mb-10 sm:mb-12 leading-loose px-2 sm:px-0"
          >
            4+ years crafting elegant digital experiences<br />
            <span className="text-gold opacity-80 text-[0.82rem] sm:text-base">
              Python · Django · React · Next.js · Node.js · Azure · Docker
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-4 sm:gap-6 justify-center flex-wrap"
          >
            <button
              className="cta-btn"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>View My Work</span><span>↓</span>
            </button>
            <button
              className="cta-btn cta-btn--ghost"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Get In Touch</span><span>→</span>
            </button>
          </motion.div>
        </motion.div>

        <div className="scroll-hint absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-(--muted)">
          <span>Scroll</span>
          <div className="scroll-line w-px h-10 sm:h-12.5 bg-linear-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div className="overflow-hidden py-5 sm:py-6 border-t border-b border-(--border) bg-(--ink3)">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-8 sm:gap-12 shrink-0">
              {item}
              <span className="text-gold not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ ABOUT ══════════════ */}
      <section
        id="about"
        className="py-20 sm:py-28 lg:py-40 px-5 sm:px-8 lg:px-16"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-32 items-start lg:items-center">
          <div>
            <Reveal><SectionLabel>About</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-font font-light leading-none tracking-[-0.02em] mb-7 sm:mb-8 text-[clamp(2.6rem,6vw,5rem)]">
                Crafting<br />
                <em className="italic text-gold">Digital</em><br />
                Spaces
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-(--muted) text-[0.97rem] sm:text-[1.05rem] leading-[1.9] mb-5 sm:mb-6">
                With 4+ years of experience, I build robust and beautiful applications that live at the intersection of engineering precision and design sensibility.
              </p>
              <p className="text-(--muted) text-[0.97rem] sm:text-[1.05rem] leading-[1.9]">
                From maritime SaaS platforms and live IoT dashboards to vessel desktop tools and polished brand websites — I bring the same care and craft to every layer of the stack.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex gap-8 sm:gap-12 mt-10 sm:mt-12 pt-10 sm:pt-12 border-t border-(--border) flex-wrap">
                {[['4+', 'Years Experience'], ['10+', 'Projects Shipped'], ['3+', 'Industries Served']].map(([num, label]) => (
                  <div key={label}>
                    <div className="heading-font text-[3rem] sm:text-[3.5rem] font-light text-gold leading-none">{num}</div>
                    <div className="font-mono text-[0.68rem] sm:text-[0.72rem] tracking-[0.12em] uppercase text-(--muted) mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <SectionLabel>Tech Stack</SectionLabel>
            <div className="border border-(--border) grid grid-cols-2">
              {skills.map((skill, i) => (
                <div
                  key={skill}
                  className={`skill-item text-[0.85rem] sm:text-[0.9rem] ${i % 2 === 0 ? 'border-r border-(--border)' : ''} ${i < skills.length - 2 ? 'border-b border-(--border)' : ''}`}
                >
                  <div className="w-1.25 h-1.25 rounded-full bg-gold shrink-0" />
                  {skill}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ PROJECTS ══════════════ */}
      <section id="projects" className="py-20 sm:py-28 lg:py-32 px-5 sm:px-8 lg:px-16 bg-(--ink2)">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 sm:mb-16 lg:mb-20 flex-wrap gap-5 sm:gap-6">
            <div>
              <Reveal><SectionLabel>Selected Work</SectionLabel></Reveal>
              <Reveal delay={0.1}>
                <h2 className="heading-font font-light leading-none tracking-[-0.02em] text-[clamp(2.2rem,5vw,4rem)]">
                  Recent<br /><em className="italic text-gold">Projects</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <button
                className="cta-btn"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Work With Me</span><span>→</span>
              </button>
            </Reveal>
          </div>

          {/* ── MOBILE: full content cards stacked ── TABLET+: cinematic overlay cards ── */}

          {/* Featured project */}
          <Reveal>
            {/* Mobile version — image top, text below */}
            <div className="block sm:hidden border border-(--border) mb-4 overflow-hidden bg-(--ink3)">
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <img className="project-img" src={projects[0].img} alt={projects[0].tag} loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-[rgba(14,13,12,0.55)] to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-gold bg-[rgba(14,13,12,0.75)] px-2 py-1">
                    {projects[0].tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 border border-[rgba(201,168,76,0.5)] rounded-full flex items-center justify-center text-gold text-sm">↗</div>
              </div>
              <div className="p-5 border-t border-(--border)">
                <p className="text-[0.9rem] text-[rgba(245,240,232,0.82)] leading-[1.75] mb-3">{projects[0].desc}</p>
                <p className="font-mono text-[0.67rem] text-(--muted) tracking-[0.08em]">{projects[0].stack}</p>
              </div>
            </div>

            {/* Tablet+ cinematic version */}
            <div
              className="hidden sm:block project-card mb-0.75"
              style={{ aspectRatio: '16/9' }}
              onMouseEnter={() => setHoveredProject(0)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <img className="project-img" src={projects[0].img} alt={projects[0].tag} loading="lazy" />
              <div className="absolute inset-0 bg-linear-to-br from-[rgba(14,13,12,0.97)] via-[rgba(14,13,12,0.4)] to-transparent" />
              <div
                className="absolute top-0 left-0 border-t border-l border-[rgba(201,168,76,0.4)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: hoveredProject === 0 ? 160 : 100, height: hoveredProject === 0 ? 160 : 100 }}
              />
              <div className="absolute bottom-0 right-0 w-15 h-15 border-b border-r border-[rgba(201,168,76,0.2)]" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <p className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-gold mb-3">{projects[0].tag}</p>
                <p className="text-[0.95rem] lg:text-[1rem] text-[rgba(245,240,232,0.78)] leading-[1.85] mb-5 max-w-2xl">{projects[0].desc}</p>
                <p className="project-stack-text font-mono text-[0.72rem] text-(--muted) tracking-[0.08em]">{projects[0].stack}</p>
              </div>
            </div>
          </Reveal>

          {/* Remaining projects — mobile stacked cards */}
          <div className="flex flex-col gap-4 sm:hidden">
            {projects.slice(1).map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="border border-(--border) overflow-hidden bg-(--ink3)">
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <img
                      className="project-img"
                      src={p.img}
                      alt={p.tag}
                      loading="lazy"
                      onError={(e) => {
                        const t = e.currentTarget; t.style.display = 'none';
                        const parent = t.parentElement;
                        if (parent) {
                          const fb = document.createElement('div');
                          fb.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1916,#2e2b25)';
                          const ic = document.createElement('div');
                          ic.style.cssText = 'font-family:var(--ff-heading);font-size:3rem;color:rgba(201,168,76,0.15)';
                          ic.textContent = '⟁';
                          fb.appendChild(ic);
                          parent.insertBefore(fb, parent.firstChild);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[rgba(14,13,12,0.55)] to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-gold bg-[rgba(14,13,12,0.75)] px-2 py-1">{p.tag}</span>
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 border border-[rgba(201,168,76,0.5)] rounded-full flex items-center justify-center text-gold text-sm">↗</div>
                  </div>
                  <div className="p-5 border-t border-(--border)">
                    <p className="text-[0.88rem] text-[rgba(245,240,232,0.78)] leading-[1.75] mb-3">{p.desc}</p>
                    <p className="font-mono text-[0.65rem] text-(--muted) tracking-[0.08em]">{p.stack}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Remaining projects — tablet+ 2-col cinematic grid */}
          <div className="hidden sm:grid grid-cols-2 gap-0.75">
            {projects.slice(1).map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="project-card"
                  style={{ aspectRatio: '4/3' }}
                  onMouseEnter={() => setHoveredProject(i + 1)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img
                    className="project-img"
                    src={p.img}
                    alt={p.tag}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1916] to-[#2e2b25]';
                        const inner = document.createElement('div');
                        inner.className = 'heading-font text-[4rem] text-[rgba(201,168,76,0.15)]';
                        inner.textContent = '⟁';
                        fallback.appendChild(inner);
                        parent.insertBefore(fallback, parent.firstChild);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[rgba(14,13,12,0.98)] via-[rgba(14,13,12,0.2)] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-10">
                    <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-2">{p.tag}</p>
                    <p className="text-[0.88rem] text-[rgba(245,240,232,0.72)] leading-[1.8] mb-3">{p.desc}</p>
                    <p className="project-stack-text font-mono text-[0.7rem] text-(--muted) tracking-[0.08em]">{p.stack}</p>
                  </div>
                  <div className="project-arrow">↗</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ EXPERIENCE ══════════════ */}
      <section id="experience" className="py-20 sm:py-28 lg:py-40 px-5 sm:px-8 lg:px-16 bg-(--ink)">
        <div className="max-w-6xl mx-auto">
          <Reveal><SectionLabel>Experience</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-font font-light leading-none tracking-[-0.02em] mb-12 sm:mb-16 lg:mb-20 text-[clamp(2.5rem,5vw,5rem)]">
              Work<br /><em className="italic text-gold">History</em>
            </h2>
          </Reveal>

          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.1}>
              {/* Stack on mobile, side-by-side on md+ */}
              <div className="exp-item flex flex-col md:grid md:gap-12 lg:gap-16" style={{ gridTemplateColumns: '180px 1fr' }}>
                <div className="mb-2 md:mb-0">
                  <div className="font-mono text-[0.7rem] sm:text-[0.75rem] text-gold tracking-widest mb-1">{e.period}</div>
                  <div className="text-[0.82rem] sm:text-[0.85rem] text-(--muted)">{e.company}</div>
                </div>
                <div>
                  <div className="exp-role-title heading-font text-[1.5rem] sm:text-[1.8rem] font-light leading-[1.2] mb-3 sm:mb-4">{e.role}</div>
                  <div className="text-[0.88rem] sm:text-[0.92rem] text-(--muted) leading-[1.8]">{e.desc}</div>
                  <div className="flex flex-wrap gap-2 mt-5 sm:mt-6">
                    {e.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-[0.65rem] sm:text-[0.68rem] tracking-widest uppercase px-2.5 sm:px-3 py-1 border border-(--border) text-(--muted) rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section id="contact" className="py-20 sm:py-28 lg:py-40 px-5 sm:px-8 lg:px-16 bg-(--ink2) text-center relative overflow-hidden">
        <div className="absolute inset-0 contact-radial-bg" />
        {/* Watermark */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 heading-font font-light text-[rgba(201,168,76,0.03)] tracking-[-0.05em] whitespace-nowrap leading-none pointer-events-none select-none text-[clamp(5rem,18vw,18rem)]">
          Contact
        </div>

        <div className="relative z-2 max-w-3xl mx-auto">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel>Get in Touch</SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-font font-light leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8 text-[clamp(3rem,9vw,7rem)]">
              Let&apos;s Build<br />
              <em className="italic text-gold">Together</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[0.93rem] sm:text-[1rem] text-(--muted) mb-10 sm:mb-14 leading-[1.9] px-2 sm:px-0">
              Open to freelance projects and full-time opportunities.<br />
              Let&apos;s create something exceptional.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <a
              href="mailto:rahulyadav24@protonmail.com"
              className="contact-email text-[clamp(0.85rem,2.8vw,1.8rem)] mb-12 sm:mb-16 inline-flex break-all sm:break-normal"
            >
              rahulyadav24@protonmail.com ↗
            </a>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center justify-center gap-6 sm:gap-10 mb-14 sm:mb-20">
              <a href="https://www.linkedin.com/in/rahulyadav" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn ↗</a>
              <span className="w-px h-5 bg-(--border) inline-block" />
              <a href="https://wa.me/917350732543" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp ↗</a>
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="pt-10 sm:pt-12 border-t border-(--border) font-mono text-[0.68rem] sm:text-[0.75rem] tracking-[0.12em] sm:tracking-[0.15em] uppercase text-(--muted)">
              Mumbai, Maharashtra · Available for Remote &amp; On-site
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="py-6 sm:py-8 px-5 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 border-t border-(--border) bg-(--ink) text-center sm:text-left">
        <div className="font-mono text-[0.67rem] sm:text-[0.7rem] text-(--muted) tracking-widest">
          © 2026 Rahul Yadav. All rights reserved.
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-[0.67rem] sm:text-[0.7rem] tracking-widest uppercase text-(--muted) bg-transparent border-none cursor-none transition-colors duration-300 hover:text-gold"
        >
          Back to top ↑
        </button>
      </footer>
    </>
  );
}