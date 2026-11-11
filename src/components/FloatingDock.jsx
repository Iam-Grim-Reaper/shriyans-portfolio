import React, { useRef } from 'react';
import { House, NotebookPen, ScrollText } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import './FloatingDock.css';

/**
 * Magnetic five-item dock modeled on the supplied Raashed hover recording.
 * The dock expands organically as the pointer approaches each link, the
 * active icon lifts, and its neighbors grow proportionally to proximity.
 * There are no timers or expensive React state updates on pointermove.
 */
const SPRING = { stiffness: 350, damping: 25, mass: 0.5 };

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" aria-hidden="true">
      <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.09c-3.12.68-3.78-1.32-3.78-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.67 1.74 3.26 1.1.1-.72.39-1.2.71-1.48-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.11-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.64 10.64 0 0 1 5.6 0c2.13-1.44 3.07-1.15 3.07-1.15.61 1.55.23 2.7.12 2.98.73.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.09v3.1c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z"/>
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.05" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.1"/>
      <circle cx="12" cy="12" r="4.25"/>
      <circle cx="17.6" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function DockLink({ label, href, children, mouseX, external = false, current = false, onClick }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  // Measure the current icon center, including the dock's own spring expansion.
  // getBoundingClientRect is read only on pointer-value updates; no re-renders.
  const distance = useTransform(mouseX, (x) => {
    if (!Number.isFinite(x) || !ref.current) return 1000;
    const rect = ref.current.getBoundingClientRect();
    return Math.abs(x - (rect.left + rect.width / 2));
  });

  // Width drives actual flex layout: other icons move aside instead of overlapping.
  const targetWidth = useTransform(distance, [0, 64, 145], [69, 56, 49]);
  const targetLift = useTransform(distance, [0, 72, 150], [-5, -1, 0]);
  const targetScale = useTransform(distance, [0, 72, 150], [1.15, 1.045, 1]);

  const width = useSpring(targetWidth, SPRING);
  const lift = useSpring(targetLift, SPRING);
  const scale = useSpring(targetScale, SPRING);

  function focusIcon(event) {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(rect.left + rect.width / 2);
  }

  function blurIcon(event) {
    // Focus may transfer directly to another icon, whose onFocus sets the next x.
    const dock = event.currentTarget.closest('.floating-dock');
    if (!dock?.contains(event.relatedTarget)) mouseX.set(Number.POSITIVE_INFINITY);
  }

  return (
    <motion.a
      ref={ref}
      className="floating-dock__item"
      href={href}
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      onClick={onClick}
      onFocus={focusIcon}
      onBlur={blurIcon}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={reducedMotion ? undefined : { width }}
    >
      <motion.span
        className="floating-dock__icon"
        aria-hidden="true"
        style={reducedMotion ? undefined : { y: lift, scale }}
      >
        {children}
      </motion.span>
      <span className="floating-dock__tooltip" aria-hidden="true">{label}</span>
    </motion.a>
  );
}

export default function FloatingDock({ resumeUrl }) {
  const path = window.location.pathname;
  const onPortfolio = path === '/';
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const reducedMotion = useReducedMotion();

  function onPointerMove(event) {
    if (reducedMotion || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
    mouseX.set(event.clientX);
  }

  function onPointerLeave() {
    mouseX.set(Number.POSITIVE_INFINITY);
  }

  function scrollHome(event) {
    if (!onPortfolio) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    if (window.location.hash) window.history.replaceState(null, '', '/');
  }

  const shared = { mouseX };

  return (
    <nav
      className="floating-dock"
      aria-label="Portfolio quick navigation"
      onPointerEnter={onPointerMove}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="floating-dock__group">
        <DockLink {...shared} label="Home" href="/" current={onPortfolio} onClick={scrollHome}>
          <House size={23} strokeWidth={2.05}/>
        </DockLink>
        <DockLink {...shared} label="Blogs" href="/blog" current={path.startsWith('/blog') || path === '/write'}>
          <NotebookPen size={23} strokeWidth={1.95}/>
        </DockLink>
      </div>
      <span className="floating-dock__divider" aria-hidden="true"/>
      <div className="floating-dock__group">
        <DockLink {...shared} label="Instagram" href="https://www.instagram.com/chio_kun/" external>
          <InstagramMark />
        </DockLink>
        <DockLink {...shared} label="GitHub" href="https://github.com/Iam-Grim-Reaper" external>
          <GithubMark />
        </DockLink>
        <DockLink {...shared} label="Resume" href={resumeUrl} external>
          <ScrollText size={23} strokeWidth={1.95}/>
        </DockLink>
      </div>
    </nav>
  );
}
