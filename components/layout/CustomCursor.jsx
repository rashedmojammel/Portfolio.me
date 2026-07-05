'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  // Only show the custom cursor on devices that actually have a mouse,
  // and skip it for people who've asked for reduced motion.
  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(hasFinePointer && !prefersReduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('custom-cursor-active');

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top = mouseY + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const hoverSelector = 'a, button, .p-card, .tab-btn, .edu-item, .hobby-card';
    const addHover = () => { dotRef.current?.classList.add('hover'); ringRef.current?.classList.add('hover'); };
    const removeHover = () => { dotRef.current?.classList.remove('hover'); ringRef.current?.classList.remove('hover'); };

    const els = document.querySelectorAll(hoverSelector);
    els.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      els.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
