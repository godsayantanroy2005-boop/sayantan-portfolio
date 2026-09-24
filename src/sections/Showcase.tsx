import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { ArrowRight, Code, BrainCircuit, Layout } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { projects } from "../data/projects";

const SHOWCASE_DATA = [
  {
    title: "ALGORITHM DESIGN",
    description: "Show my programming, algorithmic thinking and problem-solving work.",
    tags: ["LOGIC", "DATA STRUCTURES", "C++"],
    project: projects.find(p => p.title === "AlgoForge"),
    icon: Code,
    desktopRotation: -2,
    gradient: "linear-gradient(to bottom right, #05070D, #0f172a)"
  },
  {
    title: "AI INTEGRATION",
    description: "Showcase my Artificial Intelligence and AI-powered development work.",
    tags: ["AI", "ML", "AUTOMATION"],
    project: projects.find(p => p.title === "SmartVision AI"),
    icon: BrainCircuit,
    desktopRotation: 0,
    gradient: "linear-gradient(to bottom right, #05070D, #080B12)"
  },
  {
    title: "USER EXPERIENCE",
    description: "Showcase my frontend, UI/UX and interactive web development work.",
    tags: ["UI", "UX", "INTERACTION"],
    project: projects.find(p => p.title === "DevVault"),
    icon: Layout,
    desktopRotation: 2,
    gradient: "linear-gradient(to bottom right, #05070D, #1e1b4b)" // Very subtle violet tint in dark
  }
];

function ShowcaseCard({ data, index }: { data: typeof SHOWCASE_DATA[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    // Only apply on desktop
    if (window.innerWidth < 768) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const initialRotate = reduced || isMobile ? 0 : data.desktopRotation;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateZ: 0 }}
      animate={inView ? { opacity: 1, y: 0, rotateZ: initialRotate } : {}}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: reduced || isMobile ? 0 : rotateX,
        rotateY: reduced || isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full h-[450px] md:h-[600px] flex-1 max-w-sm mx-auto rounded-xl bg-[#05070D] border border-[#2563FF]/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:z-30 cursor-pointer"
    >
      {/* Top Holographic Tape Label */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-4 bg-white/5 border border-white/10 rounded-sm z-30 shadow-[0_2px_10px_rgba(37,99,255,0.2)] flex items-center justify-center overflow-hidden">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D9FF]/50 to-transparent" />
      </div>

      {/* Electric Blue -> Cyan Corner Triangle */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl z-20 pointer-events-none">
        <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#2563FF] to-[#00D9FF] rotate-45 opacity-80 shadow-[0_0_15px_rgba(0,217,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,217,255,0.8)] transition-all duration-500 group-hover:scale-110" />
      </div>

      {/* Image / Placeholder Area */}
      <div className="absolute inset-0 overflow-hidden rounded-xl bg-[#030408]">
        {/* We use a stylized background since we don't have real image assets */}
        <motion.div 
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ background: data.gradient }}
        >
          {/* Subtle noise/grain overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <data.icon size={120} className="text-[#00D9FF]" />
          </div>
          
          {/* Dark gradient overlay (Vignette & bottom shadow) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030408] via-transparent to-transparent opacity-90" />
        </motion.div>
      </div>

      {/* Glass Light Reflection on Hover */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 rounded-xl"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([mx, my]) => `radial-gradient(circle at ${(mx as number + 0.5) * 100}% ${(my as number + 0.5) * 100}%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)`
            )
          }}
        />
      )}

      {/* Content Container (Bottom Aligned) */}
      <div 
        className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end"
        style={{ transform: "translateZ(30px)" }} // 3D Pop out effect
      >
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono tracking-widest text-[#94A3B8]">
          <span>0{index + 1} // {data.tags.join(" / ")}</span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:text-shadow-[0_0_15px_rgba(37,99,255,0.4)] transition-all">
          {data.title}
        </h3>
        
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Action Link (if project exists) */}
        {data.project && (
          <a 
            href={data.project.githubUrl || data.project.liveUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#00D9FF] hover:text-white transition-colors"
          >
            VIEW PROJECT <ArrowRight size={14} />
          </a>
        )}
      </div>

      {/* Glowing border accent on hover */}
      <div className="absolute inset-0 rounded-xl border border-[#00D9FF]/0 group-hover:border-[#00D9FF]/30 transition-colors duration-500 z-10 pointer-events-none" />
    </motion.div>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="py-24 md:py-32 px-6 relative z-10 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(37,99,255,0.03)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto flex flex-col items-center">
        
        {/* HEADER */}
        <div className="text-center mb-16 md:mb-24 relative z-10">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 drop-shadow-[0_0_15px_rgba(37,99,255,0.15)]">
              <span className="text-white">SHOW</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563FF] to-[#00D9FF]">CASE</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#2563FF] to-[#00D9FF] mx-auto rounded-full shadow-[0_0_10px_rgba(0,217,255,0.5)]" />
          </ScrollReveal>
        </div>

        {/* CARDS DISPLAY */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8 w-full z-10">
          {SHOWCASE_DATA.map((item, idx) => (
            <ShowcaseCard key={item.title} data={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
