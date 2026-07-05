'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal open"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${project.id}-title`}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="modal-box"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-video-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="modal-content">
              <span className="p-tag">{project.modalTag}</span>
              <h2 id={`${project.id}-title`}>{project.title}</h2>
              <p>{project.description}</p>
              <div className="modal-tech">
                {project.tech.map((t) => (
                  <span key={t.label}><i className={t.icon}></i> {t.label}</span>
                ))}
              </div>
              {project.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  <i className={link.icon}></i> {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
