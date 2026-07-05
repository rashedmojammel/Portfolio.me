'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { homeImages } from '../../data/skillsOrbit';

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (index) => {
    setCurrent(((index % homeImages.length) + homeImages.length) % homeImages.length);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % homeImages.length);
    }, 3500);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-img-slider">
      {homeImages.map((src, i) => (
        <div key={src} className={`home-img-frame ${i === current ? 'active' : ''}`}>
          <Image
            src={src}
            alt="Rashedul Alam"
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 90vw, 420px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}

      <div className="home-img-dots">
        {homeImages.map((_, i) => (
          <span
            key={i}
            className={`home-img-dot ${i === current ? 'active' : ''}`}
            onClick={() => { goTo(i); resetTimer(); }}
          ></span>
        ))}
      </div>
    </div>
  );
}
