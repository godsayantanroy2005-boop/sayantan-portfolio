// ============================================================
// CURRENTLY LEARNING — Edit this list freely
// ============================================================

export interface LearningItem {
  label: string;
  icon?: string; // Optional emoji icon
  description?: string;
}

export const currentlyLearning: LearningItem[] = [
  {
    label: "AI Agents",
    icon: "🤖",
    description: "Building autonomous agents that can reason and act.",
  },
  {
    label: "Generative AI",
    icon: "✨",
    description: "LLMs, diffusion models, and prompt engineering.",
  },
  {
    label: "Machine Learning",
    icon: "🧠",
    description: "Classical ML algorithms and neural networks.",
  },
  {
    label: "Full-Stack Development",
    icon: "⚡",
    description: "End-to-end web applications from DB to UI.",
  },
  {
    label: "System Design",
    icon: "🏗️",
    description: "Designing scalable, robust software systems.",
  },
];
