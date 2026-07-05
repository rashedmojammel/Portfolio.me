'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import ProjectModal from '@/components/modals/ProjectModal';
import { projects } from '../../data/projects';

function tiltAllowed() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function handleTiltMove(e) {
  if (!tiltAllowed()) return;
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
  const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
  card.style.transform = `perspective(900px) rotateX(${dy * -6}deg) rotateY(${dx * 6}deg) translateY(-6px)`;
  card.style.transition = 'transform 0.08s ease';
}

function handleTiltLeave(e) {
  const card = e.currentTarget;
  card.style.transform = '';
  card.style.transition = 'transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
}

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="portfolio" id="portfolio">
      <div className="section-label">Work</div>

      <Reveal className="section-head">
        <p className="section-eyebrow">Portfolio</p>
        <h2 className="section-title">My Amazing <em>Work</em></h2>
        <p className="section-sub">Crafting Excellence — A Showcase of My Creative Journey</p>
      </Reveal>

      <Reveal className="portfolio-grid">
        {projects.map((project) => (
          <article
            className="p-card"
            key={project.id}
            onClick={() => setActiveProject(project)}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
          >
            <div className="p-card-thumb">
              <Image
                src={`https://img.youtube.com/vi/${project.youtubeId}/${project.thumbQuality}.jpg`}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="p-card-play"><i className="fas fa-play"></i></div>
            </div>
            <div className="p-card-body">
              <span className="p-tag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.cardDesc}</p>
              <span className="p-card-cta">View Project <i className="fas fa-arrow-right"></i></span>
            </div>
          </article>
        ))}
      </Reveal>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
