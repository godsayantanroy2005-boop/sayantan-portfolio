import { type ReactNode, type CSSProperties } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  style?: CSSProperties;
}

export function GlassCard({ children, className = "", hover = false, glow = false, style }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative rounded-2xl border border-white/8 overflow-hidden
        ${hover ? "hover:border-white/14 transition-all duration-300 cursor-default" : ""}
        ${glow ? "hover:shadow-lg hover:shadow-indigo-600/10" : ""}
        ${className}
      `}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        ...style,
      }}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
