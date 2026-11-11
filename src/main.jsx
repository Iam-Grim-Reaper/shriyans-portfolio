import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, FileDown, Sparkles, Trophy, ChevronRight, X, Target, Wrench, TrendingUp } from 'lucide-react';
import { projects, skills, experiences, credentials } from './data/portfolio.js';
import shreyPortrait from '../shrey.jpeg';
import resumePdf from '../Shriyans Denis Resume.pdf?url';
import './styles.css';
import BlogPage, { BlogTeaser } from './blog/Blog.jsx';
import FloatingDock from './components/FloatingDock.jsx';
import MemoryPolaroid from './components/MemoryPolaroid.jsx';

// lucide-react dropped brand/logo marks (trademark policy), so GitHub & LinkedIn
// are hand-drawn to match lucide's stroke-based icon style.
const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size ?? 24} height={props.size ?? 24} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91.65S17.73.35 15 2.19a13.38 13.38 0 0 0-7 0C5.27.35 4.09.65 4.09.65A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.75c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22"/>
    <path d="M9 19c-4.29 1.44-5-2-7-2"/>
  </svg>
);
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width={props.size ?? 24} height={props.size ?? 24} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Instagram = (props) => (<svg viewBox="0 0 24 24" width={props.size ?? 24} height={props.size ?? 24} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>);
const SectionTitle = ({kicker, title, copy}) => (
  <motion.div className="section-heading" initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-80px'}} transition={{duration:.6}}>
    <div className="kicker">{kicker}</div>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </motion.div>
);

function Magnetic({ children, className, strength: _strength, ...rest }) {
  return <a className={className} {...rest}>{children}</a>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
      <motion.div
        className="modal-card"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-study-${project.num}`}
        initial={{opacity:0, y:28, scale:.97}}
        animate={{opacity:1, y:0, scale:1}}
        exit={{opacity:0, y:18, scale:.98}}
        transition={{duration:.35, ease:[.16,1,.3,1]}}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close case study"><X size={18}/></button>
        <div className="modal-top"><span>CASE STUDY // {project.num}</span><span>{project.accent}</span></div>
        <h3 id={`case-study-${project.num}`}>{project.title}</h3>
        <div className="modal-block">
          <div className="modal-block-label"><Target size={14}/> Problem</div>
          <p>{project.problem}</p>
        </div>
        <div className="modal-block">
          <div className="modal-block-label"><Wrench size={14}/> Approach</div>
          <p>{project.approach}</p>
        </div>
        <div className="modal-block">
          <div className="modal-block-label"><TrendingUp size={14}/> Impact</div>
          <div className="bullets">
            {project.impact.map((line, i) => <p key={i}><ChevronRight/> {line}</p>)}
          </div>
        </div>
        <div className="tags">{project.stack.map(s=><span key={s}>{s}</span>)}</div>
        {project.note && <p className="project-note">{project.note}</p>}
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link">Explore the project code <ArrowUpRight size={15}/></a>
        ) : (
          <a href="mailto:shriyansdoespython@gmail.com?subject=ISRO%20project%20inquiry" className="project-link">Ask about this project <ArrowUpRight size={15}/></a>
        )}
      </motion.div>
    </motion.div>
  );
}

function TypewriterHeading() {
  const greeting = 'Hi there, I am';
  const firstLine = 'Shriyans Denis';
  const secondLine = 'Swamy.';
  const total = greeting.length + firstLine.length + secondLine.length;
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setTyped(total);
      return undefined;
    }

    setTyped(0);
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setTyped(current);
      if (current >= total) window.clearInterval(interval);
    }, 62);
    return () => window.clearInterval(interval);
  }, [reducedMotion, total]);

  const greetingText = greeting.slice(0, typed);
  const firstCount = Math.max(0, typed - greeting.length);
  const secondCount = Math.max(0, typed - greeting.length - firstLine.length);

  return (
    <div className="typewriter-block">
      <p className="typewriter-greeting" aria-hidden="true">
        {greetingText}
        {typed < greeting.length && <span className="typewriter-caret" />}
      </p>
      <h1 className="typewriter-name" aria-label="Hi there, I am Shriyans Denis Swamy.">
        <span className="typewriter-line">
          <span className="typewriter-ghost" aria-hidden="true">{firstLine}</span>
          <span className="typewriter-visible" aria-hidden="true">
            {firstLine.slice(0, firstCount)}
            {typed >= greeting.length && typed < greeting.length + firstLine.length && <span className="typewriter-caret" />}
          </span>
        </span>
        <span className="typewriter-line">
          <span className="typewriter-ghost" aria-hidden="true">{secondLine}</span>
          <span className="typewriter-visible" aria-hidden="true">
            {secondLine.slice(0, secondCount)}
            {typed >= greeting.length + firstLine.length && <span className="typewriter-caret" />}
          </span>
        </span>
      </h1>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero hero-refined wrap">
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
      >
        <div className="status">AI ENGINEER / RESEARCH &amp; PRODUCT</div>
        <TypewriterHeading />
        <p className="hero-copy">
          I build things that make AI useful—from document intelligence and computer vision
          to the systems that turn models into working products.
        </p>
        <div className="meta-row">
          <span><MapPin size={14}/> Hyderabad, India</span>
          <span>Open to AI/ML roles</span>
        </div>
        <div className="hero-scroll-cue" aria-label="Scroll down to explore the portfolio">
          <span className="hero-scroll-cue-line" aria-hidden="true"><span /></span>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </motion.div>
      <MemoryPolaroid />
    </section>
  );
}

function ProjectVisual({ project }) {
  const flows = {
    '01': ['Documents', 'Hybrid search', 'Answer'],
    '02': ['Histology', 'ConvNeXt', 'Grad-CAM'],
    '03': ['Chest X-ray', 'EfficientNet', 'Result'],
  };
  const steps = flows[project.num] ?? [];
  if (project.videoUrl) {
    const youtubeMatch = project.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
    return <div className={'project-visual project-video visual-' + project.num}>
      {youtubeMatch ? <iframe title={project.title + ' demo'} src={'https://www.youtube-nocookie.com/embed/' + youtubeMatch[1]} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/> : <video src={project.videoUrl} poster={project.posterUrl} muted autoPlay loop playsInline controls preload="metadata" aria-label={project.title + ' demo'} />}
    </div>;
  }
  return (
    <div className={`project-visual visual-${project.num}`}>
      <div className="visual-topline"><span>WORK / {project.num}</span><span>PROCESS OVERVIEW</span></div>
      <div className="diagram-flow" role="img" aria-label={steps.join(' to ')}>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {index > 0 && <span className="diagram-arrow" aria-hidden="true">→</span>}
            <span className={`diagram-node ${index === 1 ? 'active' : ''}`}>{step}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="visual-bottomline"><span>{project.label}</span><span>0{steps.length} STAGES</span></div>
    </div>
  );
}

function App(){
  const [openProject, setOpenProject] = useState(null);
  const isBlogRoute = window.location.pathname === '/write' || window.location.pathname.startsWith('/blog');

  return <div className="app-shell">
    <a className="skip-link" href="#top">Skip to main content</a>
    <div className="noise" aria-hidden="true" />
    <ScrollProgress />
    <FloatingDock resumeUrl={resumePdf} />

    <main id="top" tabIndex="-1">
      {isBlogRoute ? <BlogPage /> : <>
       <Hero />

      <section id="projects" className="section wrap">
        <SectionTitle kicker="01 / SELECTED WORK" title="Selected work." copy="A closer look at the problems, design choices, and code behind three projects." />
        <div className="projects-grid">
          {projects.map((p,idx)=><motion.article
            key={p.num}
            className="project-card"
            initial={{opacity:0,y:12}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:.35,delay:idx*.07}}
          >
            <ProjectVisual project={p} />
            <div className="project-content">
            <div className="project-top"><span>PROJECT // {p.num}</span></div>
            <div className="project-label">{p.label}</div>
            <h3>{p.title}</h3>
            <p>{p.copy}</p>
            <div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div>
            <div className="project-footer">
              <button type="button" className="project-open" onClick={() => setOpenProject(p)} aria-label={`Read case study: ${p.title}`}>Explore case study <ArrowUpRight size={15}/></button>
              {p.repoUrl
                ? <a className="project-source" href={p.repoUrl} target="_blank" rel="noopener noreferrer">Source code <ArrowUpRight size={13}/></a>
                : <span className="project-private">Internship project</span>}
            </div>
            </div>
          </motion.article>)}
        </div>
      </section>

      <section id="work" className="section wrap">
        <SectionTitle kicker="02 / EXPERIENCE" title="Where I’ve worked." copy="From production application development to computer-vision research." />
        {experiences.map((experience, index) => (
          <motion.article
            key={experience.organization}
            className={index === experiences.length - 1 ? 'experience-card muted-card' : 'experience-card'}
            initial={{opacity:0,y:14}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true,margin:'-60px'}}
            transition={{duration:.45,delay:Math.min(index*.06,.14)}}
          >
            <div className="exp-index">{experience.year}</div>
            <div className="exp-main">
              <div className="exp-head">
                <div><div className="small-label">{experience.role}</div><h3>{experience.organization}</h3></div>
                <div className="date">{experience.date}</div>
              </div>
              {experience.project && <p className="exp-project">{experience.project}</p>}
              <div className="bullets">
                {experience.bullets.map(bullet => <p key={bullet}><ChevronRight aria-hidden="true"/>{bullet}</p>)}
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section id="skills" className="section wrap">
        <SectionTitle kicker="03 / TECHNICAL STACK" title="What I work with." />
        <div className="skills-grid">{skills.map(([n,title,items],idx)=><motion.div className="skill" key={n} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-40px'}} transition={{duration:.45, delay:(idx%3)*.06}}><div className="skill-num">{n}</div><h4>{title}</h4><div className="skill-list">{items.map(i=><span key={i}>{i}</span>)}</div></motion.div>)}</div>
      </section>

      <section className="section wrap education">
        <div>
          <SectionTitle kicker="04 / EDUCATION" title="Education." />
          <motion.div className="edu-card" initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}}><span>OCT 2022 — MAY 2026</span><h3>B.Tech in Artificial Intelligence</h3><p>Vidya Jyothi Institute of Technology · Hyderabad</p><b>CGPA 8.01 / 10</b></motion.div>
        </div>
        <div>
          <SectionTitle kicker="05 / RECOGNITION" title="Beyond the code." />
          <div className="signal-list">
            {credentials.map((item,index) => (
              <motion.div
                key={item.title}
                initial={{opacity:0,x:8}}
                whileInView={{opacity:1,x:0}}
                viewport={{once:true}}
                transition={{duration:.35,delay:(index%4)*.04}}
              >
                {item.type === 'certification' ? <Sparkles aria-hidden="true"/> : <Trophy aria-hidden="true"/>}
                <span className="credential-copy"><strong>{item.title}</strong><small>{[item.organization,item.date].filter(Boolean).join(' · ')}</small></span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BlogTeaser />
       <section id="contact" className="contact-section">
        <div className="wrap contact-grid">
          <div><div className="kicker">06 / CONTACT</div><h2>Have something<br/>in mind?</h2><p>For an engineering opportunity, a collaboration, or a question about a project, feel free to get in touch.</p></div>
          <div className="contact-links">
            <Magnetic strength={10} href="mailto:shriyansdoespython@gmail.com"><Mail/>shriyansdoespython@gmail.com<ArrowUpRight/></Magnetic>
            <Magnetic strength={10} href="https://linkedin.com/in/shriyansdenis" target="_blank" rel="noreferrer"><Linkedin/>LinkedIn<ArrowUpRight/></Magnetic>
            <Magnetic strength={10} href="https://github.com/Iam-Grim-Reaper" target="_blank" rel="noopener noreferrer"><Github/>GitHub<ArrowUpRight/></Magnetic>
             <Magnetic strength={10} href="https://www.instagram.com/chio_kun/" target="_blank" rel="noopener noreferrer"><Instagram/>Instagram · @chio_kun<ArrowUpRight/></Magnetic>
            <a href={resumePdf} download="Shriyans-Denis-Resume.pdf"><FileDown/>Download résumé (PDF)<ArrowUpRight/></a>
          </div>
        </div>
      </section>
       </>}
     </main>
    <footer className="wrap footer"><span>© 2026 Shriyans Denis Swamy</span><span>AI ENGINEERING · SELECTED WORK</span></footer>

    <AnimatePresence>
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </AnimatePresence>
  </div>
}

createRoot(document.getElementById("root")).render(<MotionConfig reducedMotion="user"><App /></MotionConfig>);
