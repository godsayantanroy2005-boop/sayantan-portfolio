import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "E-Sports Champion",
    desc: "Multiple championship titles and trophies across competitive gaming tournaments.",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    icon: "🥇",
    title: "Tournament Winner",
    desc: "E-Sports Club Winner — competed and placed in multiple inter-college and open competitions.",
    accent: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
  },
  {
    icon: "🎖️",
    title: "Multiple Medals",
    desc: "Earned recognition across different game formats, demonstrating competitive consistency.",
    accent: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
  },
  {
    icon: "🎮",
    title: "Strategic Gaming",
    desc: "Leadership and teamwork under pressure — skills that translate directly into tech and problem-solving.",
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
  },
];

export function Achievements() {
  const reduced = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="py-24 md:py-32 relative overflow-hidden">
      {/* BG gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(245,158,11,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── LEFT: Content ── */}
          <div>
            <ScrollReveal>
              <SectionLabel>Achievements</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="mt-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Beyond the{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  keyboard.
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15} className="mt-4">
              <p className="text-gray-400 leading-relaxed max-w-md">
                Competitive gaming has taught me strategy, discipline, and performing under pressure —
                skills I bring directly into software development and AI research.
              </p>
            </ScrollReveal>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((a, i) => (
                <ScrollReveal key={a.title} delay={0.1 + i * 0.07}>
                  <div
                    className="p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-default"
                    style={{ background: a.bg, border: `1px solid ${a.border}` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0" aria-hidden="true">{a.icon}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-0.5">{a.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.45} className="mt-6">
              <p className="text-xs text-gray-600 font-mono italic">
                * Gaming achievements reflect discipline and competitive mindset, not the primary focus of this portfolio.
              </p>
            </ScrollReveal>
          </div>

          {/* ── RIGHT: Trophy Photo ── */}
          <div ref={imgRef} className="relative flex justify-center md:justify-end">
            <motion.div
              className="relative"
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 48, scale: 0.96 }}
              animate={imgInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow behind image */}
              <div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 80% at 50% 60%, rgba(245,158,11,0.15) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                aria-hidden="true"
              />

              {/* Frame decorations */}
              <div
                className="absolute -top-3 -right-3 w-10 h-10 pointer-events-none"
                style={{
                  borderTop: "2px solid rgba(245,158,11,0.5)",
                  borderRight: "2px solid rgba(245,158,11,0.5)",
                  borderRadius: "0 4px 0 0",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-3 -left-3 w-10 h-10 pointer-events-none"
                style={{
                  borderBottom: "2px solid rgba(245,158,11,0.5)",
                  borderLeft: "2px solid rgba(245,158,11,0.5)",
                  borderRadius: "0 0 0 4px",
                }}
                aria-hidden="true"
              />

              {/* Photo */}
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  border: "1px solid rgba(245,158,11,0.2)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6)",
                  maxWidth: 360,
                }}
              >
                <img
                  src="/images/achievements-trophy.jpg"
                  alt="Sayantan Roy with championship trophies and medals"
                  className="w-full h-auto object-cover block"
                  style={{ maxHeight: 480, objectPosition: "top center" }}
                  loading="lazy"
                  decoding="async"
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 55%, rgba(2,2,8,0.5) 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Badge overlay on image */}
                <div
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-center"
                >
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.3)",
                      backdropFilter: "blur(12px)",
                      color: "#fbbf24",
                    }}
                  >
                    🏆 E-Sports Champion
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
