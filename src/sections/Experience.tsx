import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "../components/animations/ScrollReveal";

const EXPERIENCES = [
  {
    icon: "🎓",
    date: "2024 — PRESENT",
    title: "B.TECH CSE (ARTIFICIAL INTELLIGENCE)",
    subtitle: "University Education",
    description: "Pursuing Computer Science Engineering with AI specialization. Building a strong foundation in Data Structures, Algorithms, Machine Learning, and Software Engineering.",
    tags: ["JAVA", "PYTHON", "DSA", "AI/ML"]
  },
  {
    icon: "💻",
    date: "2024",
    title: "FULL-STACK WEB DEVELOPMENT",
    subtitle: "Self-Driven Learning",
    description: "Mastered modern web technologies and built production-grade applications using React, Three.js, GSAP animations, and Node.js backend systems.",
    tags: ["REACT", "NODE.JS", "THREE.JS", "GSAP"]
  },
  {
    icon: "⚡",
    date: "2024",
    title: "IOT & EMBEDDED SYSTEMS",
    subtitle: "ShadeXFlow — Smart Window",
    description: "Engineered a real-world IoT automation system with ESP32 microcontroller, servo motor controls, rain detection sensors, and WebSocket real-time dashboard.",
    tags: ["ESP32", "C++", "WEBSOCKET", "IOT"]
  },
  {
    icon: "🤖",
    date: "2025",
    title: "AI & MOBILE APP DEVELOPMENT",
    subtitle: "AI Mind Map Generator",
    description: "Developed a cross-platform Flutter app leveraging Groq Vision AI and OCR to convert handwritten notes into structured, interactive mind maps.",
    tags: ["FLUTTER", "GROQ AI", "OCR", "FIREBASE"]
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full bg-[radial-gradient(ellipse,rgba(56,189,248,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto" ref={containerRef}>
        
        {/* HEADER */}
        <div className="text-center mb-20 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-mono text-sky-400 tracking-[0.3em] uppercase block mb-4">
              — MY JOURNEY
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 drop-shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="text-white">EX</span><span className="text-sky-400">PERIENCE</span>
            </h2>
            <div className="w-24 h-1 bg-sky-500 mx-auto rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
          </ScrollReveal>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          {/* Main vertical line (background) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
          
          {/* Main vertical line (active glow) */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-sky-500 -translate-x-1/2 origin-top shadow-[0_0_15px_#38bdf8]"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-24">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full border border-sky-500/30 bg-[#0a0a0a] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(56,189,248,0.3)] group">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-sky-500"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="absolute text-xl group-hover:scale-125 transition-transform" style={{ textShadow: "0 0 10px rgba(56,189,248,0.5)" }}>
                      {exp.icon}
                    </span>
                  </div>

                  {/* Spacer for MD layouts */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content */}
                  <div className="w-full md:w-1/2 pl-20 md:pl-0">
                    <ScrollReveal delay={0.2} className={`md:px-12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="relative p-6 md:p-8 rounded-2xl bg-[#0a0a0f]/95 border border-white/5 hover:border-sky-500/30 transition-all duration-300 shadow-xl group overflow-hidden"
                      >
                        {/* Red Edge Glow on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-transparent to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-sky-500/5 transition-opacity" />
                        
                        <div className={`flex flex-col ${isEven ? 'md:items-end' : 'items-start'} mb-6 relative z-10`}>
                          <span className="inline-block px-3 py-1 mb-4 text-[10px] font-mono font-bold tracking-widest text-sky-400 border border-sky-500/20 rounded-full bg-sky-500/5">
                            {exp.date}
                          </span>
                          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase mb-1">
                            {exp.title}
                          </h3>
                          <span className="text-sm font-medium text-gray-500">
                            {exp.subtitle}
                          </span>
                        </div>

                        <p className={`text-gray-400 text-sm md:text-base leading-relaxed mb-6 relative z-10 ${isEven ? 'md:text-right' : 'text-left'}`}>
                          {exp.description}
                        </p>

                        <div className={`flex flex-wrap gap-2 relative z-10 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          {exp.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

