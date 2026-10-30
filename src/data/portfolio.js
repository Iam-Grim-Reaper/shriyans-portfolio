export const skills = [
  ['01', 'AI Systems', ['RAG Pipelines', 'LLM Integration', 'Prompt Engineering', 'Embeddings', 'Transformers']],
  ['02', 'Machine Learning', ['Deep Learning', 'Computer Vision', 'NLP', 'Model Evaluation', 'Data Augmentation']],
  ['03', 'Frameworks', ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'ONNX Runtime']],
  ['04', 'Backend & APIs', ['FastAPI', 'REST APIs', 'Python', 'Authentication', 'Logging']],
  ['05', 'Data & Search', ['MySQL', 'FAISS', 'Neo4j', 'Pandas', 'NumPy']],
  ['06', 'Performance', ['Micro-batching', 'Multithreading', 'Checkpointing', 'Profiling', 'Resumability']],
];

export const projects = [
  {
    num: '01',
    label: 'Computer Vision · Medical AI',
    title: 'HistoDetect — Lung & Colon Histopathology',
    repoUrl: 'https://github.com/Iam-Grim-Reaper/HistoDetect',
    note: 'Research prototype. Not validated for clinical diagnosis.',
    copy: 'A full-stack histopathology research prototype combining ConvNeXt-Small inference, Grad-CAM explanations, a FastAPI backend, and a Next.js interface.',
    stack: ['ConvNeXt-Small', 'PyTorch', 'Grad-CAM', 'FastAPI', 'Next.js'],
    accent: 'PATHOLOGY / VISION',
    problem: 'Analyzing histopathology images takes expertise and time. This prototype explores classification and visual explanations in a web application.',
    approach: 'Connected ConvNeXt-Small inference using PyTorch to a FastAPI prediction endpoint, generated Grad-CAM heatmaps, and built a Next.js image upload and results interface.',
    impact: [
      'The inference service generates Grad-CAM heatmaps alongside class predictions',
      'FastAPI exposes prediction and health-check endpoints',
      'The Next.js frontend offers an image-upload and results workflow',
    ],
  },
  {
    num: '02',
    label: 'Deep Learning · Healthcare',
    title: 'Pneumonia Detection — Chest X-ray Prototype',
    repoUrl: 'https://github.com/Iam-Grim-Reaper/pneumonia-detector-app',
    note: 'Research prototype. Not intended for clinical decisions.',
    copy: 'A chest X-ray image classification prototype with PyTorch inference utilities and a Streamlit interface for image upload and predictions.',
    stack: ['Python', 'PyTorch', 'EfficientNet', 'Streamlit', 'Torchvision'],
    accent: 'CHEST X-RAY / DL',
    problem: 'Chest X-ray classification requires reliable preprocessing and a clear inference workflow, including a usable interface for exploring predictions.',
    approach: 'Built a Streamlit upload interface and PyTorch utilities for image preprocessing, EfficientNet model loading, and class prediction. The public repository contains prototype inference code.',
    impact: [
      'Streamlit interface supports image uploads and predicted-label display',
      'Separate utilities include normalized image preprocessing and probability outputs',
      'Reproducible weights, model consistency, and evaluation results remain future work',
    ],
  },
  {
    num: '03',
    label: 'Production AI · Face Recognition',
    title: 'Smart Face Recognizer — ISRO NRSC',
    repoUrl: null,
    note: 'Internship project; code is not publicly linked.',
    copy: 'High-performance InsightFace archival recognition pipeline with optimized preprocessing, multi-threaded CPU micro-batching, checkpoint recovery, persistence, monitoring, and threshold tuning.',
    stack: ['InsightFace', 'OpenCV', 'NumPy', 'MySQL', 'OpenMP', 'MKL'],
    accent: 'IDENTITY / RETRIEVAL',
    problem: 'NRSC needed to recognize employees across a large archival image set on CPU-only infrastructure, with runs that had to survive interruption without restarting from scratch.',
    approach: 'Built an InsightFace embedding pipeline with CPU micro-batching and multithreading tuned against OpenMP/MKL, added checkpointed, resumable processing, and persisted embeddings and run state to MySQL with monitoring and logging throughout.',
    impact: [
      'Checkpoint recovery meant a killed process could resume from the last batch instead of restarting',
      'Collaborated with NRSC engineers on distance thresholds and false-positive control',
      'Designed CPU micro-batching and multithreading for efficient archival processing',
    ],
  }
];

