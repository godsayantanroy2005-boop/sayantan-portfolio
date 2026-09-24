import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../components/ui/Icons";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { projects } from "../data/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Project visual themes
const PROJECT_VISUALS = [
  {
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.15) 50%, rgba(99,102,241,0.05) 100%)",
    accentColor: "#6366f1",
    glowColor: "rgba(99,102,241,0.3)",
    icon: "🧠",
    bgPattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  {
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(99,102,241,0.15) 50%, rgba(16,185,129,0.05) 100%)",
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.25)",
    icon: "⚡",
    bgPattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.04'%3E%3Crect x='28' y='28' width='4' height='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  {
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(239,68,68,0.12) 50%, rgba(245,158,11,0.05) 100%)",
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.25)",
    icon: "🔥",
    bgPattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.04'%3E%3Cpolygon points='30,20 40,40 20,40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
];

function ProjectCard({ project, visual, index }: { project: typeof projects[0]; visual: typeof PROJECT_VISUALS[0]; index: number }) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Track absolute mouse position within the card for the glare effect
  const mouseX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  // Increase the tilt slightly for a more premium 3D feel
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  // Add a subtle Z-translation (pop out) on hover
  const translateZ = useSpring(hovered ? 20 : 0, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates for tilt (-0.5 to 0.5)
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    
    // Absolute coordinates for glare
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <ScrollReveal delay={0.08 * index} direction="up">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={reduced ? {} : { rotateX, rotateY, z: translateZ, transformStyle: "preserve-3d" }}
        className="relative group perspective-[1000px]"
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute -inset-px rounded-2xl pointer-events-none z-0"
          animate={{
            boxShadow: hovered
              ? `0 0 0 1px ${visual.accentColor}50, 0 0 30px ${visual.glowColor}, 0 20px 60px rgba(0,0,0,0.5)`
              : `0 0 0 1px rgba(255,255,255,0.07), 0 4px 20px rgba(0,0,0,0.3)`,
          }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        />

        {/* Card body */}
        <div
          className="relative z-10 rounded-2xl overflow-hidden h-full"
          style={{
            background: "rgba(10,10,18,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Dynamic Glare Overlay */}
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none rounded-2xl mix-blend-overlay"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([mx, my]) =>
                  `radial-gradient(600px circle at ${mx}px ${my}px, rgba(255,255,255,0.15), transparent 40%)`
              ),
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* Visual header area */}
          <div
            className="relative h-44 overflow-hidden flex items-center justify-center"
            style={{ background: visual.gradient, backgroundImage: visual.bgPattern }}
          >
            {/* Animated glow orb */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ background: visual.glowColor, width: 180, height: 180, filter: "blur(50px)" }}
              animate={hovered ? { scale: 1.4, opacity: 0.7 } : { scale: 1, opacity: 0.35 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            />

            {/* Project number + icon */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <motion.span
                className="text-5xl"
                animate={hovered ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                {visual.icon}
              </motion.span>
              <span
                className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{
                  color: visual.accentColor,
                  background: `${visual.accentColor}18`,
                  border: `1px solid ${visual.accentColor}30`,
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Project number watermark */}
            <span
              className="absolute top-3 left-4 text-6xl font-black select-none pointer-events-none"
              style={{ color: "rgba(255,255,255,0.05)", lineHeight: 1 }}
              aria-hidden="true"
            >
              {project.number}
            </span>

            {/* External link icon top-right */}
            <div className="absolute top-3 right-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo`}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white/80 transition-colors"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Card content */}
          <div className="p-6">
            <h3
              className="text-lg font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors"
              style={{ color: hovered ? "#fff" : "#f0f0f5" }}
            >
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-lg font-mono text-gray-400"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target={project.githubUrl !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-gray-300 hover:text-white transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <GithubIcon size={13} aria-hidden="true" />
                  Code
                </a>
              )}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    background: `${visual.accentColor}18`,
                    border: `1px solid ${visual.accentColor}30`,
                    color: visual.accentColor,
                  }}
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  Live Demo
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-gray-600"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  In Development
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 50% 40% at 75% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <ScrollReveal>
              <SectionLabel>Featured Projects</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="mt-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Things I've{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  built
                </span>
                {" "}so far.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15} className="mt-3">
              <p className="text-gray-500 max-w-md">
                A collection of real-world projects that reflect my skills and passion.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <a
              href="https://github.com/godsayantanroy2005-boop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-gray-400 hover:text-white transition-all duration-200 group"
              style={{ border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <GithubIcon size={15} aria-hidden="true" />
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
            </a>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              visual={PROJECT_VISUALS[i % PROJECT_VISUALS.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
