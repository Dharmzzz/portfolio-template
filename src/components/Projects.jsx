import { useState, useEffect, useRef } from 'react';
import { FiGithub, FiExternalLink, FiCheck, FiZap, FiX } from 'react-icons/fi';
import InfiniteSpiral from './InfiniteSpiral';
import { PORTFOLIO_CONFIG } from '../../portfolio.config';

/**
 * ========================================================================================
 * PROJECTS SECTION COMPONENT
 * ========================================================================================
 * 
 * Features:
 * - Category Filter Bar: Filters projects dynamically by category (All, AI, Web, Systems, Automation).
 * - 3D Infinite Spiral Carousel: Interactive helical showcase revolving projects smoothly in 3D.
 * - Project Quick Inspection Modal: Clicking any 3D card opens an inspection modal with highlights,
 *   tech stack tags, GitHub source code link, and live demo buttons.
 */
export default function Projects() {
  const { projectsSection } = PORTFOLIO_CONFIG;
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(projectsSection.projects[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef(null);

  // Reveal animation for section header
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter projects by category
  const filteredProjects =
    activeFilter === 'all'
      ? projectsSection.projects
      : projectsSection.projects.filter((p) => p.category === activeFilter);

  // Duplicate items if count is small to ensure continuous 3D loop
  const carouselItems =
    filteredProjects.length < 5
      ? [...filteredProjects, ...filteredProjects]
      : filteredProjects;

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className="section-header reveal-on-scroll">
          <span className="section-label">
            {projectsSection.sectionNumber} — {projectsSection.sectionLabel}
          </span>
          <h2 className="section-title">{projectsSection.sectionTitle}</h2>
          <p className="projects-subtitle">{projectsSection.subtitle}</p>
        </div>

        {/* 1. Category Filter Tabs */}
        <div className="projects-filter-bar">
          {projectsSection.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(cat.id);
                const matching =
                  cat.id === 'all'
                    ? projectsSection.projects[0]
                    : projectsSection.projects.find((p) => p.category === cat.id);
                if (matching) setSelectedProject(matching);
              }}
            >
              <span>{cat.label}</span>
              <span className="filter-count">
                {cat.id === 'all'
                  ? projectsSection.projects.length
                  : projectsSection.projects.filter((p) => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* 2. Primary 3D Infinite Carousel Showcase */}
        <div className="projects-carousel-wrapper reveal-on-scroll visible">
          <div className="carousel-ambient-lighting" />
          <div className="projects-carousel-viewport">
            <InfiniteSpiral
              items={carouselItems}
              animationMode="all"
              speed={0.48}
              radius={230}
              cardWidth={260}
              cardHeight={230}
              verticalSpacing={90}
              perspective={1100}
              cardRadius={18}
              centerScale={1.18}
              edgeBlur={5}
              cardsPerTurn={6}
              pauseOnHover={true}
              onItemClick={handleProjectClick}
            />
          </div>

          <div className="carousel-bottom-bar">
            <span className="carousel-instruction-pill">
              <FiZap size={14} className="pill-icon-glow" />
              <span>Drag or scroll to revolve 3D carousel · Click any card for project details & code</span>
            </span>
          </div>
        </div>

        {/* 3. Quick Inspection Modal */}
        {isModalOpen && selectedProject && (
          <div className="project-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="project-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <FiX size={18} />
              </button>

              <div className="project-modal-header">
                {selectedProject.Icon && (
                  <div
                    className="project-icon-box"
                    style={{
                      background: `${selectedProject.iconColor || '#38bdf8'}22`,
                      borderColor: `${selectedProject.iconColor || '#38bdf8'}66`,
                      color: selectedProject.iconColor || '#38bdf8',
                    }}
                  >
                    <selectedProject.Icon size={26} />
                  </div>
                )}
                <div>
                  <span className="project-category-badge">{selectedProject.categoryLabel}</span>
                  <h3 className="project-modal-title">{selectedProject.title}</h3>
                </div>
              </div>

              <p className="project-modal-desc">{selectedProject.desc}</p>

              {selectedProject.highlights && (
                <div className="project-highlights" style={{ margin: '1.25rem 0' }}>
                  <span className="highlights-header-label">Architectural Highlights:</span>
                  {selectedProject.highlights.map((highlight, index) => (
                    <div key={index} className="project-highlight-item">
                      <FiCheck
                        size={14}
                        color={selectedProject.iconColor || '#38bdf8'}
                        className="highlight-check"
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedProject.tags && (
                <div className="project-tags" style={{ marginBottom: '1.5rem' }}>
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="project-modal-actions">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <FiGithub size={16} /> View Source Code
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <FiExternalLink size={16} /> Live Demo / Repo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
