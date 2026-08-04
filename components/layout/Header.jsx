'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, RESUME_PDF, CV_PDF } from '@/data/siteConfig';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const headerRef = useRef(null);

  // Restore saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.body.classList.add('light-mode');
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle('light-mode');
    const light = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', light ? 'light' : 'dark');
    setIsLight(light);
  };

  const closeMenu = () => setMenuOpen(false);

  // Active nav link on scroll + sticky header shadow.
  // Section offsets are measured once (and on resize/load) instead of on
  // every scroll event — reading offsetTop/offsetHeight per section per
  // scroll frame was forcing a synchronous layout on every pixel of scroll.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id], div[id]'));
    let bounds = [];

    const measure = () => {
      bounds = sections.map((section) => ({
        id: section.getAttribute('id'),
        top: section.offsetTop,
        bottom: section.offsetTop + section.offsetHeight,
      }));
    };

    const applyScrollState = () => {
      const scrollY = window.scrollY;
      const probe = scrollY + 100;
      const active = bounds.find((b) => probe >= b.top && probe < b.bottom);
      if (active) setActiveHref(`#${active.id}`);
      if (headerRef.current) {
        headerRef.current.style.boxShadow = scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.35)' : 'none';
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        applyScrollState();
        ticking = false;
      });
    };

    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(measure, 150);
    };

    measure();
    applyScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', measure);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', measure);
    };
  }, []);

  return (
    <header id="header" ref={headerRef}>
      <a href="#home" className="logo">
        <span className="logo-text">Rashed<em>.</em></span>
      </a>

      <nav className={`navlist ${menuOpen ? 'open' : ''}`} id="navlist">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeHref === link.href ? 'active' : ''}
            onClick={closeMenu}
          >
            <span className="nav-bg"></span>
            <span className="nav-line"></span>
            {link.label}
          </a>
        ))}
      </nav>

      <div>
        <a href={RESUME_PDF} className="top-btn" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-download"></i> Resume
        </a>
        <a href={CV_PDF} className="top-btn" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-download"></i> CV
        </a>
      </div>

      <button id="theme-toggle" aria-label="Toggle light/dark mode" onClick={toggleTheme}>
        <i className={isLight ? 'fas fa-moon' : 'fas fa-sun'}></i>
      </button>

      <div
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        id="menu-toggle"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span></span><span></span><span></span>
      </div>
    </header>
  );
}
