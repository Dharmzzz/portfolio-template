import { FiArrowUp } from 'react-icons/fi';
import { PORTFOLIO_CONFIG } from '../../portfolio.config';

/**
 * ========================================================================================
 * FOOTER COMPONENT
 * ========================================================================================
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Left Side: Brand & Copyright */}
        <div className="footer-left">
          <a href="#home" className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            {PORTFOLIO_CONFIG.personal.logoText}
            <span className="logo-slash">/</span>
            <span className="logo-bracket">&gt;</span>
          </a>
          <p className="footer-copy">
            © {currentYear} {PORTFOLIO_CONFIG.personal.name}. All rights reserved.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="footer-links">
          <a href="#about" className="footer-link">About</a>
          <a href="#skills" className="footer-link">Skills</a>
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>

        {/* Right Side: Back to Top Button */}
        <div className="footer-right">
          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Top</span>
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
