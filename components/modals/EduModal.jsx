'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function EduModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  const isPdf = item?.document?.toLowerCase().endsWith('.pdf');

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="edu-modal-overlay open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="eduModalTitle"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="edu-modal-box"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="edu-modal-header">
              <div className="edu-modal-title-wrap">
                <div className="edu-modal-icon"><i className={item.icon}></i></div>
                <div>
                  <div className="edu-modal-name" id="eduModalTitle">{item.title}</div>
                  <div className="edu-modal-sub">{item.institution}</div>
                </div>
              </div>
              <button className="edu-modal-close" onClick={onClose} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="edu-modal-pdf">
              {isPdf ? (
                <iframe src={item.document} title="Education Document" style={{ display: 'block' }}></iframe>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.document}
                  alt="Certificate"
                  style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'contain', objectPosition: 'top' }}
                />
              )}
            </div>

            <div className="edu-modal-footer">
              <a href={item.document} target="_blank" rel="noopener noreferrer" download>
                <i className="fas fa-download"></i> Download
              </a>
              <a href={item.document} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-external-link-alt"></i> Open in New Tab
              </a>
              <span className="edu-modal-year">{item.year}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
