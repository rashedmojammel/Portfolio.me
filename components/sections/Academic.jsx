import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { academicHighlights } from '../../data/academicHighlights';

export default function Academic() {
  return (
    <section className="acad-section" id="academic">
      <Reveal className="section-label" as="div">Academic</Reveal>

      <Reveal className="section-head">
        <p className="section-eyebrow"><i className="fas fa-flask"></i> Academic Experience</p>
        <h2 className="section-title">Campus <em>Moments</em></h2>
        <p className="section-sub">Highlights from my academic journey — projects, events &amp; milestones.</p>
      </Reveal>

      <Reveal className="acad-grid">
        {academicHighlights.map((card) => (
          <div className="acad-card" key={card.title}>
            <div className="acad-card-img-wrap">
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="acad-card-img"
                style={{ objectFit: 'cover' }}
              />
              <span className="acad-year-badge">{card.year}</span>
            </div>
            <div className="acad-card-body">
              <h3 className="acad-card-title">{card.title}</h3>
              <p className="acad-card-desc">{card.desc}</p>
              <span className="acad-card-tag"><i className={card.tag.icon}></i> {card.tag.label}</span>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
