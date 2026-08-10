import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, Cpu, BrainCircuit, Layers3, Sparkles, Trophy, ChevronRight, X, Target, Wrench, TrendingUp } from 'lucide-react';
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

const skills = [
  ['01', 'AI Systems', ['RAG Pipelines', 'LLM Integration', 'Prompt Engineering', 'Embeddings', 'Transformers']],
  ['02', 'Machine Learning', ['Deep Learning', 'Computer Vision', 'NLP', 'Model Evaluation', 'Data Augmentation']],
  ['03', 'Frameworks', ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'ONNX Runtime']],
  ['04', 'Backend & APIs', ['FastAPI', 'REST APIs', 'Python', 'Authentication', 'Logging']],
  ['05', 'Data & Search', ['MySQL', 'FAISS', 'Neo4j', 'Pandas', 'NumPy']],
  ['06', 'Performance', ['Micro-batching', 'Multithreading', 'Checkpointing', 'Profiling', 'Resumability']],
];

const projects = [
  {
    num: '01',
    label: 'Computer Vision · Medical AI',
    title: 'Histopathology Driven Detection of Lung & Colon Cancer',
    copy: 'A production-oriented pathology image classification pipeline using ConvNeXt-Small, transfer learning, Macenko stain normalization, explainability, rigorous evaluation, and optimized ONNX inference.',
    stack: ['ConvNeXt-Small', 'ONNX', 'INT8', 'Grad-CAM', 'SSIM', 'REST API'],
    accent: 'PATHOLOGY / VISION',
    problem: 'Manual histopathology review is slow and subject to inter-pathologist variance, which delays diagnosis for lung and colon cancer screening at scale.',
    approach: 'Fine-tuned a ConvNeXt-Small backbone on stain-normalized whole-slide tiles (Macenko normalization to neutralize staining variance across labs), then quantized the model to INT8 ONNX for fast CPU inference and wrapped it behind a REST API.',
    impact: [
      'Grad-CAM overlays give pathologists a visual explanation for every prediction, not just a label',
      'INT8 ONNX export cut inference latency significantly versus the FP32 PyTorch baseline',
      'SSIM-based checks validate stain normalization quality before a tile ever reaches the model',
    ],
  },
  {
    num: '02',
    label: 'Deep Learning · Healthcare',
    title: 'Pneumonia Detection using Deep Learning',
    copy: 'Built an EfficientNetV2-based pneumonia detection workflow with augmentation, normalization, class weighting, and a lightweight interface for real-time inference simulation in constrained environments.',
    stack: ['Python', 'TensorFlow', 'Keras', 'EfficientNetV2', 'OpenCV'],
    accent: 'CHEST X-RAY / DL',
    problem: 'Public chest X-ray datasets are heavily class-imbalanced, which biases naive classifiers toward the majority "normal" class and hides true recall on pneumonia cases.',
    approach: 'Trained EfficientNetV2 with targeted augmentation (rotation, contrast jitter, CLAHE) and class-weighted loss to correct for imbalance, then benchmarked inference under constrained-resource conditions to simulate low-power clinical hardware.',
    impact: [
      'Class weighting materially improved recall on the minority pneumonia class without sacrificing precision',
      'CLAHE-based preprocessing improved contrast on low-quality scans before inference',
      'Validated the pipeline can run inference simulation on constrained hardware profiles',
    ],
  },
  {
    num: '03',
    label: 'Production AI · Face Recognition',
    title: 'Smart Face Recognizer — ISRO NRSC',
    copy: 'High-performance InsightFace archival recognition pipeline with optimized preprocessing, multi-threaded CPU micro-batching, checkpoint recovery, persistence, monitoring, and threshold tuning.',
    stack: ['InsightFace', 'OpenCV', 'NumPy', 'MySQL', 'OpenMP', 'MKL'],
    accent: 'IDENTITY / RETRIEVAL',
    problem: 'NRSC needed to recognize employees across a large archival image set on CPU-only infrastructure, with runs that had to survive interruption without restarting from scratch.',
    approach: 'Built an InsightFace embedding pipeline with CPU micro-batching and multithreading tuned against OpenMP/MKL, added checkpointed, resumable processing, and persisted embeddings and run state to MySQL with monitoring and logging throughout.',
    impact: [
      'Checkpoint recovery meant a killed process could resume from the last batch instead of restarting',
      'Threshold tuning alongside NRSC engineers measurably reduced false-positive matches',
      'Micro-batching plus multithreading pushed CPU-only throughput well past the naive baseline',
    ],
  }
];

const SectionTitle = ({kicker, title, copy}) => (
  <motion.div className="section-heading" initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-80px'}} transition={{duration:.6}}>
    <div className="kicker">{kicker}</div>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </motion.div>
);

function Magnetic({ children, strength = 18, className, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: .4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: .4 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - .5) * strength);
    y.set(((e.clientY - r.top) / r.height - .5) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className} style={{ x: sx, y: sy }} {...rest}>
      {children}
    </motion.a>
  );
}

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: .5 });
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: .5 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); if (!active) setActive(true); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [active, x, y]);

  if (!active) return null;
  return <motion.div className="cursor-glow" style={{ left: sx, top: sy }} />;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
      <motion.div
        className="modal-card"
        initial={{opacity:0, y:28, scale:.97}}
        animate={{opacity:1, y:0, scale:1}}
        exit={{opacity:0, y:18, scale:.98}}
        transition={{duration:.35, ease:[.16,1,.3,1]}}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18}/></button>
        <div className="modal-top"><span>CASE STUDY // {project.num}</span><span>{project.accent}</span></div>
        <h3>{project.title}</h3>
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
        <a href="https://github.com/Iam-Grim-Reaper" target="_blank" rel="noreferrer" className="project-link">View GitHub profile <ArrowUpRight size={15}/></a>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const panelOpacity = useTransform(scrollYProgress, [0, .8], [1, 0]);

  return (
    <section ref={ref} className="hero wrap">
      <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.55}} className="hero-left">
        <div className="status"><span className="pulse"></span> AI SYSTEMS // ONLINE</div>
        <h1>Engineering AI that<br/><em>works in the real world.</em></h1>
        <p className="hero-copy">AI Engineer focused on production-ready Generative AI, computer vision, machine learning, RAG pipelines, agentic workflows, and scalable backend systems.</p>
        <div className="hero-actions">
          <Magnetic className="primary" href="#projects">Explore projects <ArrowUpRight size={17}/></Magnetic>
          <Magnetic className="secondary" href="https://github.com/Iam-Grim-Reaper" target="_blank" rel="noreferrer"><Github size={17}/> GitHub</Magnetic>
        </div>
        <div className="meta-row"><span><MapPin size={14}/> Hyderabad, India</span><span>B.Tech AI · 2026</span><span>Open to AI/ML roles</span></div>
      </motion.div>
      <motion.div style={{ y: panelY, opacity: panelOpacity }} initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.7,delay:.08}} className="hero-panel">
        <div className="panel-top"><span>PROFILE.json</span><span>v2.0</span></div>
        <pre>{`{
  "role": "AI Engineer",
  "focus": [
    "Generative AI",
    "Computer Vision",
    "RAG + Agents",
    "ML Systems"
  ],
  "core": "Python + FastAPI",
  "status": "building"
}`}</pre>
        <div className="panel-metrics">
          <div><strong>8.01</strong><span>CGPA / 10</span></div>
          <div><strong>ISRO</strong><span>AI Internship</span></div>
          <div><strong>2×</strong><span>Flagship CV Projects</span></div>
        </div>
      </motion.div>
    </section>
  );
}

function App(){
  const [openProject, setOpenProject] = useState(null);

  return <div className="app-shell">
    <div className="noise" />
    <ScrollProgress />
    <CursorGlow />
    <header className="nav wrap">
      <a className="brand" href="#top"><span>SD</span><b>SHRIYANS DENIS</b></a>
      <nav>
        <a href="#work">Work</a><a href="#projects">Projects</a><a href="#skills">Stack</a><a href="#contact">Contact</a>
      </nav>
      <Magnetic className="nav-cta" href="mailto:shriyansdoespython@gmail.com">Let's talk <ArrowUpRight size={15}/></Magnetic>
    </header>

    <main id="top">
      <Hero />

      <section className="signal-bar">
        <div className="wrap signal-inner"><span>RAG PIPELINES</span><i/> <span>COMPUTER VISION</span><i/> <span>FASTAPI</span><i/> <span>ONNX</span><i/> <span>NEO4J</span><i/> <span>FAISS</span></div>
      </section>

      <section id="work" className="section wrap">
        <SectionTitle kicker="01 / EXPERIENCE" title="Built inside real AI workflows." copy="Hands-on engineering experience across inference optimization, data persistence, threshold tuning, recovery mechanisms, and production-oriented computer vision." />
        <motion.div className="experience-card" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-60px'}} transition={{duration:.5}}>
          <div className="exp-index">2025</div>
          <div className="exp-main">
            <div className="exp-head"><div><div className="small-label">AI INTERN</div><h3>ISRO · National Remote Sensing Centre</h3></div><div className="date">SEP — DEC 2025</div></div>
            <p className="exp-project">Smart Face Recognizer for Employee Archival System</p>
            <div className="bullets">
              <p><ChevronRight/> Engineered an InsightFace pipeline with optimized preprocessing, alignment and embedding generation.</p>
              <p><ChevronRight/> Added CPU micro-batching, multithreading, checkpoint recovery and resumable processing.</p>
              <p><ChevronRight/> Integrated MySQL persistence, performance tracking, logging and validation.</p>
              <p><ChevronRight/> Tuned embedding distance metrics and recognition thresholds with NRSC AI engineers to reduce false positives.</p>
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

      <section id="projects" className="section wrap">
        <SectionTitle kicker="02 / SELECTED PROJECTS" title="AI projects with deployment thinking." copy="The portfolio emphasizes not only model training, but also evaluation, explainability, optimization, APIs, and operational reliability. Click a project to open the full case study." />
        <div className="projects-grid">
          {projects.map((p,idx)=><motion.article
            key={p.num}
            className="project-card"
            initial={{opacity:0,y:16}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{delay:idx*.08}}
            whileHover={{y:-6}}
            onClick={() => setOpenProject(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenProject(p)}
          >
            <div className="project-top"><span>PROJECT // {p.num}</span><span>{p.accent}</span></div>
            <div className="project-icon">{idx===0?<BrainCircuit/>:idx===1?<Cpu/>:<Layers3/>}</div>
            <div className="project-label">{p.label}</div>
            <h3>{p.title}</h3>
            <p>{p.copy}</p>
            <div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div>
            <span className="project-link">Open case study <ArrowUpRight size={15}/></span>
          </motion.article>)}
        </div>
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
    <footer className="wrap footer"><span>© 2026 Shriyans Denis</span><span>BUILT FOR AI ENGINEERING // PORTFOLIO v2.0</span></footer>

    <AnimatePresence>
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
    </AnimatePresence>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
