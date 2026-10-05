import { useState, useEffect, useRef } from 'react';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { PORTFOLIO_CONFIG } from '../../portfolio.config';

/**
 * ========================================================================================
 * HERO SECTION COMPONENT
 * ========================================================================================
 * 
 * Features:
 * - Particle Void Starfield Canvas: Interactive celestial star dust background reacting to mouse.
 * - Split Typography: Giant display names animating in from left and right.
 * - Dynamic Typewriter: Cycles through customizable taglines with realistic typing speed.
 * - Central Glassmorphic Card: Houses badge, description, domain tags, CTA buttons, and social links.
 * - Quick Stats Row: Live numbers at bottom of the hero card.
 */
export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef(null);

  const taglines = PORTFOLIO_CONFIG.personal.taglines;

  // --------------------------------------------------------------------------------------
  // 1. DYNAMIC TYPEWRITER EFFECT
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    const currentFullText = taglines[taglineIndex];
    let typingSpeed = isDeleting ? 38 : 75;

    if (!isDeleting && typedText === currentFullText) {
      // Pause at full text before deleting
      typingSpeed = 2200;
    } else if (isDeleting && typedText === '') {
      // Switch to next tagline
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
      typingSpeed = 400;
      return;
    }

    const timer = setTimeout(() => {
      setTypedText((prev) =>
        isDeleting
          ? currentFullText.substring(0, prev.length - 1)
          : currentFullText.substring(0, prev.length + 1)
      );
      if (!isDeleting && typedText === currentFullText) {
        setIsDeleting(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, taglineIndex, taglines]);

  // --------------------------------------------------------------------------------------
  // 2. INTERACTIVE BACKGROUND STARFIELD CANVAS
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate floating particle stars
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 14));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 110) * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.phase += 0.02;

        // Wrap around viewport edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${currentOpacity.toFixed(2)})`;
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
    <section id="home" className="hero">
      {/* 1. Background Interactive Starfield */}
      <div className="unicorn-bg">
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>

      <div className="hero-overlay" />

      {/* 2. Split Hero Grid */}
      <div className="hero-split">
        {/* Left Side: First Name */}
        <div className="hero-name-side hero-name-left">
          <span className="hero-name-word">{PORTFOLIO_CONFIG.personal.firstName}</span>
        </div>

        {/* Center: Glassmorphic Main Hero Card */}
        <div className="hero-center">
          {/* Status Badge */}
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>{PORTFOLIO_CONFIG.personal.badge}</span>
          </div>

          {/* Rotating Dynamic Typewriter Title */}
          <div className="hero-tagline">
            <span className="typed-prefix">I build </span>
            <span className="typed-text">{typedText}</span>
            <span className="typed-cursor">|</span>
          </div>

          {/* Short Bio Elevator Pitch */}
          <p className="hero-desc">{PORTFOLIO_CONFIG.personal.heroDescription}</p>

          {/* Specialization Domain Pills */}
          <div className="hero-domains">
            {PORTFOLIO_CONFIG.personal.domains.map((domain) => (
              <span key={domain} className="domain-pill">
                {domain}
              </span>
            ))}
          </div>

          {/* Call-to-Action Buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary hero-btn-main">
              View Projects <FiArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-outline hero-btn-sub">
              <FiMail size={16} style={{ marginRight: 6 }} /> Get in Touch
            </a>
          </div>

          {/* Social Icons Row */}
          <div className="hero-social-bar">
            {PORTFOLIO_CONFIG.socials.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon"
                title={name}
                aria-label={name}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Quick Hero Stats Row */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">
                {PORTFOLIO_CONFIG.about.stats[0]?.value || '20+'}
              </span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">
                {PORTFOLIO_CONFIG.about.stats[1]?.value || '5+'}
              </span>
              <span className="stat-label">Core Domains</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">
                {PORTFOLIO_CONFIG.about.stats[2]?.value || '100%'}
              </span>
              <span className="stat-label">Vector UI</span>
            </div>
          </div>
        </div>

        {/* Right Side: Last Name */}
        <div className="hero-name-side hero-name-right">
          <span className="hero-name-word">{PORTFOLIO_CONFIG.personal.lastName}</span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
        <span className="scroll-text">Explore</span>
        <div className="scroll-line" />
      </a>
    </section>
  );
}
