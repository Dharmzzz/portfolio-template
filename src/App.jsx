import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Section Components
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import About     from './components/About';
import Galaxy    from './components/Galaxy';
import Projects  from './components/Projects';
import Contact   from './components/Contact';
import Footer    from './components/Footer';
import NotFound  from './components/NotFound';

/**
 * ========================================================================================
 * MASTER APP COMPONENT
 * ========================================================================================
 * 
 * Orchestrates:
 * 1. Lenis Smooth Scroll Engine: Initializes smooth physics-based inertia scrolling.
 * 2. Anchor Interceptor: Smoothly glides to target sections on link clicks (#about, #projects, etc.).
 * 3. SPA Route Fallback: Renders the custom 404 page for invalid URL paths.
 * 4. Section Structure: Stacks all section components sequentially.
 */
export default function App() {
  const [isNotFound, setIsNotFound] = useState(false);

  // --------------------------------------------------------------------------------------
  // 1. LENIS SMOOTH SCROLL INITIALIZATION
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    // Instantiate Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,                                    // Scroll duration (in seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out curve
      orientation: 'vertical',                          // Scroll direction
      gestureOrientation: 'vertical',
      smoothWheel: true,                                // Enable smooth mouse wheel scrolling
      wheelMultiplier: 1.0,                             // Mouse wheel sensitivity
      touchMultiplier: 1.8,                             // Touch screen sensitivity
      infinite: false,
    });

    // Make lenis accessible globally if needed
    window.lenis = lenis;

    // Connect Lenis to the browser's requestAnimationFrame cycle
    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // Intercept in-page '#' anchor clicks for smooth scrolling transitions
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = targetId === '#home' ? document.body : document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -70, duration: 1.3 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup listeners and cancel animation frame on unmount
    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // --------------------------------------------------------------------------------------
  // 2. CLIENT-SIDE 404 ROUTE DETECTION
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    const checkPath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      const validPaths = ['', '/portfolio', '/index.html'];
      if (!validPaths.includes(path) && !path.startsWith('/#')) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    };

    checkPath();
    window.addEventListener('popstate', checkPath);
    return () => window.removeEventListener('popstate', checkPath);
  }, []);

  // Handler to smoothly navigate back home from 404 screen
  const handleNavigateHome = () => {
    window.history.pushState({}, '', '/');
    setIsNotFound(false);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If visiting an unknown route, render the Galactic 404 screen
  if (isNotFound) {
    return <NotFound onNavigateHome={handleNavigateHome} />;
  }

  // --------------------------------------------------------------------------------------
  // 3. MASTER PAGE LAYOUT
  // --------------------------------------------------------------------------------------
  return (
    <>
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* 2. Hero Interactive Welcome Banner */}
      <Hero />

      {/* 3. Who I Am / Personal Profile Section */}
      <About />

      {/* 4. Interactive Celestial 3D Tech Stack Galaxy */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header reveal-on-scroll">
            <span className="section-label">02 — Skills & Technologies</span>
            <h2 className="section-title">Tech Stack Galaxy</h2>
          </div>
        </div>
        <Galaxy />
      </section>

      {/* 5. 3D Infinite Spiral Projects Showcase */}
      <Projects />

      {/* 6. Contact & Collaboration Section */}
      <Contact />

      {/* 7. Footer */}
      <Footer />
    </>
  );
}
