'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Adds inertia-based smooth scrolling site-wide, and makes the nav/anchor
 * links (#about, #portfolio, etc.) glide to their target instead of
 * snapping. Skips itself entirely for people who've asked for reduced
 * motion at the OS level.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function onClick(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash.length <= 1) return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const header = document.getElementById('header');
      const offset = header ? -(header.offsetHeight + 12) : -80;
      lenis.scrollTo(target, { offset });
    }
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
