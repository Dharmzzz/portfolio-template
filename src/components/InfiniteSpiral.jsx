'use client';

import { useEffect, useMemo, useRef } from 'react';
import './InfiniteSpiral.css';

/**
 * Math Helper Functions
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
const smoothstep = (min, max, value) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

/**
 * ========================================================================================
 * 3D INFINITE SPIRAL CAROUSEL COMPONENT
 * ========================================================================================
 * 
 * An interactive open-source 3D helical carousel component.
 * 
 * How it works:
 * - Arranges project items along a continuous 3D mathematical helix using CSS perspective.
 * - Computes responsive angles, sine/cosine depth coordinates (x, z), and dynamic scaling.
 * - Supports automatic continuous rotation, pointer drag interaction, and scroll velocity.
 * - Applies progressive edge blur and center focus scaling for a holographic 3D depth effect.
 */
const InfiniteSpiral = ({
  items = [],
  speed = 0.55,
  direction = 'up',
  animationMode = 'all', // 'auto' | 'drag' | 'scroll' | 'all'
  radius = 230,
  cardWidth = 260,
  cardHeight = 230,
  verticalSpacing = 90,
  perspective = 1100,
  cardsPerTurn = 6,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 18,
  centerScale = 1.18,
  edgeFade = 0.3,
  edgeBlur = 5,
  pauseOnHover = true,
  imageFit = 'cover',
  grayscale = 0,
  className = '',
  onItemClick = null,
}) => {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const autoSpeedRef = useRef(0);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(true);
  const draggingRef = useRef(false);
  const lastPointerYRef = useRef(0);
  const dragMovedRef = useRef(false);

  // Normalize project card item objects
  const normalizedItems = useMemo(
    () =>
      items.map((item, index) =>
        typeof item === 'string'
          ? { src: item, alt: `Spiral item ${index + 1}` }
          : { alt: `Spiral item ${index + 1}`, ...item }
      ),
    [items]
  );

  // --------------------------------------------------------------------------------------
  // 3D RAF RENDERING & TRANSFORMS ENGINE
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root || normalizedItems.length === 0) return;

    let frameId;
    let previousTime = performance.now();
    let bounds = root.getBoundingClientRect();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollEnabled = animationMode === 'scroll' || animationMode === 'all';
    const scrollSpeedMultiplier = Math.max(speed, 0) / 0.55;
    let lastScrollY = window.scrollY;

    const resizeObserver = new ResizeObserver(() => {
      bounds = root.getBoundingClientRect();
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(root);

    // Scroll delta tracker for scroll-controlled revolving
    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const scrollDelta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      if (!scrollEnabled || !visibleRef.current || scrollDelta === 0) return;
      targetProgressRef.current += clamp(
        (scrollDelta * scrollSpeedMultiplier) / Math.max(verticalSpacing * 2, 1),
        -1.5,
        1.5
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Main 60 FPS animation frame loop
    const render = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const autoEnabled = animationMode === 'auto' || animationMode === 'all';
      const motionPaused = draggingRef.current || (pauseOnHover && hoveredRef.current);
      const directionMultiplier = direction === 'down' ? -1 : 1;
      const desiredAutoSpeed =
        autoEnabled && visibleRef.current && !reducedMotion.matches && !motionPaused
          ? speed * directionMultiplier
          : 0;
      const speedBlend = 1 - Math.exp(-delta * 7);
      autoSpeedRef.current += (desiredAutoSpeed - autoSpeedRef.current) * speedBlend;
      targetProgressRef.current += autoSpeedRef.current * delta;

      // Smooth inertia following
      const followBlend = 1 - Math.exp(-delta * (draggingRef.current ? 22 : 11));
      progressRef.current += (targetProgressRef.current - progressRef.current) * followBlend;

      const count = normalizedItems.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      const fit = Math.min(1, width / (cardWidth * 2.8), height / (cardHeight * 2.35));
      const responsiveRadius = Math.min(radius, Math.max(72, width * 0.36)) * fit;
      const fadeStart = clamp(1 - edgeFade, 0, 0.98);
      const turnSize = Math.max(cardsPerTurn, 1);

      // Compute 3D transforms for each card along the helix
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        let offset = index - progressRef.current;
        offset = modulo(offset + half, count) - half;

        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
        const opacity = 1 - smoothstep(fadeStart, 1, edge);
        const focus = 1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
        const scale = (1 + (centerScale - 1) * focus) * fit;
        const angle = offset * (360 / turnSize) + rotation;
        const angleRadians = (angle * Math.PI) / 180;
        const x = Math.sin(angleRadians) * responsiveRadius;
        const z = Math.cos(angleRadians) * responsiveRadius;
        const depthScale = clamp(perspective / Math.max(perspective - z, 1), 0.72, 1.45);
        const visualScale = scale * depthScale;
        const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2;
        const blur = edgeBlur * smoothstep(0.35, 1, edge);

        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${offset * verticalSpacing * fit}px, 0) rotateZ(${cardTilt}deg) scale(${visualScale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : 'none';
        card.style.zIndex = String(Math.round(depth * 100000) + index);
        card.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    normalizedItems,
    speed,
    direction,
    animationMode,
    radius,
    perspective,
    cardWidth,
    cardHeight,
    verticalSpacing,
    cardsPerTurn,
    rotation,
    cardTilt,
    centerScale,
    edgeFade,
    edgeBlur,
    pauseOnHover,
  ]);

  const rootStyle = {
    perspective: `${perspective}px`,
    '--infinite-spiral-card-width': `${cardWidth}px`,
    '--infinite-spiral-card-height': `${cardHeight}px`,
    '--infinite-spiral-card-radius': `${cardRadius}px`,
    cursor: animationMode === 'drag' || animationMode === 'all' ? 'grab' : 'default',
    touchAction: animationMode === 'drag' || animationMode === 'all' ? 'pan-x' : 'auto',
    userSelect: animationMode === 'drag' || animationMode === 'all' ? 'none' : 'auto',
  };

  const dragEnabled = animationMode === 'drag' || animationMode === 'all';

  // Pointer drag event handlers
  const handlePointerDown = (event) => {
    if (!dragEnabled) return;
    draggingRef.current = true;
    dragMovedRef.current = false;
    lastPointerYRef.current = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    const deltaY = event.clientY - lastPointerYRef.current;
    if (Math.abs(deltaY) > 3) {
      dragMovedRef.current = true;
    }
    lastPointerYRef.current = event.clientY;
    const count = normalizedItems.length;
    targetProgressRef.current = modulo(
      targetProgressRef.current - deltaY / Math.max(verticalSpacing, 1),
      count
    );
  };

  const handlePointerUp = (event) => {
    if (!dragEnabled) return;
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleCardClick = (item, event) => {
    if (dragMovedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`infinite-spiral ${className}`}
      style={rootStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
    >
      <div className="infinite-spiral__stage">
        {normalizedItems.map((item, index) => {
          const Tag = item.href ? 'a' : 'div';
          return (
            <Tag
              key={item.id || item.src || index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="infinite-spiral__item"
              href={item.href}
              target={item.target}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleCardClick(item, e)}
            >
              {item.src && (
                <img
                  className="infinite-spiral__image"
                  src={item.src}
                  alt={item.alt || ''}
                  style={{
                    objectFit: imageFit,
                    filter: grayscale > 0 ? `grayscale(${grayscale})` : 'none',
                  }}
                  loading="lazy"
                  draggable={false}
                />
              )}

              {/* Rich Project Card Overlay Content */}
              <div className="infinite-spiral__card-content">
                <div className="infinite-spiral__card-top">
                  {item.Icon && (
                    <div
                      className="infinite-spiral__card-icon"
                      style={{
                        background: `${item.iconColor || '#38bdf8'}22`,
                        borderColor: `${item.iconColor || '#38bdf8'}55`,
                        color: item.iconColor || '#38bdf8',
                      }}
                    >
                      <item.Icon size={18} />
                    </div>
                  )}
                  {item.badge && (
                    <span className="infinite-spiral__card-badge">{item.badge}</span>
                  )}
                </div>

                <div>
                  <h4 className="infinite-spiral__card-title">{item.title}</h4>
                  <p className="infinite-spiral__card-desc">{item.desc}</p>
                </div>

                {item.tags && (
                  <div className="infinite-spiral__card-tags">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="infinite-spiral__card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteSpiral;
