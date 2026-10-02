export const LINKS = {
  github: "https://github.com/Shiv7019",
  linkedin: "https://www.linkedin.com/in/shivansh-mishra-ai-engineer/",
  substack: "https://substack.com/@smileoficarus",
  youtube: "https://www.youtube.com/@Letscodeshivansh",
  instagram: "https://www.instagram.com/figureitoutshiv/",
  email: "mailto:shivansh7019.m@gmail.com",
};

export type Project = {
  index: string;
  title: string;
  repo: string;
  year: string;
  field: string;
  description: string;
  long: string;
  tags: string[];
  lang: string;
  langColor: string;
  featured: boolean;
  visual: "summarizer" | "flappy" | "rag" | "mlp" | "cnnrnn" | "kmeans" | "cliff";
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Dialogue Summarizer",
    repo: "dialogue-summarizer",
    year: "2025",
    field: "Seq2Seq Transformers",
    description:
      "FastAPI web app that summarizes text using a fine-tuned T5 transformer, with beam search generation and CPU / CUDA / MPS support.",
    long: "A production-shaped NLP service: fine-tuned T5 decoding with beam search, device-agnostic inference, and a clean FastAPI surface.",
    tags: ["PyTorch", "T5", "FastAPI", "Beam Search"],
    lang: "Python",
    langColor: "#3572A5",
    featured: true,
    visual: "summarizer",
    accent: "#aa9bef",
  },
  {
    index: "02",
    title: "Flappy Bird DQN",
    repo: "flappy-bird-dqn",
    year: "2025",
    field: "Deep Reinforcement Learning",
    description:
      "A Deep Q-Network agent that learns to play Flappy Bird from scratch — built with PyTorch and Gymnasium.",
    long: "Q-learning with a neural function approximator: experience replay, target networks, and an agent that teaches itself flight.",
    tags: ["PyTorch", "DQN", "Gymnasium", "RL"],
    lang: "Python",
    langColor: "#3572A5",
    featured: true,
    visual: "flappy",
    accent: "#eb6f92",
  },
  {
    index: "03",
    title: "Research Paper RAG",
    repo: "research-paper-rag",
    year: "2025",
    field: "Retrieval-Augmented Generation",
    description:
      "A beginner-friendly RAG pipeline that answers questions from PDF research papers using LangChain, Sentence-Transformers, ChromaDB and OpenAI.",
    long: "End-to-end retrieval augmented generation over research PDFs — embeddings, vector search, and grounded answers.",
    tags: ["LangChain", "ChromaDB", "OpenAI", "Embeddings"],
    lang: "Jupyter",
    langColor: "#DA5B0B",
    featured: true,
    visual: "rag",
    accent: "#9ccfd8",
  },
  {
    index: "04",
    title: "Neural Nets from Scratch",
    repo: "neural-network-regression-classification",
    year: "2025",
    field: "Deep Learning Fundamentals",
    description:
      "Custom PyTorch neural networks for multi-class classification (date fruit variety) and regression (power plant energy output), benchmarked against PCA + logistic regression.",
    long: "Hand-built networks measured against classical baselines — where deep learning wins, and where it doesn't.",
    tags: ["PyTorch", "PCA", "Classification", "Regression"],
    lang: "Jupyter",
    langColor: "#DA5B0B",
    featured: true,
    visual: "mlp",
    accent: "#f6c177",
  },
  {
    index: "05",
    title: "Digit Classification — CNN vs RNN",
    repo: "Digit-Classification-using-CNN-RNN",
    year: "2025",
    field: "Architecture Study",
    description:
      "Training and evaluating both convolutional and recurrent networks on MNIST, a side-by-side study of two ways of seeing.",
    long: "",
    tags: ["CNN", "RNN", "MNIST"],
    lang: "Jupyter",
    langColor: "#DA5B0B",
    featured: false,
    visual: "cnnrnn",
    accent: "#aa9bef",
  },
  {
    index: "06",
    title: "SmartCart Segmentation",
    repo: "SmartCart-Unsupervised-Machine-Learning",
    year: "2025",
    field: "Unsupervised Learning",
    description:
      "Customer segmentation with K-Means, PCA dimensionality reduction, and elbow / silhouette analysis to select k.",
    long: "",
    tags: ["K-Means", "PCA", "scikit-learn"],
    lang: "Jupyter",
    langColor: "#DA5B0B",
    featured: false,
    visual: "kmeans",
    accent: "#9ccfd8",
  },
  {
    index: "07",
    title: "Cliff Walking — SARSA",
    repo: "reinforcement-learning-cliffwalking",
    year: "2025",
    field: "Tabular RL",
    description:
      "Tabular SARSA agent navigating Gymnasium's Cliff Walking grid world — on-policy TD control written from scratch.",
    long: "",
    tags: ["SARSA", "TD Control", "Gymnasium"],
    lang: "Jupyter",
    langColor: "#DA5B0B",
    featured: false,
    visual: "cliff",
    accent: "#eb6f92",
  },
];

export const FOCUS = [
  {
    key: "ANN",
    title: "Neural Networks",
    note: "where it begins",
    body: "Perceptrons to backprop — the mathematics of learning written by hand before any framework is allowed to help.",
  },
  {
    key: "CNN / RNN",
    title: "Vision & Sequence",
    note: "learning to see, learning to remember",
    body: "Convolutions for spatial structure, recurrence for time. Two inductive biases, two ways of knowing.",
  },
  {
    key: "ATTN",
    title: "Transformers",
    note: "attention as a universal machine",
    body: "The architecture that rewrote the field. Studied layer by layer — embeddings, attention heads, residual streams.",
  },
  {
    key: "RL",
    title: "Reinforcement Learning",
    note: "learning from consequence",
    body: "From tabular SARSA in grid worlds to deep Q-networks learning flight — agents that improve through experience.",
  },
  {
    key: "AGI→",
    title: "Autonomous Research",
    note: "the north star",
    body: "The long-term work: systems that can read, reason, and conduct research on their own. Every repo is a step there.",
  },
];

export const ROADMAP = [
  {
    year: "2024",
    title: "The decision",
    body: "Chose depth over noise. Integrated B.Tech–M.Tech in CS&E at CSMU — a five-year runway, used deliberately.",
  },
  {
    year: "2025",
    title: "Foundations, in public",
    body: "Classical ML to deep learning from first principles. Seven research repos shipped. Started writing and teaching.",
  },
  {
    year: "2026",
    title: "Systems that retrieve & reason",
    body: "RAG pipelines, fine-tuned transformers, RL agents. Moving from reproducing results to producing them.",
  },
  {
    year: "2027–28",
    title: "Research-grade work",
    body: "Reading groups, reproductions of frontier papers, first original contributions and collaborations.",
  },
  {
    year: "2029",
    title: "M.Tech · autonomous research",
    body: "Graduation milestone — and the real start: working on agents that research alongside humans.",
  },
];

export const STACK = [
  {
    group: "Language & Compute",
    items: ["Python", "Bash", "Linux", "Git", "Docker"],
  },
  {
    group: "Deep Learning",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Jupyter"],
  },
  {
    group: "LLM Stack",
    items: ["LangChain", "ChromaDB", "OpenAI API", "Sentence-Transformers"],
  },
  {
    group: "Data & Craft",
    items: ["MySQL", "PostgreSQL", "LaTeX", "FastAPI", "Anaconda"],
  },
];

export const ROLES = [
  "AI / ML Developer",
  "Deep Learning Student",
  "RL Tinkerer",
  "Learning in Public",
  "Future Autonomous Researcher",
];
