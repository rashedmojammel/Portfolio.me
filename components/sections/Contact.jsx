'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import { CONTACT_INFO, CONTACT_SOCIAL_LINKS } from '../../data/siteConfig';

export default function Contact() {
  const [status, setStatus] = useState({ text: '', color: '' });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setStatus({ text: '', color: '' });

    const form = e.target;
    const payload = Object.fromEntries(new FormData(form));

    try {
      // Same origin now, so no-cors is gone — which means we can finally
      // read the response and report real failures.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          text: `✗ ${data.error ?? 'Something went wrong. Please try again.'}`,
          color: '#e06c6c',
        });
        return;
      }

      setStatus({
        text: "✓ Message sent! I'll get back to you soon.",
        color: 'var(--gold)',
      });
      form.reset();
    } catch {
      setStatus({
        text: '✗ Network error. Please check your connection or email me directly.',
        color: '#e06c6c',
      });
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
          <form id="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="Rashedul Alam" required autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" placeholder="hello@example.com" required autoComplete="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              {/* was missing `required` — the form could be submitted empty */}
              <textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." required></textarea>
            </div>

            {/* Honeypot. Bots fill it, people never see it. Not display:none —
                some bots skip hidden fields. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <button type="submit" className="btn btn-gold submit-btn" disabled={sending}>
              <span id="btn-text">
                <i className={sending ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane'}></i>{' '}
                {sending ? 'Sending…' : 'Send Message'}
              </span>
            </button>

            {/* aria-live so screen readers announce the result */}
            <p id="form-msg" role="status" aria-live="polite" style={{ color: status.color }}>
              {status.text}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}