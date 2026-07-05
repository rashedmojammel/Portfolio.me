'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="loader-inner">
        <div className="loader-grid-bg"></div>

        <div className="loader-top">
          <div className="loader-brackets">
            <span className="lb">[</span>
            <span className="loader-name">RASHEDUL<em>.</em>ALAM</span>
            <span className="rb">]</span>
          </div>
          <div className="loader-tagline">Software Engineer · Bangladesh</div>
        </div>

        <div className="loader-bars">
          <div className="loader-bar-row" style={{ '--d': '0s', '--w': '100%' }}>
            <span className="lbl">Initializing</span>
            <div className="lbar"><div className="lbar-fill"></div></div>
          </div>
          <div className="loader-bar-row" style={{ '--d': '0.2s', '--w': '85%' }}>
            <span className="lbl">Loading Assets</span>
            <div className="lbar"><div className="lbar-fill"></div></div>
          </div>
          <div className="loader-bar-row" style={{ '--d': '0.4s', '--w': '92%' }}>
            <span className="lbl">Building UI</span>
            <div className="lbar"><div className="lbar-fill"></div></div>
          </div>
          <div className="loader-bar-row" style={{ '--d': '0.6s', '--w': '78%' }}>
            <span className="lbl">Connecting</span>
            <div className="lbar"><div className="lbar-fill"></div></div>
          </div>
        </div>

        <div className="loader-status">
          <span className="loader-status-dot"></span>
          <span className="loader-status-text">BOOTING SYSTEM...</span>
        </div>
      </div>
    </div>
  );
}
