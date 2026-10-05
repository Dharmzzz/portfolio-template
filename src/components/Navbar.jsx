import { useState, useEffect } from 'react';
import { PORTFOLIO_CONFIG } from '../../portfolio.config';

/**
 * ========================================================================================
 * NAVBAR COMPONENT
 * ========================================================================================
 * 
 * Features:
 * - Dynamic scroll detection: Adds a backdrop blur & border glow when scrolling down.
 * - Intersection Observer: Automatically highlights the active section in the nav menu.
 * - Mobile Drawer: Hamburger toggle with animated slide-in drawer for smartphone viewports.
 * - Centralized Config: Logo text, hire CTA, and section links pull from portfolio.config.js.
 */

// Navigation anchor links mapped to section HTML IDs
const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // 1. Detect scroll position to apply glassmorphism styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Observe active section in viewport to highlight active link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo / Personal Emblem */}
          <a href="#home" className="nav-logo" aria-label="Go to top">
            <span className="logo-bracket">&lt;</span>
            {PORTFOLIO_CONFIG.personal.logoText}
            <span className="logo-slash">/</span>
            <span className="logo-bracket">&gt;</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link ${activeSection === id ? 'active' : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Primary Call-to-Action (CTA) Button */}
          <a href="#contact" className="nav-cta">
            Hire Me
          </a>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav-cta"
          style={{ alignSelf: 'flex-start', marginTop: '0.75rem' }}
          onClick={() => setMenuOpen(false)}
        >
          Hire Me
        </a>
      </div>
    </>
  );
}
