'use client';

import { useEffect, useRef, useState } from 'react';
import { RESPONSES, FALLBACK_RESPONSES, SUGGESTED_QUESTIONS } from '@/data/aiResponses';

function getResponse(text, fallbackIndexRef) {
  const lower = text.toLowerCase();
  let bestScore = 0;
  let bestAnswer = null;

  for (const item of RESPONSES) {
    let score = 0;
    for (const key of item.keys) {
      if (lower.includes(key)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = item.answer;
    }
  }

  if (bestAnswer) return bestAnswer;

  const msg = FALLBACK_RESPONSES[fallbackIndexRef.current % FALLBACK_RESPONSES.length];
  fallbackIndexRef.current += 1;
  return msg;
}

// Renders **bold**, *italic*, newlines and auto-links, same as the
// original fmt() helper in ai-chat.js.
function formatMessage(text) {
  const html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  return { __html: html };
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [suggestionsHidden, setSuggestionsHidden] = useState(false);

  const popupRef = useRef(null);
  const fabRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const fallbackIndexRef = useRef(0);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 320);
    }
  }, [open]);

  // Close popup on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (
        open &&
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        fabRef.current &&
        !fabRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  function sendAMA(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed) return;

    setInput('');
    setSuggestionsHidden(true);
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setTyping(true);

    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const reply = getResponse(trimmed, fallbackIndexRef);
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    }, delay);
  }

  return (
    <>
      <button
        className={`ai-fab ${open ? 'is-open' : ''}`}
        id="ai-fab"
        ref={fabRef}
        aria-label="Open AI Assistant"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="ai-fab-icon"><i className="fas fa-robot"></i></span>
        <span className="ai-fab-label">Let&apos;s Talk</span>
        <span className="ai-fab-pulse"></span>
      </button>

      <div className={`ai-popup ${open ? 'is-open' : ''}`} id="ai-popup" ref={popupRef} aria-hidden={!open}>
        <div className="ai-popup-inner">
          <div className="ai-popup-header">
            <div className="ai-popup-header-left">
              <div className="ai-popup-avatar">
                <i className="fas fa-robot"></i>
                <span className="ai-popup-online"></span>
              </div>
              <div>
                <div className="ai-popup-name">Rashed&apos;s AI</div>
                <div className="ai-popup-status">Ask me anything ✦</div>
              </div>
            </div>
            <button className="ai-popup-close" aria-label="Close chat" onClick={() => setOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className={`ama-suggestions ${suggestionsHidden ? 'ama-suggestions-hidden' : ''}`}>
            {SUGGESTED_QUESTIONS.map((s) => (
              <button key={s.label} className="ama-suggestion-btn" onClick={() => sendAMA(s.q)}>
                <i className={s.icon}></i> {s.label}
              </button>
            ))}
          </div>

          <div className={`ama-messages ${messages.length ? 'ama-messages-visible' : ''}`} ref={messagesRef}>
            {messages.map((m, i) =>
              m.role === 'bot' ? (
                <div className="ama-bubble ama-bubble-bot" key={i}>
                  <div className="ama-bubble-avatar"><i className="fas fa-robot"></i></div>
                  <div className="ama-bubble-body" dangerouslySetInnerHTML={formatMessage(m.text)} />
                </div>
              ) : (
                <div className="ama-bubble ama-bubble-user" key={i}>
                  <div className="ama-bubble-body" dangerouslySetInnerHTML={formatMessage(m.text)} />
                </div>
              )
            )}
            {typing && (
              <div className="ama-bubble ama-bubble-bot ama-typing-bubble">
                <div className="ama-bubble-avatar"><i className="fas fa-robot"></i></div>
                <div className="ama-bubble-body ama-dots"><span></span><span></span><span></span></div>
              </div>
            )}
          </div>

          <div className="ama-input-wrap">
            <div className="ama-input-row">
              <span className="ama-input-icon"><i className="fas fa-comment-alt"></i></span>
              <input
                type="text"
                ref={inputRef}
                placeholder="Ask me anything about Rashedul…"
                autoComplete="off"
                maxLength={300}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendAMA();
                  }
                }}
              />
              <button aria-label="Send question" onClick={() => sendAMA()}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <p className="ama-disclaimer">Powered by local AI · Portfolio overview only</p>
          </div>
        </div>
      </div>
    </>
  );
}
