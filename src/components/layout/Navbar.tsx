import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useScrollY } from "../../hooks/useScrollY";
import { config } from "../../data/config";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Showcase", href: "#showcase" },
  { label: "Projects", href: "#projects" },
  { label: "Games", href: "#games" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const scrolled = scrollY > 60;

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) setMobileOpen(false);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.nav
          aria-label="Main navigation"
          className="w-full max-w-5xl flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500"
          style={{
            background: scrolled ? "rgba(6,6,16,0.88)" : "rgba(6,6,16,0.45)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.06)",
            boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-sm font-bold tracking-tight text-white select-none hover:text-indigo-300 transition-colors font-mono"
          >
            {config.shortName}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href} className="relative group">
                  <motion.a
                    href={link.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative flex items-center justify-center px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Hover pill background */}
                    <div className="absolute inset-0 rounded-lg bg-sky-400/10 border border-sky-400/0 group-hover:border-sky-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]" />

                    {/* Active pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg z-0"
                        style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.25)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 35 }}
                      />
                    )}
                  </motion.a>
                </li>
              );
            })}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => window.dispatchEvent(new Event("open-resume"))}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full text-white transition-shadow duration-300 overflow-hidden relative group"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                boxShadow: "0 2px 12px rgba(99,102,241,0.3)",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                 className="absolute inset-0 bg-white/20"
                 initial={{ x: "-100%" }}
                 whileHover={{ x: "100%" }}
                 transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              <Download size={13} className="relative z-10 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              <span className="relative z-10">Download CV</span>
            </motion.button>

            <button
              className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 px-4"
            style={{ background: "rgba(4,4,12,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-0.5" role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center px-4 py-4 text-lg font-semibold text-gray-300 hover:text-white hover:bg-sky-400/10 hover:pl-6 border-b border-white/5 transition-all duration-300"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 px-4 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="flex items-center justify-center w-full px-6 py-4 text-base font-semibold rounded-2xl text-white transition-all"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                >
                  Let's Talk →
                </a>
                <button
                  onClick={() => { setMobileOpen(false); window.dispatchEvent(new Event("open-resume")); }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-medium rounded-2xl text-gray-300 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Download size={15} aria-hidden="true" />
                  Download CV
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
