import Reveal from '@/components/ui/Reveal';
import { certificates } from '@/data/certificates';

export default function Certificates() {
  return (
    <section className="certificates" id="certificates">
      <div className="section-label">Certs</div>

      <Reveal className="section-head">
        <p className="section-eyebrow">Credentials</p>
        <h2 className="section-title">Certificates &amp; <em>Achievements</em></h2>
        <p className="section-sub">Verified learning milestones and recognized accomplishments</p>
      </Reveal>

      <div className="cert-grid">
        {certificates.map((cert) => (
          <Reveal className="cert-card" delay={cert.delay} key={cert.title}>
            <div className="cert-shimmer"></div>
            <span className="cert-badge gold">{cert.year}</span>
            <div className="cert-icon"><i className={cert.icon}></i></div>
            <h3>{cert.title}</h3>
            <p>{cert.desc}</p>
            <div className="cert-issuer">
              <i className="fas fa-award"></i> {cert.issuer}
            </div>
            <a href={cert.href} target="_blank" rel="noopener noreferrer" className="cert-link">
              View Certificate <i className="fas fa-arrow-right"></i>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
