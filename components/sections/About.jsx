'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import EduModal from '@/components/modals/EduModal';
import { education, basicSkills, softSkills } from '@/data/education';
import { CV_PDF } from '@/data/siteConfig';

const TABS = [
  { id: 'education', label: 'Education' },
  { id: 'basicskills', label: 'Basic Skills' },
  { id: 'softskills', label: 'Soft Skills' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('education');
  const [activeEdu, setActiveEdu] = useState(null);

  return (
    <section className="about" id="about">
      <div className="section-label">About</div>

      <Reveal className="about-img-wrap">
        <div className="about-img-frame">
          <Image
            src="/img/photo_2026-03-01_00-53-22.jpg"
            alt="Rashedul Alam"
            width={480}
            height={600}
            priority
          />
        </div>
      </Reveal>

      <Reveal className="about-content" delay={100}>
        <p className="section-eyebrow">Who I Am</p>
        <h2 className="section-title">Software Engineer<br /></h2>

        <p className="about-bio">
          I&apos;m <strong>Rashedul Alam</strong>, a passionate Software Engineer and CSE student at
          AIUB. My work bridges the gap between AI, technology, and design — crafting
          intelligent, scalable solutions that seamlessly integrate aesthetics with
          functionality. Whether building dynamic web interfaces or AI-driven
          applications, I believe in human-centered design that enhances automation
          and redefines user experiences.
        </p>

        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'education' && (
          <div className="tab-panel active" id="tab-education">
            <ul className="edu-list">
              {education.map((item) => (
                <li key={item.id} className="edu-item" onClick={() => setActiveEdu(item)}>
                  <div className="edu-icon"><i className={item.icon}></i></div>
                  <div className="edu-body">
                    <strong>{item.title}</strong>
                    <span>{item.institution}</span>
                    {item.lines.map((line) => <em key={line}>{line}</em>)}
                    <span className="edu-view-chip"><i className="fas fa-file-pdf"></i> View Document</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'basicskills' && (
          <div className="tab-panel active" id="tab-basicskills">
            <ul className="basic-skills-list">
              {basicSkills.map((s) => (
                <li key={s.title}>
                  <i className={s.icon}></i>
                  <div>
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'softskills' && (
          <div className="tab-panel active" id="tab-softskills">
            <ul className="basic-skills-list">
              {softSkills.map((s) => (
                <li key={s.title}>
                  <i className={s.icon}></i>
                  <div>
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <a href={CV_PDF} className="btn btn-gold" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-file-alt"></i> My Resume
        </a>
      </Reveal>

      <EduModal item={activeEdu} onClose={() => setActiveEdu(null)} />
    </section>
  );
}
