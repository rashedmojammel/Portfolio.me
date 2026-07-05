'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import { CONTACT_INFO, CONTACT_SOCIAL_LINKS, GOOGLE_SHEET_SCRIPT_URL } from '@/data/siteConfig';

export default function Contact() {
  const [status, setStatus] = useState({ text: '', color: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    const form = e.target;

    try {
      await fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors',
      });
      setStatus({ text: "✓ Message sent! I'll get back to you soon.", color: 'var(--gold)' });
      form.reset();
    } catch {
      setStatus({ text: '✗ Something went wrong. Please try again.', color: '#e06c6c' });
    } finally {
      setSending(false);
      setTimeout(() => setStatus({ text: '', color: '' }), 6000);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="section-label">Contact</div>

      <div className="contact-inner">
        <Reveal className="contact-left">
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-title">Let&apos;s Work<br /><em>Together</em></h2>
          <p className="contact-desc">
            Have a project in mind or want to collaborate? Feel free to reach out —
            I&apos;d love to hear from you.
          </p>

          <ul className="contact-info">
            <li>
              <i className="fas fa-envelope"></i>
              <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a>
            </li>
          </ul>

          <div className="contact-socials">
            {CONTACT_SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="contact-right" delay={100}>
          <form id="contact-form" name="submit-to-google-sheet" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="Name" placeholder="Rashedul Alam" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="Email" placeholder="hello@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="Message" rows={5} placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="btn btn-gold submit-btn" disabled={sending}>
              <span id="btn-text">
                <i className={sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'}></i>{' '}
                {sending ? 'Sending…' : 'Send Message'}
              </span>
            </button>
            <p id="form-msg" style={{ color: status.color }}>{status.text}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
