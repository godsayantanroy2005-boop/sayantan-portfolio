import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Code2, BrainCircuit, PenTool, GitBranch, Cpu, TerminalSquare } from "lucide-react";

interface SkillNode {
  id: string;
  label: string;
  category: "Web" | "Core" | "AI" | "Design";
  x: number;
  y: number;
  description: string;
  icon: any;
}

const SKILL_NODES: SkillNode[] = [
  { id: "html", label: "HTML", category: "Web", x: 15, y: 25, description: "Semantic markup and structural foundation for web applications.", icon: Code2 },
  { id: "css", label: "CSS", category: "Web", x: 15, y: 55, description: "Modern styling, responsive layouts, and CSS animations.", icon: Code2 },
  { id: "js", label: "JavaScript", category: "Web", x: 30, y: 40, description: "Dynamic client-side scripting and core web logic.", icon: TerminalSquare },
  { id: "ts", label: "TypeScript", category: "Web", x: 45, y: 25, description: "Strict syntactical superset of JavaScript for scalable apps.", icon: TerminalSquare },
  { id: "react", label: "React", category: "Web", x: 45, y: 55, description: "Component-based UI development and state management.", icon: Code2 },
  { id: "node", label: "Node.js", category: "Web", x: 30, y: 70, description: "Server-side JavaScript runtime for backend services.", icon: Cpu },
  
  { id: "python", label: "Python", category: "Core", x: 65, y: 25, description: "High-level programming for data, AI, and scripting.", icon: TerminalSquare },
  { id: "cpp", label: "C++", category: "Core", x: 85, y: 20, description: "Performance-critical systems and object-oriented logic.", icon: TerminalSquare },
  { id: "java", label: "Java", category: "Core", x: 80, y: 40, description: "Enterprise application development and object-oriented core.", icon: TerminalSquare },
  
  { id: "ml", label: "Machine Learning", category: "AI", x: 65, y: 55, description: "Training models, data analysis, and predictive algorithms.", icon: BrainCircuit },
  { id: "ai", label: "Artificial Intelligence", category: "AI", x: 80, y: 70, description: "Implementing intelligent systems and advanced logic.", icon: BrainCircuit },
  
  { id: "uiux", label: "UI/UX", category: "Design", x: 15, y: 85, description: "User interface design and user experience optimization.", icon: PenTool },
  { id: "design", label: "Graphic Design", category: "Design", x: 35, y: 90, description: "Visual communication and digital asset creation.", icon: PenTool },
  { id: "git", label: "Git & GitHub", category: "Core", x: 55, y: 80, description: "Version control and collaborative repository management.", icon: GitBranch },
];

const CONNECTIONS = [
  ["html", "css"], ["html", "js"], ["css", "js"],
  ["js", "ts"], ["js", "react"], ["js", "node"],
  ["ts", "react"],
  ["python", "ml"], ["ml", "ai"],
  ["python", "cpp"], ["cpp", "java"], ["python", "java"],
  ["uiux", "css"], ["uiux", "design"],
  ["node", "git"], ["react", "git"], ["python", "git"]
];

export function Skills() {
  const reduced = useReducedMotion();
  const [activeNode, setActiveNode] = useState<SkillNode | null>(null);

  return (
    <section id="skills" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionLabel>Skills & Expertise</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Interactive{" "}
              <span style={{
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Neural Network
              </span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              Select a node to explore my technical capabilities and how they connect.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* INTERACTIVE GRAPH */}
          <div className="w-full lg:w-2/3 h-[500px] md:h-[600px] relative rounded-2xl border border-white/5 bg-[#05050a] overflow-hidden">
            {/* SVG Connections - OPTIMIZED: standard lines instead of motion.lines to save GPU */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {CONNECTIONS.map(([idA, idB], idx) => {
                const a = SKILL_NODES.find(n => n.id === idA);
                const b = SKILL_NODES.find(n => n.id === idB);
                if (!a || !b) return null;
                
                const isActive = activeNode?.id === idA || activeNode?.id === idB;
                
                return (
                  <line
                    key={idx}
                    x1={`${a.x}%`} y1={`${a.y}%`}
                    x2={`${b.x}%`} y2={`${b.y}%`}
                    stroke={isActive ? "#38bdf8" : "rgba(255,255,255,0.08)"}
                    strokeWidth={isActive ? 2 : 1}
                    style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {SKILL_NODES.map((node) => {
              const isActive = activeNode?.id === node.id;
              const isConnected = activeNode ? CONNECTIONS.some(([a, b]) => (a === activeNode.id && b === node.id) || (b === activeNode.id && a === node.id)) : false;
              
              let bgColor = "#0f172a"; // solid colors to prevent backdrop blur lag
              let borderColor = "rgba(255,255,255,0.1)";
              let textColor = "text-gray-400";
              let zIndex = 10;

              if (isActive) {
                bgColor = "#0369a1";
                borderColor = "#38bdf8";
                textColor = "text-sky-100";
                zIndex = 30;
              } else if (isConnected) {
                bgColor = "#312e81";
                borderColor = "#818cf8";
                textColor = "text-indigo-200";
                zIndex = 20;
              }

              return (
                <div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex }}
                  onClick={() => setActiveNode(node)}
                >
                  <div className="flex flex-col items-center gap-2 group hover:scale-110 transition-transform">
                    <div 
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300 relative`}
                      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
                    >
                      <node.icon size={18} className={textColor} />
                      
                      {/* Active Ripple - only render if active */}
                      {isActive && !reduced && (
                        <motion.div
                          className="absolute inset-0 rounded-full border border-sky-400"
                          animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                    </div>
                    
                    <span 
                      className={`text-[10px] md:text-xs font-mono font-medium whitespace-nowrap px-2 py-0.5 rounded-md transition-colors ${textColor}`}
                      style={{ background: "#000" }}
                    >
                      {node.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DETAILS PANEL */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full rounded-2xl p-6 md:p-8 border border-sky-400/20 bg-[#0c4a6e]/50 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <activeNode.icon size={120} />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-center">
                    <span className="text-xs font-mono text-sky-400 mb-2 uppercase tracking-widest">
                      {activeNode.category} Node
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {activeNode.label}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {activeNode.description}
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <span className="text-[10px] text-sky-200/50 font-mono uppercase tracking-widest block mb-3">
                        Network Connections
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {CONNECTIONS.map(([a, b]) => {
                          if (a === activeNode.id) return SKILL_NODES.find(n => n.id === b)?.label;
                          if (b === activeNode.id) return SKILL_NODES.find(n => n.id === a)?.label;
                          return null;
                        }).filter(Boolean).map((label, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-[#0369a1] text-sky-100 border border-sky-400/30">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full rounded-2xl p-6 md:p-8 border border-white/5 bg-[#0f172a] flex items-center justify-center text-center"
                >
                  <div className="flex flex-col items-center gap-4 opacity-50">
                    <BrainCircuit size={48} className="text-gray-400" />
                    <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">
                      Awaiting Node Selection
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
