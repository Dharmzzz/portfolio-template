import { useState, useRef, useEffect } from 'react';
import { FiMail, FiMapPin, FiClock, FiSend, FiCopy, FiCheck, FiArrowRight } from 'react-icons/fi';
import { PORTFOLIO_CONFIG } from '../../portfolio.config';

/**
 * RevealCard Utility
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

/**
 * ========================================================================================
 * CONTACT SECTION COMPONENT
 * ========================================================================================
 * 
 * Features:
 * - Direct Email with one-click copy to clipboard functionality.
 * - Details cards: Location & Availability status.
 * - Social Profile Hub cards.
 * - Functional / Formspree-ready message form.
 */
export default function Contact() {
  const { contact, personal, socials } = PORTFOLIO_CONFIG;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // 'sending' | 'success' | 'error'

  // Copy email to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate sending (or integrate Formspree / EmailJS / backend endpoint)
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(null), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Section Header */}
        <RevealCard className="section-header">
          <span className="section-label">{contact.sectionNumber} — {contact.sectionLabel}</span>
          <h2 className="section-title">{contact.sectionTitle}</h2>
          <p className="contact-subtitle">{contact.subtitle}</p>
        </RevealCard>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Social Hub */}
          <RevealCard className="contact-info-col">
            {/* 1. Copy Email Card */}
            <div className="contact-card-highlight">
              <div className="contact-card-icon">
                <FiMail size={22} />
              </div>
              <div className="contact-card-text">
                <span className="contact-card-label">{contact.emailCard.label}</span>
                <span className="contact-card-val">{personal.email}</span>
              </div>
              <button
                type="button"
                className={`copy-email-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* 2. Location & Status Row */}
            <div className="contact-details-row">
              <div className="contact-detail-card">
                <div className="detail-icon">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <span className="detail-label">{contact.locationCard.label}</span>
                  <span className="detail-val">{contact.locationCard.value}</span>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="detail-icon">
                  <FiClock size={18} />
                </div>
                <div>
                  <span className="detail-label">{contact.statusCard.label}</span>
                  <span className="detail-val">{contact.statusCard.value}</span>
                </div>
              </div>
            </div>

            {/* 3. Social Media Cards Grid */}
            <div className="contact-socials-card">
              <h4 className="socials-card-title">Connect on Social Platforms</h4>
              <div className="social-links-grid">
                {socials.map(({ name, url, icon: Icon, label }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-grid-item"
                  >
                    <div className="social-icon-box">
                      <Icon size={18} />
                    </div>
                    <div className="social-item-text">
                      <span className="social-item-name">{name}</span>
                      <span className="social-item-label">{label}</span>
                    </div>
                    <FiArrowRight size={14} className="social-arrow" />
                  </a>
                ))}
              </div>
            </div>
          </RevealCard>

          {/* Right Column: Interactive Contact Form */}
          <RevealCard className="contact-form-col">
            <form className="contact-form-card" onSubmit={handleFormSubmit}>
              <h3 className="form-card-title">Send a Direct Message</h3>
              <p className="form-card-subtitle">
                Fill out the form below, and I'll get back to you within 24 hours.
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject / Project Type</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g. Web App Architecture, AI Integration, Contract"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project, timeline, and goals..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary form-submit-btn"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <FiSend size={16} /> Send Message
                  </>
                )}
              </button>

              {formStatus === 'success' && (
                <div className="form-status-alert success">
                  <FiCheck size={16} /> Thank you! Your message has been received.
                </div>
              )}
            </form>
          </RevealCard>
        </div>
      </div>
    </section>
  );
}
