'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled
            ? 'clamp(0.8rem, 1.5vw, 1.2rem) clamp(1.25rem, 4vw, 4rem)'
            : 'clamp(1rem, 2vw, 2rem) clamp(1.25rem, 4vw, 4rem)',
          background: scrolled ? 'rgba(14,13,12,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
          style={{
            fontFamily: 'var(--ff-heading)',
            fontSize: 'clamp(1.35rem, 2.5vw, 1.6rem)',
            fontWeight: 600,
            color: 'var(--cream)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            cursor: 'none',
          }}
        >
          R<span style={{ color: 'var(--gold)' }}>.</span>
        </a>

        {/* Desktop Links */}
        <ul
          style={{ gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="hidden md:flex"
        >
          {links.map(({ label, href }) => (
            <li key={label}>
              <button
                onClick={() => scrollTo(href)}
                className="nav-link"
                style={{ background: 'none', border: 'none' }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="flex md:hidden flex-col justify-center items-center gap-1.5 w-10 h-10"
          onClick={() => setMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'none', padding: '8px', zIndex: 110 }}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: 22, height: 1, background: 'var(--cream)', transformOrigin: 'center' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block', width: 22, height: 1, background: 'var(--cream)' }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: 22, height: 1, background: 'var(--cream)', transformOrigin: 'center' }}
          />
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'var(--ink2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '2rem',
              paddingTop: '80px',
            }}
          >
            {links.map(({ label, href }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo(href)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--ff-heading)',
                  fontSize: 'clamp(2.2rem, 8vw, 3rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--cream)',
                  cursor: 'none',
                  letterSpacing: '-0.02em',
                  transition: 'color 0.3s',
                  lineHeight: 1.1,
                }}
                onTouchStart={e => (e.currentTarget.style.color = 'var(--gold)')}
                onTouchEnd={e => (e.currentTarget.style.color = 'var(--cream)')}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream)')}
              >
                {label}
              </motion.button>
            ))}

            {/* Footer info inside menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                fontFamily: 'var(--ff-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Mumbai · Available for Remote Work and Freelancing
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}