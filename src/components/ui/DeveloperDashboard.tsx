import { motion } from "framer-motion";
import { Terminal, Cpu, Code2, Globe2 } from "lucide-react";
import { projects } from "../../data/projects";
import { skillCategories } from "../../data/skills";
import type { SkillCategory } from "../../data/skills";

export function DeveloperDashboard() {
  const allSkillsCount = skillCategories.reduce((acc: number, category: SkillCategory) => acc + category.skills.length, 0);
  const liveProjectsCount = 3; // Hardcoded per user request (previously: projects.filter(p => p.liveUrl).length)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden mt-8 md:mt-12 backdrop-blur-xl group"
      style={{
        background: "rgba(10,10,15,0.6)",
        border: "1px solid rgba(56, 189, 248, 0.15)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(56,189,248,0.05)"
      }}
    >
      {/* Glare effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-white/[0.05] to-transparent pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-sky-400/10 bg-sky-950/20">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-sky-400" />
          <span className="text-xs font-mono text-sky-400/80 uppercase tracking-widest">System Status</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Online</span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-sky-400/10">
        <div className="bg-[#0a0a0f]/90 p-4 flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 font-mono uppercase">Developer</span>
          <span className="text-sm font-semibold text-gray-200">Sayantan Roy</span>
          <span className="text-xs text-sky-400/70 font-mono mt-1">ID: SYS-001</span>
        </div>

        <div className="bg-[#0a0a0f]/90 p-4 flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 font-mono uppercase">Focus</span>
          <span className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
            <Cpu size={14} className="text-violet-400" />
            AI / CSE
          </span>
          <span className="text-xs text-violet-400/70 font-mono mt-1">MODE: BUILDING</span>
        </div>

        <div className="bg-[#0a0a0f]/90 p-4 flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 font-mono uppercase">Database</span>
          <span className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
            <Code2 size={14} className="text-emerald-400" />
            {projects.length} Projects
          </span>
          <span className="text-xs text-emerald-400/70 font-mono mt-1">{allSkillsCount} Nodes Active</span>
        </div>

        <div className="bg-[#0a0a0f]/90 p-4 flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 font-mono uppercase">Network</span>
          <span className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
            <Globe2 size={14} className="text-amber-400" />
            {liveProjectsCount} Deployed
          </span>
          <span className="text-xs text-amber-400/70 font-mono mt-1">STATUS: STABLE</span>
        </div>
      </div>
      
      {/* Animated data stream at bottom */}
      <div className="h-1 w-full bg-sky-950/40 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent w-1/3"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
