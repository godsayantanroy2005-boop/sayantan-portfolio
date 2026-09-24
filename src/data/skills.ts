// ============================================================
// SKILLS DATA
// ============================================================

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Web",
    skills: [
      "Python",
      "C++",
      "Java",
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "HTML",
      "CSS"
    ],
  },
  {
    title: "AI & Domain",
    skills: [
      "Machine Learning",
      "Artificial Intelligence",
    ],
  },
  {
    title: "Tools & Design",
    skills: [
      "Git & GitHub",
      "UI/UX",
      "Graphic Design"
    ],
  },
];
