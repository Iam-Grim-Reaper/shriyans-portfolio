import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, FileDown, Sparkles, Trophy, ChevronRight, X, Target, Wrench, TrendingUp } from 'lucide-react';
import { projects, skills, experiences, credentials } from './data/portfolio.js';
import shreyPortrait from '../shrey.jpeg';
import resumePdf from '../Shriyans Denis Resume.pdf?url';
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
        <div className="status">AI SOFTWARE ENGINEER / GENERATIVE AI / BACKEND</div>
        <h1>Shriyans Denis.<br/><em>Engineering useful AI.</em></h1>
        <p className="hero-copy">I build intelligent applications across agentic RAG, computer vision, and backend engineering—connecting retrieval systems and AI models to useful product experiences.</p>
        <div className="hero-actions">
          <Magnetic className="primary" href="#projects">View selected work <ArrowUpRight size={17}/></Magnetic>
          <Magnetic className="secondary" href={resumePdf} target="_blank" rel="noopener noreferrer" aria-label="Open Shriyans Denis résumé PDF"><FileDown size={17}/> View résumé</Magnetic>
          <Magnetic className="hero-inline-link" href="https://github.com/Iam-Grim-Reaper" target="_blank" rel="noopener noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={13}/></Magnetic>
        </div>
        <div className="meta-row"><span><MapPin size={14}/> Hyderabad, India</span><span>B.Tech AI · 2026</span><span>Open to AI/ML roles</span></div>
      </motion.div>
      <aside className="hero-panel" aria-label="Portrait and engineering focus areas">
        <div className="panel-top"><span>BEHIND THE WORK</span><span>PROFILE / 01</span></div>
        <div className="panel-graphic portrait-frame">
          <img
            src={shreyPortrait}
            alt="Portrait of Shriyans Denis outdoors"
            className="portrait-image"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="portrait-overlay" aria-hidden="true">
            <span>SHRIYANS DENIS</span>
            <span>AI ENGINEER / HYDERABAD</span>
          </div>
        </div>
        <div className="panel-summary">
          <div className="small-label">FROM MODEL TO PRODUCT</div>
          <h2>Building across the AI stack.</h2>
          <p>Agentic retrieval, computer vision, and reliable full-stack delivery.</p>
        </div>
        <div className="panel-capabilities">
          <div><span>01</span> Agentic RAG &amp; retrieval</div>
          <div><span>02</span> AI backends &amp; APIs</div>
          <div><span>03</span> Computer vision &amp; ML</div>
        </div>
      </aside>
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
        <a href="#projects">Projects</a><a href="#work">Experience</a><a href="#skills">Stack</a><a href="#contact">Contact</a><a href={resumePdf} target="_blank" rel="noopener noreferrer">Résumé</a>
      </nav>
      <Magnetic className="nav-cta" href="mailto:shriyansdoespython@gmail.com">Let's talk <ArrowUpRight size={15}/></Magnetic>
    </header>

    <main id="top" tabIndex="-1">
      <Hero />

      <section className="signal-bar">
        <div className="wrap signal-inner"><span>AGENTIC RAG</span><i/><span>LANGGRAPH</span><i/><span>FASTAPI</span><i/><span>QDRANT</span><i/><span>NEO4J</span><i/><span>COMPUTER VISION</span></div>
      </section>

      <section id="projects" className="section wrap">
        <SectionTitle kicker="01 / SELECTED WORK" title="Selected work, engineered for impact." copy="From agentic research workflows to explainable computer vision—explore how the systems are designed and where to find the code." />
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
        <SectionTitle kicker="02 / EXPERIENCE" title="Engineering experience across AI products." copy="Current application engineering at Altaric Consulting, alongside AI research and inference work at ISRO NRSC." />
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
        <SectionTitle kicker="03 / TECHNICAL STACK" title="Tools behind the work." />
        <div className="skills-grid">{skills.map(([n,title,items],idx)=><motion.div className="skill" key={n} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-40px'}} transition={{duration:.45, delay:(idx%3)*.06}}><div className="skill-num">{n}</div><h4>{title}</h4><div className="skill-list">{items.map(i=><span key={i}>{i}</span>)}</div></motion.div>)}</div>
      </section>

      <section className="section wrap education">
        <div>
          <SectionTitle kicker="04 / EDUCATION" title="A foundation in Artificial Intelligence." />
          <motion.div className="edu-card" initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}}><span>OCT 2022 — MAY 2026</span><h3>B.Tech in Artificial Intelligence</h3><p>Vidya Jyothi Institute of Technology · Hyderabad</p><b>CGPA 8.01 / 10</b></motion.div>
        </div>
        <div>
          <SectionTitle kicker="05 / RECOGNITION" title="Certifications, leadership & achievements." />
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

      <section id="contact" className="contact-section">
        <div className="wrap contact-grid">
          <div><div className="kicker">06 / CONTACT</div><h2>Let’s build something<br/>useful with AI.</h2><p>Open to opportunities spanning Generative AI, agentic systems, computer vision, and backend engineering. Explore my work or download the latest résumé.</p></div>
          <div className="contact-links">
            <Magnetic strength={10} href="mailto:shriyansdoespython@gmail.com"><Mail/>shriyansdoespython@gmail.com<ArrowUpRight/></Magnetic>
            <Magnetic strength={10} href="https://linkedin.com/in/shriyansdenis" target="_blank" rel="noreferrer"><Linkedin/>LinkedIn<ArrowUpRight/></Magnetic>
            <Magnetic strength={10} href="https://github.com/Iam-Grim-Reaper" target="_blank" rel="noopener noreferrer"><Github/>GitHub<ArrowUpRight/></Magnetic>
            <a href={resumePdf} download="Shriyans-Denis-Resume.pdf"><FileDown/>Download résumé (PDF)<ArrowUpRight/></a>
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
