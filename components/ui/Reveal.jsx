'use client';

import { motion } from 'framer-motion';

/**
 * Wraps any block of markup and fades/slides it into view once it scrolls
 * into the viewport. Same API as before (delay, className, as) — now backed
 * by Framer Motion instead of a hand-rolled IntersectionObserver, so it also
 * gets a nicer easing curve and respects reduced-motion automatically.
 *
 * Usage: <Reveal delay={100}><div className="about-content">...</div></Reveal>
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
