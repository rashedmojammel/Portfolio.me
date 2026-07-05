'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsOrbit from './SkillsOrbit';
import ImageSlider from './ImageSlider';
import ParticleBackground from './ParticleBackground';
import useTypingRoles from '@/hooks/useTypingRoles';
import { SOCIAL_LINKS } from '@/data/siteConfig';
import { typingRoles } from '@/data/skillsOrbit';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const roleText = useTypingRoles(typingRoles);
  const [glitch, setGlitch] = useState(false);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 650);
  };

  return (
    <section className="home" id="home">
      <ParticleBackground />

      <div className="home-bg-glow">
        <SkillsOrbit />
      </div>

      <motion.div className="home-text" variants={container} initial="hidden" animate="show">
        <motion.p className="home-greeting" variants={item}>Hello, I&apos;m</motion.p>
        <motion.h1
          className={`home-name ${glitch ? 'glitch' : ''}`}
          data-text="Rashedul Alam"
          onMouseEnter={triggerGlitch}
          variants={item}
        >
          Rashedul<br /><em>Alam</em>
        </motion.h1>
        <motion.h2 className="home-role" variants={item}>
          {roleText}
          <span className="type-cursor">|</span>
          <span> · Bangladesh</span>
        </motion.h2>
        <motion.p className="home-desc" variants={item}>
          A passionate and curious learner who loves to explore the world of
          technology — bridging AI, design, and engineering.
        </motion.p>

        <motion.div className="social-links" variants={item}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <i className={s.icon}></i>
            </a>
          ))}
        </motion.div>

        <motion.div className="home-actions" variants={item}>
          <a href="#about" className="btn btn-outline">About Me</a>
          <a href="#portfolio" className="btn btn-gold">View Work</a>
        </motion.div>
      </motion.div>

      <motion.div
        className="home-img"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <ImageSlider />
      </motion.div>
    </section>
  );
}
