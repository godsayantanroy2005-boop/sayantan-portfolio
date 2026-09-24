import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./Icons";
import { config } from "../../data/config";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SOCIAL = [
  { href: config.social.github, icon: GithubIcon, label: "GitHub" },
  { href: config.social.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: config.social.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: `mailto:${config.social.email}`, icon: Mail, label: "Email" },
];

function MagneticIcon({ item, index, hoveredIndex, setHoveredIndex }: any) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 25 });
  const springY = useSpring(y, { stiffness: 400, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2); // max 2-4px movement
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div className="relative flex items-center" style={{ zIndex: isHovered ? 50 : 1 }}>
      <motion.a
        ref={ref}
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={item.label}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ x: springX, y: springY }}
        animate={{
          scale: isClicked ? 0.92 : isHovered ? 1.18 : 1,
          rotate: isHovered && !isClicked ? (index % 2 === 0 ? 3 : -3) : 0,
          y: isHovered && !isClicked ? -3 : 0,
          opacity: isOtherHovered ? 0.65 : 1,
        }}
        initial={{ y: 0 }}
        whileInView={reduced ? {} : {
          y: [0, index % 2 === 0 ? -4 : 4, 0],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative flex items-center justify-center p-3 rounded-xl transition-colors group"
      >
        {/* Hover glass bg */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={false}
          animate={{
            background: isHovered ? "rgba(99,102,241,0.15)" : "transparent",
            boxShadow: isHovered ? "0 0 20px rgba(99,102,241,0.4)" : "none",
            border: isHovered ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
          }}
          transition={{ duration: 0.2 }}
        />
        
        <item.icon
          size={18}
          className="relative z-10 transition-colors duration-200"
          style={{ color: isHovered ? "#fff" : "#9ca3af" }}
        />

        {/* Click ripple */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-indigo-400"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.a>

      {/* Label Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.92 }}
            animate={{ opacity: 1, x: 20, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.92, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute left-full flex items-center pointer-events-none whitespace-nowrap"
          >
            <div
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white tracking-wide"
              style={{
                background: "rgba(10,10,20,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(99,102,241,0.2)",
              }}
            >
              {item.label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SocialSidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.aside
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-px h-16 relative overflow-hidden bg-white/10">
        <motion.div
          className="absolute inset-0 bg-indigo-500"
          initial={{ y: "-100%" }}
          animate={{ y: hoveredIndex !== null ? "100%" : "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 10px #6366f1" }}
        />
      </div>
      
      {SOCIAL.map((item, i) => (
        <MagneticIcon
          key={item.label}
          item={item}
          index={i}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}

      <div className="w-px h-16 relative overflow-hidden bg-white/10">
        <motion.div
          className="absolute inset-0 bg-indigo-500"
          initial={{ y: "100%" }}
          animate={{ y: hoveredIndex !== null ? "-100%" : "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 10px #6366f1" }}
        />
      </div>
    </motion.aside>
  );
}
export function MobileSocialLinks() {
  return (
    <motion.div
      className="flex items-center gap-3 lg:hidden mt-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      {SOCIAL.map((item) => {
        const [isClicked, setIsClicked] = useState(false);
        const handleClick = () => {
          setIsClicked(true);
          setTimeout(() => setIsClicked(false), 300);
        };

        return (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={item.label}
            onClick={handleClick}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl transition-colors overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <item.icon size={18} className="relative z-10 text-gray-400" />
            <AnimatePresence>
              {isClicked && (
                <motion.div
                  className="absolute inset-0 bg-indigo-500/40"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
