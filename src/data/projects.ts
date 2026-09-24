// ============================================================
// PROJECTS DATA — Replace placeholder content with your actual
// project details. Each project is fully editable here.
// ============================================================

export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "project-01",
    number: "01",
    category: "AI / ML",
    title: "SmartVision AI",
    description: "Real-Time Object Detection & Recognition — A computer-vision project that detects and classifies objects from images and video using a trained deep-learning model.",
    longDescription:
      "SmartVision AI leverages state-of-the-art object detection architectures to identify and classify objects in real time from images or live video streams. Built using YOLO and trained on custom datasets, the system processes frames efficiently using OpenCV and outputs bounding boxes with confidence scores.",
    technologies: ["Python", "OpenCV", "TensorFlow", "PyTorch", "YOLO"],
    githubUrl: "https://github.com/godsayantanroy2005-boop/smartvision-ai",
    liveUrl: undefined,
    featured: true,
  },
  {
    id: "project-02",
    number: "02",
    category: "WEB",
    title: "DevVault",
    description: "AI-Powered Developer Dashboard — A modern web application where users can manage projects, notes, GitHub repositories, coding resources and get AI-powered assistance.",
    longDescription:
      "DevVault is a unified developer productivity hub — combining project management, note-taking, GitHub repo tracking, and curated coding resources all in one place. Powered by an AI assistant layer that helps with code suggestions, summaries, and task management.",
    technologies: ["React", "TypeScript", "Node.js", "REST API", "AI"],
    githubUrl: "https://github.com/godsayantanroy2005-boop/devvault",
    liveUrl: undefined,
    featured: true,
  },
  {
    id: "project-03",
    number: "03",
    category: "SOFTWARE / DSA",
    title: "AlgoForge",
    description: "Interactive Data Structures & Algorithms Visualizer — An interactive tool that visually demonstrates sorting, searching, trees, graphs and other algorithms with complexity information.",
    longDescription:
      "AlgoForge brings algorithms to life with step-by-step animated visualizations. Users can watch Merge Sort, BFS, Dijkstra's, AVL trees, and more play out visually — with time and space complexity displayed at every step. Perfect for learning and teaching DSA concepts.",
    technologies: ["C++", "Algorithms", "Data Structures", "JavaScript", "React"],
    githubUrl: "https://github.com/godsayantanroy2005-boop/algoforge",
    liveUrl: undefined,
    featured: true,
  },
];
