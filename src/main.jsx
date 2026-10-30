import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, Sparkles, Trophy, ChevronRight, X, Target, Wrench, TrendingUp } from 'lucide-react';
import { projects, skills } from './data/portfolio.js';
import './styles.css';

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

function Hero() {
  return (
    <section className="hero wrap">
      <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.55}} className="hero-left">
        <div className="status">AI ENGINEER / MACHINE LEARNING / BACKEND</div>
        <h1>Shriyans Denis.<br/><em>Engineering useful AI.</em></h1>
        <p className="hero-copy">I build AI-powered applications, from computer vision and explainable inference to Python APIs and practical user-facing workflows.</p>
        <div className="hero-actions">
          <Magnetic className="primary" href="#projects">View selected work <ArrowUpRight size={17}/></Magnetic>
          <Magnetic className="secondary" href="https://github.com/Iam-Grim-Reaper" target="_blank" rel="noreferrer"><Github size={17}/> GitHub</Magnetic>
        </div>
        <div className="meta-row"><span><MapPin size={14}/> Hyderabad, India</span><span>B.Tech AI · 2026</span><span>Open to AI/ML roles</span></div>
      </motion.div>
      <aside className="hero-panel" aria-label="Engineering focus areas">
        <div className="panel-top"><span>ENGINEERING SNAPSHOT</span><span>01 — 03</span></div>
        <div className="panel-graphic" aria-hidden="true">
          <span className="graphic-label top">MODEL</span>
          <div className="graphic-orbit"><div className="graphic-core">AI</div></div>
          <span className="graphic-label bottom">PRODUCT</span>
        </div>
        <div className="panel-summary">
          <div className="small-label">FROM MODEL TO PRODUCT</div>
          <h2>Building across the AI stack.</h2>
          <p>Connecting intelligent models with useful, maintainable applications.</p>
        </div>
        <div className="panel-capabilities">
          <div><span>01</span> Computer vision &amp; inference</div>
          <div><span>02</span> Python backends &amp; APIs</div>
          <div><span>03</span> Explainability &amp; evaluation</div>
        </div>
      </aside>
    </section>
  );
}

function ProjectVisual({ project }) {
  const flows = {
    '01': ['Histology image', 'ConvNeXt', 'Grad-CAM'],
    '02': ['Chest X-ray', 'EfficientNet', 'Prediction'],
    '03': ['Image archive', 'Face vectors', 'Matching'],
  };
  const steps = flows[project.num] ?? [];
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

  return <div className="app-shell">
    <a className="skip-link" href="#top">Skip to main content</a>
    <div className="noise" aria-hidden="true" />
    <ScrollProgress />
    <header className="nav wrap">
      <a className="brand" href="#top"><span>SD</span><b>SHRIYANS DENIS</b></a>
      <nav aria-label="Main navigation">
        <a href="#projects">Projects</a><a href="#work">Experience</a><a href="#skills">Stack</a><a href="#contact">Contact</a>
      </nav>
      <Magnetic className="nav-cta" href="mailto:shriyansdoespython@gmail.com">Let's talk <ArrowUpRight size={15}/></Magnetic>
    </header>

    <main id="top" tabIndex="-1">
      <Hero />

      <section className="signal-bar">
        <div className="wrap signal-inner"><span>COMPUTER VISION</span><i/><span>PYTORCH</span><i/><span>FASTAPI</span><i/><span>NEXT.JS</span><i/><span>MODEL INFERENCE</span><i/><span>PYTHON</span></div>
      </section>

      <section id="projects" className="section wrap">
        <SectionTitle kicker="01 / SELECTED WORK" title="Selected projects, thoughtfully built." copy="A closer look at the problems, implementation choices, and supporting code. Open a case study to explore the details." />
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
            <div className="project-top"><span>PROJECT // {p.num}</span><span>{p.accent}</span></div>
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
        <SectionTitle kicker="02 / EXPERIENCE" title="Learning by building in real environments." copy="Practical engineering experience across computer vision, model optimization, data persistence, and reliable inference workflows." />
        <motion.div className="experience-card" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-60px'}} transition={{duration:.5}}>
          <div className="exp-index">2025</div>
          <div className="exp-main">
            <div className="exp-head"><div><div className="small-label">AI INTERN</div><h3>ISRO · National Remote Sensing Centre</h3></div><div className="date">SEP — DEC 2025</div></div>
            <p className="exp-project">Smart Face Recognizer for Employee Archival System</p>
            <div className="bullets">
              <p><ChevronRight/> Engineered an InsightFace pipeline with optimized preprocessing, alignment and embedding generation.</p>
              <p><ChevronRight/> Added CPU micro-batching, multithreading, checkpoint recovery and resumable processing.</p>
              <p><ChevronRight/> Integrated MySQL persistence, performance tracking, logging and validation.</p>
              <p><ChevronRight/> Collaborated on embedding distance metrics and recognition threshold tuning.</p>
            </div>
          </div>
        </motion.div>
        <motion.div className="experience-card muted-card" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-60px'}} transition={{duration:.5, delay:.08}}>
          <div className="exp-index">2024</div>
          <div className="exp-main">
            <div className="exp-head"><div><div className="small-label">HR INTERN</div><h3>WoW HR</h3></div><div className="date">JUN — AUG 2024</div></div>
            <p className="muted-copy">Supported recruitment coordination, interview scheduling, DEI initiatives, event planning, and HR analytics exposure.</p>
          </div>
        </motion.div>
      </section>

      <section id="skills" className="section wrap">
        <SectionTitle kicker="03 / TECHNICAL SYSTEM" title="A stack built around AI delivery." />
        <div className="skills-grid">{skills.map(([n,title,items],idx)=><motion.div className="skill" key={n} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-40px'}} transition={{duration:.45, delay:(idx%3)*.06}}><div className="skill-num">{n}</div><h4>{title}</h4><div className="skill-list">{items.map(i=><span key={i}>{i}</span>)}</div></motion.div>)}</div>
      </section>

      <section className="section wrap education">
        <div>
          <SectionTitle kicker="04 / EDUCATION" title="Artificial Intelligence by foundation." />
          <motion.div className="edu-card" initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}}><span>2022 — 2026</span><h3>B.Tech in Artificial Intelligence</h3><p>Vidya Jyothi Institute of Technology · JNTU, Hyderabad</p><b>CGPA 8.01 / 10</b></motion.div>
        </div>
        <div>
          <SectionTitle kicker="05 / SIGNALS" title="Certifications & achievements." />
          <div className="signal-list">
            <motion.div initial={{opacity:0,x:10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0}}><Sparkles/><span>AWS Academy — Machine Learning Foundations</span></motion.div>
            <motion.div initial={{opacity:0,x:10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.05}}><Sparkles/><span>Infosys — Computer Vision 101</span></motion.div>
            <motion.div initial={{opacity:0,x:10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.1}}><Sparkles/><span>Infosys — Introduction to NLP</span></motion.div>
            <motion.div initial={{opacity:0,x:10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.15}}><Trophy/><span>First Prize — ARKA 2023 Ideathon</span></motion.div>
            <motion.div initial={{opacity:0,x:10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.2}}><Trophy/><span>Smart India Hackathon 2023 Finalist</span></motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="wrap contact-grid">
          <div><div className="kicker">06 / CONTACT</div><h2>Have an AI problem<br/>worth solving?</h2><p>I'm interested in AI engineering, ML systems, computer vision, Generative AI, and backend-heavy intelligent applications.</p></div>
          <div className="contact-links">
            <Magnetic strength={10} href="mailto:shriyansdoespython@gmail.com"><Mail/>shriyansdoespython@gmail.com<ArrowUpRight/></Magnetic>
            <Magnetic strength={10} href="https://linkedin.com/in/shriyansdenis" target="_blank" rel="noreferrer"><Linkedin/>LinkedIn<ArrowUpRight/></Magnetic>
            <Magnetic strength={10} href="https://github.com/Iam-Grim-Reaper" target="_blank" rel="noreferrer"><Github/>GitHub<ArrowUpRight/></Magnetic>
          </div>
        </div>
      </section>
    </main>
    <footer className="wrap footer"><span>© 2026 Shriyans Denis</span><span>AI ENGINEERING · SELECTED WORK</span></footer>

    <AnimatePresence>
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </AnimatePresence>
  </div>
}

createRoot(document.getElementById("root")).render(<MotionConfig reducedMotion="user"><App /></MotionConfig>);
