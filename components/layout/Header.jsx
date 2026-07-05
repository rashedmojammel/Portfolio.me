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

  // Active nav link on scroll + sticky header shadow
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id]');

    const onScroll = () => {
      const scrollY = window.scrollY + 100;
      sections.forEach((section) => {
        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
          setActiveHref(`#${section.getAttribute('id')}`);
        }
      });
      if (headerRef.current) {
        headerRef.current.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.35)' : 'none';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
