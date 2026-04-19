import { useEffect, useRef } from "react";

/**
 * Telegram-style spoiler effect.
 * Draws hundreds of tiny moving white particles on a canvas to simulate "dust".
 */
export default function SpoilerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let particles: { x: number; y: number; vx: number; vy: number; life: number; max: number }[] = [];
    const DENSITY = 0.08; // particles per px²  (≈ matches Telegram)

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(900, Math.floor(width * height * DENSITY));
      particles = new Array(target).fill(0).map(() => spawn(true));
    };

    const spawn = (initial = false) => {
      const max = 30 + Math.random() * 50;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        life: initial ? Math.random() * max : 0,
        max,
      };
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += 1;
        if (p.life > p.max) {
          particles[i] = spawn();
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        // fade in/out triangle envelope
        const t = p.life / p.max;
        const alpha = t < 0.5 ? t * 2 : (1 - t) * 2;
        ctx.globalAlpha = alpha * 0.95;
        ctx.fillRect(p.x, p.y, 1.2, 1.2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="spoiler-canvas" aria-hidden="true" />;
}
