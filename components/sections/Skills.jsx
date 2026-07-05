'use client';

import { skillCategories } from '../../data/skillsData';
// import Reveal from '@/components/ui/Reveal';
// import { skillCategories } from '@/data/skillsData';
import Reveal from '../ui/Reveal';

function handleShimmerMove(e) {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--shimmer-x', ((e.clientX - r.left) / r.width) * 100 + '%');
  card.style.setProperty('--shimmer-y', ((e.clientY - r.top) / r.height) * 100 + '%');
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section-label">Skills</div>

      <Reveal className="section-head">
        <p className="section-eyebrow">Expertise</p>
        <h2 className="section-title">Earned <em>Skills</em></h2>
        <p className="section-sub">Mastering Expertise — Showcasing Skills with Proficiency</p>
      </Reveal>

      <Reveal className="skills-grid">
        {skillCategories.map((cat) => {
          const CatIcon = cat.icon;
          return (
            <div className="skill-card" key={cat.title} onMouseMove={handleShimmerMove}>
              <div className="skill-card-icon">{CatIcon && <CatIcon />}</div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
              <div className="skill-tags">
                {cat.tags.map((tag) => {
                  const TagIcon = tag.icon;
                  return (
                    <span key={tag.label}>
                      {TagIcon && <TagIcon />} {tag.label}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}