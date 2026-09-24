import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ADOBE_TOOLS = [
  {
    name: "Adobe Photoshop",
    category: "PHOTO MANIPULATION / GRAPHIC DESIGN",
    description: "Advanced photo manipulation, compositing, graphic design and visual creation.",
    color: "#31A8FF",
    bg: "#001E36",
    symbol: "Ps"
  },
  {
    name: "Adobe After Effects",
    category: "MOTION GRAPHICS / VFX",
    description: "Motion graphics, visual effects, animation and cinematic compositions.",
    color: "#9999FF",
    bg: "#00005B",
    symbol: "Ae"
  },
  {
    name: "Adobe Illustrator",
    category: "VECTOR DESIGN / BRANDING",
    description: "Vector artwork, logos, illustrations, typography and branding systems.",
    color: "#FF9A00",
    bg: "#330000",
    symbol: "Ai"
  },
  {
    name: "Adobe Firefly",
    category: "GENERATIVE AI / CREATIVE AI",
    description: "AI-assisted image generation, creative exploration and visual ideation.",
    color: "#FF4F00",
    bg: "linear-gradient(135deg, #E60000, #FF7C00)",
    symbol: "Fi",
    isGradient: true
  },
  {
    name: "Adobe Creative Cloud",
    category: "CREATIVE WORKFLOW",
    description: "Integrated creative workflow across professional Adobe applications.",
    color: "#EAA9FF",
    bg: "linear-gradient(135deg, #FF0000, #EAA9FF, #31A8FF)",
    symbol: "Cc",
    isGradient: true
  },
  {
    name: "Adobe InDesign",
    category: "LAYOUT / PUBLICATION",
    description: "Professional layouts, typography, brochures, documents and publication design.",
    color: "#FF3366",
    bg: "#49021F",
    symbol: "Id"
  },
  {
    name: "Adobe Premiere Pro",
    category: "VIDEO EDITING / STORYTELLING",
    description: "Video editing, transitions, cinematic sequences, sound synchronization and storytelling.",
    color: "#9999FF",
    bg: "#00005B",
    symbol: "Pr"
  },
  {
    name: "Adobe Acrobat",
    category: "DOCUMENT / PDF DESIGN",
    description: "Professional PDF creation, document formatting, presentation and digital documents.",
    color: "#FF0000",
    bg: "#4A0000",
    symbol: "Ac"
  },
  {
    name: "Adobe Lightroom",
    category: "PHOTO EDITING / COLOR",
    description: "Professional photo editing, color correction, grading and visual enhancement.",
    color: "#31A8FF",
    bg: "#001E36",
    symbol: "Lr"
  }
];

function ToolCard({ tool, index, hoveredIndex, setHoveredIndex }: any) {
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
  const num = (index + 1).toString().padStart(2, "0");

  const bgTemplate = useMotionTemplate`radial-gradient(400px circle at ${rawMouseX}px ${rawMouseY}px, ${tool.color}15, transparent 60%)`;

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
        boxShadow: isHovered ? `0 20px 40px -20px ${tool.color}40, 0 0 15px ${tool.color}20` : "0 4px 20px rgba(0,0,0,0.2)",
        borderColor: isHovered ? `${tool.color}40` : "rgba(255,255,255,0.05)"
      }}
      animate={{
        scale: isHovered && !reducedMotion && !isMobile ? 1.03 : 1,
        opacity: isDimmed ? 0.4 : 1,
        y: isHovered && !reducedMotion && !isMobile ? -5 : 0
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative p-6 rounded-2xl bg-[#0a0a0f]/95 border flex flex-col h-full min-h-[300px] group transition-colors duration-500 overflow-hidden cursor-pointer"
    >
      {/* Radial cursor light inside card */}
      {!reducedMotion && !isMobile && isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-500"
          style={{
            background: bgTemplate
          }}
        />
      )}

      {/* Top Header */}
      <div className="flex justify-between items-start z-10 mb-6">
        <motion.div 
          className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl tracking-tighter shadow-lg relative border border-white/5"
          style={{ 
            background: tool.bg, 
            color: tool.isGradient ? "white" : tool.color 
          }}
          animate={{
            scale: isHovered && !reducedMotion && !isMobile ? 1.08 : 1,
            rotate: isHovered && !reducedMotion && !isMobile ? (index % 2 === 0 ? 3 : -3) : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {tool.symbol}
          {tool.symbol === "Fi" && (
            <Sparkles className="absolute top-2 right-2 w-3 h-3 text-white opacity-90" />
          )}
        </motion.div>
        
        <span className="text-[10px] font-mono tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
          {num} / 09
        </span>
      </div>

      {/* Title & Category */}
      <div className="z-10 mb-2">
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" style={{ backgroundImage: isHovered ? `linear-gradient(to right, #fff, ${tool.color})` : 'none' }}>
          {tool.name}
        </h3>
        <p className="text-[10px] font-mono font-semibold tracking-widest mt-1 opacity-60" style={{ color: tool.color }}>
          {tool.category}
        </p>
      </div>

      {/* Description & Explore */}
      <div className="z-10 relative flex-1 flex flex-col justify-end">
        <motion.p 
          className="text-sm text-gray-400 leading-relaxed"
          animate={{ y: isHovered ? -20 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {tool.description}
        </motion.p>

        {/* Explore Button - Slides up and fades in */}
        <motion.div
          className="absolute bottom-0 left-0 flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered || isMobile ? 1 : 0, 
            y: isHovered || isMobile ? 0 : 10 
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{ color: tool.color }}
        >
          <span className="text-sm font-bold tracking-widest uppercase">Explore</span>
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Active Indicator (Absolute top right or bottom right depending on preference, moving to absolute top-right for space, wait prompt says bottom) */}
      <motion.div 
        className="absolute bottom-6 right-6 flex items-center gap-2 z-10"
        animate={{ opacity: isHovered || isMobile ? 1 : 0.3 }}
      >
        <span className="relative flex h-2 w-2">
          {(isHovered || isMobile) && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: tool.color }} />
          )}
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: tool.color }} />
        </span>
        <span className="text-[9px] font-mono tracking-widest uppercase text-white/40 hidden md:block">
          {isHovered ? "Active Tool" : "Creative Tool"}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function CreativeTools() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="creative-tools" className="py-24 md:py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal>
            <SectionLabel>Creative Workflow / 09 Tools</SectionLabel>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} className="mt-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
              EDITING & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">CREATIVE TOOLS</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-sm font-mono tracking-widest text-indigo-400 mb-4 uppercase">
              Design • Motion • Visuals • AI
            </p>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              I craft visuals, motion, graphics and digital experiences using a professional creative workflow.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADOBE_TOOLS.map((tool, index) => (
            <ScrollReveal key={tool.name} delay={0.1 + (index * 0.05)}>
              <ToolCard 
                tool={tool} 
                index={index} 
                hoveredIndex={hoveredIndex} 
                setHoveredIndex={setHoveredIndex} 
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="mt-24 text-center">
          <p className="text-[11px] md:text-xs font-mono font-bold tracking-[0.3em] text-white/40 mb-8">
            TOOLS ARE JUST THE MEDIUM. CREATIVITY IS THE SKILL.
          </p>
          <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent mx-auto" />
        </ScrollReveal>
      </div>
    </section>
  );
}




