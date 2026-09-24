import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { currentlyLearning } from "../data/learning";
import { useReducedMotion } from "../hooks/useReducedMotion";
import React from "react";

function LearningCard({ item }: { item: any }) {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      className="group relative p-6 rounded-2xl transition-all duration-300 cursor-default overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      whileHover={reduced ? {} : {
        scale: 1.02,
        y: -4,
        borderColor: "rgba(99,102,241,0.4)",
        boxShadow: "0 10px 30px rgba(99,102,241,0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight glow effect */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Persistent Subtle background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <motion.div 
           className="text-3xl mb-4 origin-bottom-left" 
           aria-hidden="true"
           whileHover={reduced ? {} : { rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
           transition={{ duration: 0.5 }}
        >
          {item.icon}
        </motion.div>
        <h3 className="font-bold text-white text-lg mb-2 group-hover:text-indigo-300 transition-colors duration-300">
          {item.label}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function Learning() {
  return (
    <section id="learning" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto z-10">
        <ScrollReveal>
          <SectionLabel>Growth</SectionLabel>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="mt-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Currently exploring.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="mt-2">
          <p className="text-gray-500 max-w-lg">
            The areas I am actively diving into, building intuition for, and excited about.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentlyLearning.map((item, i) => (
            <ScrollReveal key={item.label} delay={0.1 + i * 0.08}>
              <LearningCard item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
