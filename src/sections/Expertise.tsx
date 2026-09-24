import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Terminal, Globe, Wrench, BarChart2, ArrowRight } from "lucide-react";

// ==========================================
// TECH LOGOS COMPONENT
// ==========================================
const TechLogo = ({ name }: { name: string }) => {
  switch (name) {
    case "Java":
      return (
        <div className="w-5 h-5 flex items-center justify-center text-orange-500">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
        </div>
      );
    case "Python":
      return (
        <div className="w-5 h-5 flex items-center justify-center text-yellow-400">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.062 0c-5.836 0-5.59 2.535-5.59 2.535v2.66h5.717v.804H6.262s-2.88 0-2.88 2.766c0 2.768 2.88 2.768 2.88 2.768h1.282v-3.023s0-1.84 1.745-1.84h4.745s1.614 0 1.614-1.572V1.597S15.65 0 12.06 0zm-1.637 1.69c.47 0 .848.375.848.847 0 .47-.38.847-.85.847a.848.848 0 0 1-.848-.847c0-.473.38-.848.85-.848zM18.06 9.38s-1.284 0-1.284 3.024v3.022H12.03s-1.614 0-1.614 1.572v3.528s0 2.534 5.59 2.534c5.59 0 5.835-2.534 5.835-2.534v-2.66h-5.716v-.804h5.927s2.88 0 2.88-2.767c0-2.767-2.88-2.767-2.88-2.767h-1.28v3.023s0 1.84-1.746 1.84H13.88s-1.615 0-1.615-1.84v-3.328s0-1.57 1.615-1.57h5.88s1.614 0 1.614-1.57V11.9s-.246-2.53-5.59-2.53zm2.086 11.23c-.47 0-.848-.376-.848-.848 0-.472.38-.85.848-.85.47 0 .85.378.85.85 0 .472-.38.847-.85.847z"/></svg>
        </div>
      );
    case "C / C++":
      return (
        <div className="w-5 h-5 bg-[#00599C] text-white font-bold text-[9px] rounded-sm flex items-center justify-center shadow-sm">
          C++
        </div>
      );
    case "HTML / CSS / JS":
      return (
        <div className="w-5 h-5 flex items-center justify-center space-x-[1px]">
          <div className="w-[6px] h-full bg-[#E34F26] rounded-[1px]" />
          <div className="w-[6px] h-full bg-[#1572B6] rounded-[1px]" />
          <div className="w-[6px] h-full bg-[#F7DF1E] rounded-[1px]" />
        </div>
      );
    case "React / Tailwind":
      return (
        <div className="w-5 h-5 flex items-center justify-center text-cyan-400">
          <svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="2" fill="none" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
        </div>
      );
    case "Node.js":
      return (
        <div className="w-5 h-5 flex items-center justify-center text-[#339933] font-bold text-[14px]">
          ⬢
        </div>
      );
    case "Git / GitHub":
      return (
        <div className="w-5 h-5 flex items-center justify-center text-white">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </div>
      );
    case "Three.js / GSAP":
      return (
        <div className="w-5 h-5 flex items-center justify-center text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 22 20 2 20" /><polygon points="12 12 17 20 7 20" /></svg>
        </div>
      );
    case "Firebase":
      return (
        <div className="w-5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 24 24"><path fill="#FFCA28" d="M11.69 1.49l-3.32 6.43-1.63-2.92a.45.45 0 0 0-.8 0L.14 23.51A.44.44 0 0 0 .54 24h22.92a.44.44 0 0 0 .39-.64L11.69 1.49z"/><path fill="#FFA000" d="M11.69 1.49l-3.32 6.43L23.85 23.36a.44.44 0 0 0 .39-.64L11.69 1.49z"/><path fill="#F57C00" d="M11.69 1.49l-3.32 6.43-1.63-2.92a.45.45 0 0 0-.8 0l-.39.7 6.14 6.14 3.32-6.43-3.32-3.92z"/></svg>
        </div>
      );
    case "Power BI":
      return (
        <div className="w-5 h-5 flex items-end space-x-[2px] pb-[2px] justify-center">
          <div className="w-[3px] h-[6px] bg-[#F2C811] rounded-sm" />
          <div className="w-[3px] h-[10px] bg-[#F2C811] rounded-sm" />
          <div className="w-[3px] h-[14px] bg-[#F2C811] rounded-sm" />
        </div>
      );
    case "Excel":
      return (
        <div className="w-5 h-5 bg-[#217346] text-white flex items-center justify-center text-[11px] font-bold rounded-sm shadow-sm">
          X
        </div>
      );
    case "R Programming":
      return (
        <div className="w-5 h-5 border-2 border-[#276DC3] text-[#276DC3] rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
          R
        </div>
      );
    default:
      return <div className="w-5 h-5 bg-white/10 rounded-full" />;
  }
};

// ==========================================
// DATA
// ==========================================
const EXPERTISE_DATA = [
  {
    num: "01",
    title: "PROGRAMMING",
    description: "Building logic-driven applications with modern programming languages.",
    icon: Terminal,
    color: "#0ea5e9", // sky-500
    skills: [
      { name: "Java", percent: 92 },
      { name: "Python", percent: 82 },
      { name: "C / C++", percent: 75 },
    ]
  },
  {
    num: "02",
    title: "WEB DEVELOPMENT",
    description: "Designing responsive, interactive and modern digital experiences.",
    icon: Globe,
    color: "#3b82f6", // blue-500
    skills: [
      { name: "HTML / CSS / JS", percent: 96 },
      { name: "React / Tailwind", percent: 88 },
      { name: "Node.js", percent: 78 },
    ]
  },
  {
    num: "03",
    title: "TOOLS & TECHNOLOGIES",
    description: "Working across development tools, frameworks, databases and creative workflows.",
    icon: Wrench,
    color: "#6366f1", // indigo-500
    skills: [
      { name: "Git / GitHub", percent: 88 },
      { name: "Three.js / GSAP", percent: 82 },
      { name: "Firebase", percent: 76 },
    ]
  },
  {
    num: "04",
    title: "DATA & ANALYTICS",
    description: "Turning data into meaningful insights and visual decisions.",
    icon: BarChart2,
    color: "#06b6d4", // cyan-500
    skills: [
      { name: "Power BI", percent: 88 },
      { name: "Excel", percent: 86 },
      { name: "R Programming", percent: 72 },
    ]
  }
];

// ==========================================
// TECH ROW COMPONENT
// ==========================================
function TechRow({ skill, color }: { skill: any, color: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.2 });
    
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={rowRef}
      className="relative flex flex-col gap-2 py-1 group/row cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ scale: isHovered ? 1.15 : 1, filter: isHovered ? `drop-shadow(0 0 8px ${color}60)` : "drop-shadow(0 0 0px transparent)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <TechLogo name={skill.name} />
          </motion.div>
          <motion.span 
            className="text-sm font-semibold text-gray-200"
            animate={{ x: isHovered ? 4 : 0, color: isHovered ? "#fff" : "#e5e7eb" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {skill.name}
          </motion.span>
        </div>
        <motion.span 
          className="text-sm font-mono font-bold"
          animate={{ color: isHovered ? color : "#9ca3af", scale: isHovered ? 1.05 : 1 }}
        >
          {inView ? <CounterTo value={skill.percent} /> : "0"}%
        </motion.span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-[#0a0a0f] rounded-full overflow-hidden border border-white/5 relative shadow-inner">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}40, ${color})` }}
          initial={{ width: "0%" }}
          animate={{ width: inView ? `${skill.percent}%` : "0%" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function CounterTo({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const totalDuration = 1200;
    const incrementTime = 20;
    const step = Math.ceil((end - start) / (totalDuration / incrementTime));
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}</>;
}

// ==========================================
// CARD COMPONENT
// ==========================================
function SkillCard({ data, index, hoveredIndex, setHoveredIndex }: any) {
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const bgTemplate = useMotionTemplate`radial-gradient(400px circle at ${rawMouseX}px ${rawMouseY}px, ${data.color}15, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || reducedMotion || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    
    mouseX.set((xPos / width) - 0.5);
    mouseY.set((yPos / height) - 0.5);
    rawMouseX.set(xPos);
    rawMouseY.set(yPos);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredIndex(index);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
    mouseX.set(0);
    mouseY.set(0);
  };

  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
  const Icon = data.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => isMobile && setIsHovered(!isHovered)}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        boxShadow: isHovered ? `0 20px 40px -20px ${data.color}40, 0 0 15px ${data.color}20` : "0 4px 20px rgba(0,0,0,0.2)",
        borderColor: isHovered ? `${data.color}50` : "rgba(255,255,255,0.05)"
      }}
      animate={{
        scale: isHovered && !reducedMotion && !isMobile ? 1.02 : 1,
        opacity: isDimmed ? 0.3 : 1,
        y: isHovered && !reducedMotion && !isMobile ? -5 : 0
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative p-8 rounded-3xl bg-[#0a0a0f]/95 border flex flex-col h-full group transition-colors duration-500 overflow-hidden cursor-default"
    >
      {/* Inner Hover Glow */}
      {!reducedMotion && !isMobile && isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-50 transition-opacity duration-500"
          style={{ background: bgTemplate }}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-start z-10 mb-6">
        <motion.div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 bg-[#0f1117] shadow-lg relative"
          animate={{
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered ? `0 0 20px ${data.color}40` : "0 0 0px transparent",
            borderColor: isHovered ? `${data.color}60` : "rgba(255,255,255,0.1)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className="w-7 h-7" style={{ color: isHovered ? data.color : "#9ca3af" }} />
          <motion.div 
            className="absolute inset-0 rounded-2xl opacity-0"
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            style={{ backgroundColor: data.color }}
          />
        </motion.div>
        
        <motion.span 
          className="text-2xl font-black tracking-tighter"
          animate={{ opacity: isHovered ? 0.8 : 0.15, color: isHovered ? data.color : "#ffffff" }}
          transition={{ duration: 0.3 }}
        >
          {data.num}
        </motion.span>
      </div>

      {/* Title & Description */}
      <div className="z-10 mb-8">
        <h3 className="text-2xl font-black text-white tracking-tight mb-2">
          {data.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed max-w-[90%]">
          {data.description}
        </p>
      </div>

      {/* Technologies List */}
      <div className="z-10 flex flex-col gap-5 mb-12">
        {data.skills.map((skill: any) => (
          <TechRow key={skill.name} skill={skill} color={data.color} />
        ))}
      </div>

      {/* Footer / Status */}
      <div className="z-10 mt-auto flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {(isHovered || isMobile) && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: data.color }} />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: data.color }} />
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
            {isHovered ? "Active Skillset" : "Current Toolkit"}
          </span>
        </div>

        <motion.div 
          className="flex items-center gap-1.5"
          animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : -5 }}
          style={{ color: data.color }}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">View Skills</span>
          <motion.div animate={{ x: isHovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 400 }}>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ==========================================
// MAIN SECTION
// ==========================================
export function Expertise() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="expertise" 
      className="py-24 md:py-32 px-6 relative z-10 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => setIsHoveringSection(false)}
    >
      {/* Section-wide cursor glow */}
      {!reducedMotion && isHoveringSection && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[-1] opacity-30 transition-opacity duration-1000"
          animate={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.08), transparent 60%)`
          }}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal>
            <SectionLabel>01 / Expertise</SectionLabel>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} className="mt-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              EXPERTISE
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-sm md:text-base font-mono tracking-[0.2em] text-cyan-400 mb-4 uppercase">
              Technology • Development • Data • Digital Craft
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {EXPERTISE_DATA.map((data, index) => (
            <ScrollReveal key={data.title} delay={0.1 + (index * 0.1)}>
              <SkillCard 
                data={data} 
                index={index} 
                hoveredIndex={hoveredIndex} 
                setHoveredIndex={setHoveredIndex} 
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
