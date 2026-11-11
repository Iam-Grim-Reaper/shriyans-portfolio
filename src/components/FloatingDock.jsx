import React from 'react';
import { House, NotebookPen, ScrollText } from 'lucide-react';
import './FloatingDock.css';

/** Reference-inspired five-item floating dock. This is the only primary navigation.
 *  It intentionally stays visible while the portfolio scrolls beneath it.
 */
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

function DockLink({ label, href, children, external = false, current = false, onClick }) {
  return (
    <a
      className="floating-dock__item"
      href={href}
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <span className="floating-dock__icon" aria-hidden="true">{children}</span>
      <span className="floating-dock__tooltip" aria-hidden="true">{label}</span>
    </a>
  );
}

export default function FloatingDock({ resumeUrl }) {
  const path = window.location.pathname;
  const onPortfolio = path === '/';

  const scrollHome = (event) => {
    if (!onPortfolio) return;
    event.preventDefault();
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    if (window.location.hash) window.history.replaceState(null, '', '/');
  };

  return (
    <nav className="floating-dock" aria-label="Portfolio quick navigation">
      <div className="floating-dock__group">
        <DockLink label="Home" href="/" current={onPortfolio} onClick={scrollHome}>
          <House size={23} strokeWidth={2.05}/>
        </DockLink>
        <DockLink label="Blogs" href="/blog" current={path.startsWith('/blog') || path === '/write'}>
          <NotebookPen size={23} strokeWidth={1.95}/>
        </DockLink>
      </div>
      <span className="floating-dock__divider" aria-hidden="true"/>
      <div className="floating-dock__group">
        <DockLink label="Instagram" href="https://www.instagram.com/chio_kun/" external>
          <InstagramMark />
        </DockLink>
        <DockLink label="GitHub" href="https://github.com/Iam-Grim-Reaper" external>
          <GithubMark />
        </DockLink>
        <DockLink label="Resume" href={resumeUrl} external>
          <ScrollText size={23} strokeWidth={1.95}/>
        </DockLink>
      </div>
    </nav>
  );
}
