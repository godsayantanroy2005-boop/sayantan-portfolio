import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { config } from "../data/config";
import { useReducedMotion } from "../hooks/useReducedMotion";

const TRAITS = ["Problem Solver", "Quick Learner", "Team Player", "Self Motivated"];

const STATS = [
  { value: "3+", label: "Projects\nCompleted" },
  { value: "1+", label: "Years of\nLearning" },
  { value: "100%", label: "Passion &\nDedication" },
];

export function About() {
  const reduced = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle bg gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Mobile label */}
        <div className="mb-6 md:hidden px-0">
          <SectionLabel>About Me</SectionLabel>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* ── LEFT: Photo ── */}
          <div
            ref={imgRef}
            className="relative flex justify-center md:justify-start order-2 md:order-1"
          >
            {/* Image container */}
            <motion.div
              className="relative"
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: -48, scale: 0.96 }}
              animate={imgInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow halo behind image */}
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)",
                  filter: "blur(24px)",
                }}
                aria-hidden="true"
              />

              {/* Decorative frame lines */}
              <div
                className="absolute -top-3 -left-3 w-10 h-10 pointer-events-none"
                style={{
                  borderTop: "2px solid rgba(99,102,241,0.5)",
                  borderLeft: "2px solid rgba(99,102,241,0.5)",
                  borderRadius: "4px 0 0 0",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-3 -right-3 w-10 h-10 pointer-events-none"
                style={{
                  borderBottom: "2px solid rgba(99,102,241,0.5)",
                  borderRight: "2px solid rgba(99,102,241,0.5)",
                  borderRadius: "0 0 4px 0",
                }}
                aria-hidden="true"
              />

              {/* The photo */}
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  border: "1px solid rgba(99,102,241,0.2)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.6)",
                  maxWidth: 380,
                }}
              >
                <img
                  src="/images/about-white-outfit.jpg"
                  alt="Sayantan Roy in white traditional outfit"
                  className="w-full h-auto object-cover block"
                  style={{ maxHeight: 460, objectPosition: "top center" }}
                  loading="lazy"
                  decoding="async"
                />
                {/* Subtle image overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(2,2,8,0.5) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Signature-style caption */}
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-xs font-mono text-indigo-400/50 tracking-widest uppercase">
                  Sayantan Roy
                </p>
              </div>
            </motion.div>

            {/* Stats row overlaid at bottom */}
            <motion.div
              className="absolute -bottom-4 left-4 right-4 hidden md:flex justify-around"
              initial={{ opacity: 0, y: 16 }}
              animate={imgInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            >
              {STATS.map((s) => (
                <div
                  key={s.value}
                  className="text-center px-4 py-2 rounded-xl"
                  style={{
                    background: "rgba(10,10,16,0.85)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] text-gray-500 font-mono whitespace-pre-line leading-tight mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="order-1 md:order-2 mt-0 md:mt-0 md:pb-10">
            <ScrollReveal>
              <SectionLabel className="hidden md:inline-flex">About Me</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="mt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Turning ideas into reality{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  through code.
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="mt-5">
              <p className="text-gray-300 leading-relaxed text-base">
                I am a CSE (AI) student at IEM Kolkata, passionate about Artificial Intelligence,
                Web Development and solving meaningful problems through technology.
                I love to learn, build and explore new technologies that make a difference.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="mt-3">
              <p className="text-gray-500 leading-relaxed text-sm">
                {config.bio}
              </p>
            </ScrollReveal>

            {/* Trait pills */}
            <ScrollReveal delay={0.25} className="mt-6">
              <div className="flex flex-wrap gap-2">
                {TRAITS.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full text-indigo-300"
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.22)",
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-400" aria-hidden="true" />
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Know more link */}
            <ScrollReveal delay={0.3} className="mt-8">
              <a
                href="#skills"
                onClick={(e) => { e.preventDefault(); document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-200 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                Know More About Me
                <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
              </a>
            </ScrollReveal>

            {/* Mobile stats */}
            <ScrollReveal delay={0.35} className="mt-8 flex md:hidden justify-start gap-6">
              {STATS.map((s) => (
                <div key={s.value} className="text-left">
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] text-gray-500 font-mono whitespace-pre-line leading-tight mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>

        {/* Education */}
        <div id="education" className="mt-28 md:mt-36">
          <ScrollReveal>
            <SectionLabel>Education</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-6">
            <div className="relative pl-7" style={{ borderLeft: "1px solid rgba(99,102,241,0.25)" }}>
              <div
                className="absolute -left-[5px] top-5 w-2.5 h-2.5 rounded-full bg-indigo-500"
                style={{ boxShadow: "0 0 12px rgba(99,102,241,0.6)" }}
                aria-hidden="true"
              />
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg leading-tight">
                      Institute of Engineering & Management
                    </h3>
                    <p className="text-indigo-400 font-mono text-sm mt-1">
                      B.Tech / B.E. — Computer Science & Engineering (Artificial Intelligence)
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Kolkata, India</p>
                  </div>
                  <span
                    className="shrink-0 self-start text-xs font-mono text-gray-500 px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {config.batch}
                  </span>
                </div>
              </div>
              <p className="mt-5 text-xs text-gray-700 font-mono">
                — Future certifications and education entries can be added here
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
