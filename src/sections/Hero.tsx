import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Download, ArrowRight } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { config } from "../data/config";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { SocialSidebar, MobileSocialLinks } from "../components/ui/SocialSidebar";



import { DeveloperDashboard } from "../components/ui/DeveloperDashboard";

const WORDS = ["Developer.", "Builder.", "AI Enthusiast.", "Problem Solver."];

export function Hero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const imgX = useTransform(springX, [-1, 1], ["-12px", "12px"]);
  const imgY = useTransform(springY, [-1, 1], ["-8px", "8px"]);

  useEffect(() => {
    if (reduced) return;
    const handleMouse = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set((e.clientX / w - 0.5) * 2);
      mouseY.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [reduced, mouseX, mouseY]);

  // Typewriter word cycle
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 400);
    }, 2600);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Cinematic Background Photo ── */}
      <motion.div
        className="absolute inset-0 z-0 hero-photo"
        style={{ 
          x: imgX, 
          y: imgY, 
          scale: 1.06,
          WebkitMaskImage: "linear-gradient(105deg, transparent 0%, transparent 20%, rgba(0,0,0,0.4) 45%, black 75%)",
          maskImage: "linear-gradient(105deg, transparent 0%, transparent 20%, rgba(0,0,0,0.4) 45%, black 75%)"
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-red-shirt.jpg')",
            backgroundPosition: "center 20%",
            animation: reduced ? "none" : "kenBurns 22s ease-in-out infinite alternate",
            mixBlendMode: "luminosity",
            opacity: 0.8
          }}
        />
      </motion.div>

      {/* ── Layered Overlays ── */}
      {/* Subtle tint overlay instead of heavy solid gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, rgba(5,5,15,0.2) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, #020208 0%, transparent 100%)" }}
      />
      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 right-0 h-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(2,2,8,0.8) 0%, transparent 100%)" }}
      />

      {/* ── Ambient glow accents ── */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{
          top: "30%", left: "8%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <SocialSidebar />

      {/* ── Main Content ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          
          <div className="max-w-2xl w-full">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            {config.availableForOpportunities && (
              <Badge variant="available">Available for opportunities</Badge>
            )}
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="text-gray-300 text-xl font-light tracking-wide mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
          >
            <span className="text-white">SAYANTAN </span>
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #a78bfa, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ROY
            </span>
          </motion.h1>

          {/* Animated word cycle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-gray-400 text-base md:text-lg font-medium">CSE (AI) Student &</span>
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-base md:text-lg font-semibold text-indigo-300"
            >
              {WORDS[wordIndex]}
            </motion.span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-gray-400 text-base leading-relaxed max-w-lg mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6, ease: "easeOut" }}
          >
            I build modern, intelligent and impactful digital experiences
            that solve real-world problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
          >
            {/* Primary */}
            <motion.a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
              }}
              whileHover={reduced ? {} : { scale: 1.03, boxShadow: "0 6px 32px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <ArrowRight size={15} aria-hidden="true" />
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(12px)",
              }}
              whileHover={reduced ? {} : { scale: 1.03, background: "rgba(255,255,255,0.09)" }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.a>

            {/* Resume */}
            <motion.button
              onClick={() => window.dispatchEvent(new Event("open-resume"))}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              whileHover={reduced ? {} : { scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} aria-hidden="true" />
              Download CV
            </motion.button>
          </motion.div>

          <MobileSocialLinks />
          </div>

          <div className="w-full lg:w-[45%] xl:w-[40%]">
            <DeveloperDashboard />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-gray-600">Scroll</span>
        <motion.div
          animate={reduced ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-600"
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>

      {/* ── Ken Burns keyframes (injected inline) ── */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.08) translate(0px, 0px); }
          33%  { transform: scale(1.12) translate(-18px, -8px); }
          66%  { transform: scale(1.10) translate(12px, -12px); }
          100% { transform: scale(1.06) translate(-8px, 6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes kenBurns { 0%,100% { transform: scale(1.06) translate(0,0); } }
        }
      `}</style>
    </section>
  );
}
