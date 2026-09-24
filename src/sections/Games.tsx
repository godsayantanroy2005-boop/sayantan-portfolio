import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { gameSeries } from "../data/games";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { X, FolderHeart, Gamepad2, Trophy, BookOpen } from "lucide-react";

function GameCard({ game, index }: { game: any; index: number }) {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const imageExt = game.ext || "jpg";
  const imageSrc = `/images/games/${game.id}.${imageExt}`;

  return (
    <motion.div
      className="group relative p-5 rounded-2xl transition-all duration-300 overflow-hidden flex flex-col h-full bg-white/5 border border-white/10"
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={reduced ? {} : { y: -4, scale: 1.02, borderColor: "rgba(99,102,241,0.4)" }}
      onMouseMove={handleMouseMove}
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(99,102,241,0.12), transparent 40%)`,
          }}
        />
      )}

      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-[10px] font-bold uppercase tracking-wider">
        <Trophy size={12} className="text-green-400" />
        <span>100%</span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="w-full h-32 mb-5 flex items-center justify-center rounded-xl bg-black/40 p-2 overflow-hidden group-hover:bg-black/60 transition-colors">
          <motion.img 
            src={imageSrc} 
            alt={`${game.name} logo`}
            className="max-h-full max-w-full object-contain filter drop-shadow-md mix-blend-screen brightness-110 blend-image"
            whileHover={reduced ? {} : { scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            loading="lazy"
          />
        </div>
        
        <h3 className="text-white font-bold text-xl mb-1.5 group-hover:text-indigo-300 transition-colors">
          {game.name}
        </h3>
        <p className="text-xs font-mono text-indigo-400/80 mb-3 uppercase tracking-wider">{game.platform}</p>
        <p className="text-sm text-gray-400 leading-relaxed mt-auto">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Games() {
  const [selectedSeries, setSelectedSeries] = useState<any | null>(null);
  const reduced = useReducedMotion();

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedSeries) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedSeries]);

  const renderIcon = (icon: string) => {
    if (icon === "BookGamepad") {
      return (
        <div className="flex items-center justify-center relative w-20 h-16">
          <BookOpen size={48} className="text-white absolute -left-2 top-0" strokeWidth={1.5} />
          <Gamepad2 size={36} className="text-white absolute -right-2 bottom-0" strokeWidth={1.5} />
        </div>
      );
    }
    return <Gamepad2 size={64} className="text-white" strokeWidth={1.5} />;
  };

  const renderHeaderIcon = (icon: string) => {
    if (icon === "BookGamepad") {
      return (
        <div className="flex items-center justify-center relative w-16 h-12 mr-2">
          <BookOpen size={36} className="text-white absolute -left-2 top-0" strokeWidth={1.5} />
          <Gamepad2 size={28} className="text-white absolute right-0 bottom-0" strokeWidth={1.5} />
        </div>
      );
    }
    return <Gamepad2 size={48} className="text-white" strokeWidth={1.5} />;
  };

  return (
    <section id="games" className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto z-10">
        <div className="mb-14">
          <ScrollReveal>
            <SectionLabel>Milestones</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Lifetime Gaming Milestones
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="mt-3">
            <p className="text-gray-500 max-w-xl text-lg">
              A tribute to the iconic gaming franchises I've mastered and my competitive esports journey. Select a folder to view all achievements.
            </p>
          </ScrollReveal>
        </div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameSeries.map((series, i) => (
            <ScrollReveal key={series.id} delay={0.1 + (i % 3) * 0.1}>
              <motion.div
                layoutId={`series-container-${series.id}`}
                onClick={() => setSelectedSeries(series)}
                className="group cursor-pointer relative p-8 rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center border border-white/10 h-64"
                style={{
                  background: "linear-gradient(135deg, rgba(30,30,40,0.4) 0%, rgba(15,15,20,0.8) 100%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                }}
                whileHover={reduced ? {} : { y: -8, scale: 1.02, borderColor: "rgba(99,102,241,0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glowing Background effect on hover */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
                />
                
                <FolderHeart size={32} className="absolute top-6 left-6 text-indigo-500/30 group-hover:text-indigo-400 transition-colors" />
                
                {/* Dynamic Logo Rendering */}
                {series.logoText ? (
                  <motion.h3 
                    layoutId={`series-title-${series.id}`}
                    className="text-6xl font-black italic tracking-tighter text-transparent bg-clip-text mb-4 mt-2"
                    style={{
                      backgroundImage: "linear-gradient(to right, #fff, #a78bfa)",
                      WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                      textShadow: "0 0 20px rgba(167,139,250,0.4)"
                    }}
                  >
                    {series.logoText}
                  </motion.h3>
                ) : (
                  <motion.div
                     layoutId={`series-title-${series.id}`}
                     className="mb-4 mt-2 text-transparent bg-clip-text flex items-center justify-center"
                     style={{
                       color: "#fff",
                       filter: "drop-shadow(0 0 15px rgba(167,139,250,0.6))"
                     }}
                  >
                    {renderIcon(series.icon || "")}
                  </motion.div>
                )}
                
                <p className="text-sm font-semibold text-gray-300 transition-colors relative z-10 mt-2">
                  {series.title}
                </p>
                <div className="absolute bottom-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-2 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition-all">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  {series.games.length} Titles Inside
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Series Details Modal */}
      <AnimatePresence>
        {selectedSeries && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSeries(null)}
            />
            
            <motion.div
              layoutId={`series-container-${selectedSeries.id}`}
              className="relative w-full max-w-6xl h-full max-h-[90vh] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(20,20,25,1) 0%, rgba(10,10,12,1) 100%)",
              }}
            >
              {/* Header */}
              <div className="sticky top-0 z-30 flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 border-b border-white/10 bg-black/50 backdrop-blur-xl gap-4">
                <div className="flex items-center gap-4">
                  {selectedSeries.logoText ? (
                    <motion.h3 
                      layoutId={`series-title-${selectedSeries.id}`}
                      className="text-4xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text"
                      style={{
                        backgroundImage: "linear-gradient(to right, #fff, #a78bfa)",
                        WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                        textShadow: "0 0 20px rgba(167,139,250,0.4)"
                      }}
                    >
                      {selectedSeries.logoText}
                    </motion.h3>
                  ) : (
                    <motion.div
                      layoutId={`series-title-${selectedSeries.id}`}
                      style={{ filter: "drop-shadow(0 0 15px rgba(167,139,250,0.6))" }}
                    >
                      {renderHeaderIcon(selectedSeries.icon || "")}
                    </motion.div>
                  )}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{selectedSeries.title}</h4>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-400 text-xs sm:text-sm max-w-xl"
                    >
                      {selectedSeries.description}
                    </motion.p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSeries(null)}
                  className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors shrink-0"
                  aria-label="Close folder"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Games Grid inside Modal */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {selectedSeries.games.map((game: any, index: number) => (
                    <GameCard key={game.id} game={game} index={index} />
                  ))}
                </div>
                
                {/* 100% Completion Badge at bottom */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-12 flex flex-col items-center justify-center p-8 rounded-2xl bg-indigo-500/5 border border-indigo-500/20"
                >
                  <Trophy size={40} className="text-indigo-400 mb-3" />
                  <h4 className="text-xl font-bold text-white mb-1">Milestone Mastered</h4>
                  <p className="text-gray-400 text-center text-sm">All achievements in this folder successfully secured.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
