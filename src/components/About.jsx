import { useEffect, useRef } from 'react';
import { FiArrowRight, FiMail, FiGithub } from 'react-icons/fi';
import { PORTFOLIO_CONFIG } from '../../portfolio.config';

/**
 * RevealCard Utility Component
 * Adds smooth scroll-triggered fade-in animations via IntersectionObserver.
 */
function RevealCard({ className = '', children }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

/**
 * ========================================================================================
 * ABOUT SECTION COMPONENT
 * ========================================================================================
 * 
 * Features:
 * - Bio Narrative Column: Customizable bio paragraphs highlighting background & expertise.
 * - Developer Profile Identity Card: Glassmorphic emblem (<logoText />), name, handle, and pillars.
 * - Engineering Principles Grid: 3 cards showing engineering standards & philosophies.
 * - Live Statistics Bar: 4-column counter displaying tech mastery and system availability.
 */
export default function About() {
  const { about, personal, socials } = PORTFOLIO_CONFIG;
  const githubSocial = socials.find((s) => s.name === 'GitHub');

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <RevealCard className="section-header">
          <span className="section-label">{about.sectionNumber} — {about.sectionLabel}</span>
          <h2 className="section-title">{about.sectionTitle}</h2>
        </RevealCard>

        {/* 1. Bio & Profile Identity Grid */}
        <div className="about-grid">
          {/* Left Column: Bio Narrative */}
          <RevealCard className="about-text">
            <div className="about-badge-pill">
              <span className="pulse-dot" />
              <span>{personal.role}</span>
            </div>

            <p className="about-lead">
              I'm <strong>{personal.name}</strong>, a developer focused on crafting{' '}
              <span className="highlight">resilient software architectures</span> and{' '}
              <span className="highlight">engaging digital platforms</span>.
            </p>

            {about.bioParagraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}

            {/* Action Buttons */}
            <div className="about-actions">
              <a href="#contact" className="btn btn-primary">
                <FiMail size={16} /> Let's Collaborate
              </a>
              {githubSocial && (
                <a
                  href={githubSocial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FiGithub size={16} /> GitHub Profile <FiArrowRight size={14} />
                </a>
              )}
            </div>
          </RevealCard>

          {/* Right Column: Developer Profile Card */}
          <RevealCard className="about-profile-card">
            {/* Card Header with Emblem & Name */}
            <div className="profile-card-header">
              <div className="profile-avatar-emblem">
                <span className="emblem-code">&lt;{personal.logoText} /&gt;</span>
              </div>
              <div>
                <h3 className="profile-name">{personal.name}</h3>
                <span className="profile-handle">{personal.handle} · {personal.role}</span>
              </div>
            </div>

            {/* Core Pillars List */}
            <div className="profile-pillars-list">
              {about.pillars.map(({ label, value, Icon }) => (
                <div key={label} className="profile-pillar-row">
                  <div className="pillar-icon">
                    <Icon size={16} />
                  </div>
                  <div className="pillar-content">
                    <span className="pillar-label">{label}</span>
                    <span className="pillar-val">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability Status Footer */}
            <div className="profile-card-footer">
              <div className="status-indicator">
                <span className="live-dot" />
                <span>{personal.availabilityStatus}</span>
              </div>
            </div>
          </RevealCard>
        </div>

        {/* 2. Engineering Philosophy Principles */}
        <RevealCard className="philosophy-wrapper">
          <div className="philosophy-header">
            <h3 className="philosophy-title">Engineering Principles</h3>
            <p className="philosophy-desc">The core standards and mental models guiding every system I build.</p>
          </div>
          <div className="philosophy-grid">
            {about.philosophy.map(({ Icon, title, desc }) => (
              <div key={title} className="philosophy-card">
                <div className="philosophy-icon">
                  <Icon size={24} />
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </RevealCard>

        {/* 3. Live Stats Counter Bar */}
        <RevealCard className="about-stats-bar">
          {about.stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="about-stat-item">
              <div className="stat-icon-wrapper">
                <Icon size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-val">{value}</span>
                <span className="stat-lbl">{label}</span>
              </div>
            </div>
          ))}
        </RevealCard>
      </div>
    </section>
  );
}
