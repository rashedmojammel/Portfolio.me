'use client';

import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const homeSection = canvas?.closest('.home');
    if (!canvas || !homeSection) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    function Particle() {
      this.reset = () => {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.45 + 0.1;
      };
      this.reset();
    }

    function resize() {
      W = canvas.width = homeSection.offsetWidth;
      H = canvas.height = homeSection.offsetHeight;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
      });
      raf = requestAnimationFrame(draw);
    }

    let raf;
    resize();
    particles = Array.from({ length: Math.floor((W * H) / 14000) }, () => new Particle());
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      particles = Array.from({ length: Math.floor((W * H) / 14000) }, () => new Particle());
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef}></canvas>;
}
