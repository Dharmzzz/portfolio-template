import { useEffect, useRef } from 'react';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import { PORTFOLIO_CONFIG } from '../../portfolio.config';

/**
 * ========================================================================================
 * 404 NOT FOUND PAGE COMPONENT
 * ========================================================================================
 * 
 * Features:
 * - Animated deep-space starfield canvas background.
 * - Glowing neon 404 header and friendly redirect message.
 * - One-click Return Home action button.
 */
export default function NotFound({ onNavigateHome }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space void gradient
      const bg = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.7);
      bg.addColorStop(0, '#041028');
      bg.addColorStop(0.6, '#030b1c');
      bg.addColorStop(1, '#01040c');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.phase += star.speed;
        const currentAlpha = star.alpha * (0.6 + 0.4 * Math.sin(star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${currentAlpha.toFixed(2)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="notfound-wrapper">
      <canvas ref={canvasRef} className="notfound-canvas" />

      <div className="notfound-card">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Lost in Deep Space</h1>
        <p className="notfound-desc">
          The celestial coordinate or page you are looking for does not exist or has moved to another sector of the universe.
        </p>

        <button
          type="button"
          className="btn btn-primary notfound-btn"
          onClick={onNavigateHome}
        >
          <FiHome size={16} /> Return to {PORTFOLIO_CONFIG.personal.name}'s Portfolio
        </button>
      </div>
    </div>
  );
}
