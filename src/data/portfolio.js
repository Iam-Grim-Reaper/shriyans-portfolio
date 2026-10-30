// Portfolio content aligned with Shriyans Denis' October 2026 résumé.
// Keep claims and dates in sync with the linked PDF when updating this file.
export const skills = [
  ['01', 'GenAI & Agents', ['Retrieval-Augmented Generation', 'LangGraph', 'Agentic Workflows', 'Google Gemini', 'Hybrid Search', 'Reranking']],
  ['02', 'Machine Learning', ['Computer Vision', 'TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'ONNX Runtime']],
  ['03', 'Backend & Web', ['Python', 'FastAPI', 'REST APIs', 'JavaScript', 'TypeScript', 'React', 'Next.js']],
  ['04', 'Databases & Search', ['PostgreSQL / PostGIS', 'MySQL', 'Neo4j', 'Qdrant', 'FAISS', 'SQL', 'Valkey']],
  ['05', 'Tools & Infrastructure', ['Docker', 'Git / GitHub', 'Linux', 'Bash', 'NumPy', 'Pandas']],
  ['06', 'Engineering Practices', ['Authentication', 'API Integration', 'Model Evaluation', 'Logging', 'Micro-batching', 'Checkpoint Recovery']],
];

export const experiences = [
  {
    year: 'NOW',
    role: 'AI INTERN',
    organization: 'Altaric Consulting',
    date: 'SEP 2026 — PRESENT',
    project: 'Bar Buddy · AI-Powered Social Discovery & Meetup Platform',
    bullets: [
      'Integrated AI-assisted profile photo verification with account-bound verification tokens and application workflows.',
      'Built backend services using FastAPI, PostgreSQL/PostGIS, Valkey, and REST APIs for authentication, sessions, and database migrations.',
      'Worked across Discover, Profiles, and Plans & Meetups, including invitations, approvals, notifications, and privacy controls.',
      'Improved account security with fail-closed verification, token hardening, and user-block enforcement.',
      'Developing a liveness and 1:1 facial-matching identity verification workflow.',
    ],
  },
  {
    year: '2025',
    role: 'AI PROJECT INTERN',
    organization: 'ISRO · National Remote Sensing Centre',
    date: 'SEP — DEC 2025',
    project: 'Smart Face Recognizer for Employee Archival System',
    bullets: [
      'Designed an InsightFace recognition pipeline for image preprocessing, alignment, and embedding generation.',
      'Implemented multi-threaded CPU micro-batching and resumable checkpoint recovery with OpenMP and MKL optimization.',
      'Built MySQL-backed match persistence, logging, performance tracking, and data-integrity validation.',
      'Collaborated with NRSC AI engineers on distance metrics and recognition thresholds to reduce false positives.',
    ],
  },
  {
    year: '2024',
    role: 'HR INTERN',
    organization: 'WoW HR',
    date: 'JUN — AUG 2024',
    project: null,
    bullets: [
      'Coordinated recruitment, interview scheduling, and candidate communications while supporting DEI initiatives, engagement activities, and HR operations.',
    ],
  },
];

export const projects = [
  {
    num: '01',
    label: 'Agentic RAG · Document Intelligence',
    title: 'TraceGraph AI',
    repoUrl: 'https://github.com/Iam-Grim-Reaper/tracegraph-ai',
    note: 'Open-source engineering project. Inspect the repository for current implementation and deployment details.',
    copy: 'A document research platform combining agentic RAG, hybrid search, knowledge graphs, and source-grounded answers.',
    stack: ['Python', 'FastAPI', 'LangGraph', 'Qdrant', 'Neo4j', 'Next.js'],
    accent: 'RAG / GRAPH RETRIEVAL',
    problem: 'A semantic search result alone can miss the relationships and supporting evidence needed for multi-step document questions.',
    approach: 'Combined vector and graph retrieval with LangGraph-based query routing and multi-step research workflows, plus a FastAPI API and Next.js chat interface.',
    impact: [
      'Hybrid retrieval combines Qdrant semantic search and Neo4j graph relationships.',
      'Agentic workflows support query routing, retrieval, answer generation, and verification.',
      'The interface supports document ingestion, real-time chat streaming, and source-backed responses.',
    ],
  },
  {
    num: '02',
    label: 'Computer Vision · Medical AI',
    title: 'HistoDetect — Lung & Colon Histopathology',
    repoUrl: 'https://github.com/Iam-Grim-Reaper/HistoDetect',
    note: 'Research prototype. Not validated for clinical diagnosis.',
    copy: 'A histopathology research prototype combining ConvNeXt-Small image classification, Grad-CAM explainability, FastAPI, and Next.js.',
    stack: ['ConvNeXt-Small', 'PyTorch', 'Grad-CAM', 'FastAPI', 'Next.js'],
    accent: 'PATHOLOGY / VISION',
    problem: 'Histopathology image classification requires thoughtful preprocessing, model evaluation, and interpretable prediction outputs.',
    approach: 'Implemented image classification and explainability using ConvNeXt-Small and Grad-CAM, with a FastAPI prediction service and full-stack image-upload experience.',
    impact: [
      'Implemented a model inference endpoint returning predictions and Grad-CAM heatmaps.',
      'Connected an API-backed workflow to a Next.js interface for inspecting model results.',
      'The résumé also documents stain normalization, de-duplication, and evaluation work; public code may represent a subset of that workflow.',
    ],
  },
  {
    num: '03',
    label: 'Deep Learning · Healthcare Prototype',
    title: 'Pneumonia Detection',
    repoUrl: 'https://github.com/Iam-Grim-Reaper/pneumonia-detector-app',
    note: 'Earlier learning prototype; not intended for clinical decisions.',
    copy: 'A chest X-ray classification prototype with a Streamlit image-upload interface and PyTorch inference utilities.',
    stack: ['Python', 'PyTorch', 'EfficientNet', 'Streamlit'],
    accent: 'CHEST X-RAY / ML',
    problem: 'Exploring model predictions from chest X-ray images requires consistent preprocessing and an accessible user interface.',
    approach: 'Created a simple Streamlit flow for uploading X-rays and generating labels, alongside separate PyTorch inference utilities.',
    impact: [
      'Image upload and prediction display through Streamlit.',
      'Modular image preprocessing and model inference helpers.',
      'An early prototype rather than a validated diagnostic tool.',
    ],
  },
];

export const credentials = [
  { type: 'certification', title: 'Machine Learning Foundations', organization: 'AWS Academy', date: 'Oct 2024' },
  { type: 'certification', title: 'Computer Vision 101', organization: 'Infosys Springboard', date: 'Oct 2025' },
  { type: 'certification', title: 'Introduction to Natural Language Processing', organization: 'Infosys Springboard', date: 'Oct 2025' },
  { type: 'achievement', title: 'First Prize — ARKA 2023 Ideathon', organization: 'KLH GBS' },
  { type: 'achievement', title: 'Smart India Hackathon 2023 Finalist', organization: '' },
  { type: 'achievement', title: 'Club Architect & Ambassador — NIRMITI', organization: 'VJIT' },
  { type: 'achievement', title: 'Placement Coordinator', organization: 'Vidya Jyothi Institute of Technology' },
  { type: 'achievement', title: 'Gold Medalist — Shot Put & Volleyball', organization: 'Inter-school' },
];
