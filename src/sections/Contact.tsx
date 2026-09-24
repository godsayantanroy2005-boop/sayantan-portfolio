import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, AlertCircle, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../components/ui/Icons";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import { SectionLabel } from "../components/ui/SectionLabel";
import { GlassCard } from "../components/ui/GlassCard";
import { config } from "../data/config";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    
    try {
      // Formspree Integration
      const response = await fetch("https://formspree.io/f/xvkgabnp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        }),
      });

      if (response.ok) {
        setState("success");
        setForm({ name: "", email: "", message: "" });
        // Reset success state after a few seconds
        setTimeout(() => setState("idle"), 4000);
      } else {
        setState("error");
      }
    } catch (error) {
      setState("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-600 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10";

  const contactLinks = [
    { icon: Mail, label: "Email", value: config.social.email, href: `mailto:${config.social.email}` },
    { icon: GithubIcon, label: "GitHub", value: `@godsayantanroy2005-boop`, href: config.social.github },
    { icon: LinkedinIcon, label: "LinkedIn", value: "Sayantan Roy", href: config.social.linkedin },
    { icon: InstagramIcon, label: "Instagram", value: "@i_am_invincible_6", href: config.social.instagram },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6 relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionLabel>Contact</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-4">
          <p className="text-gray-400 text-lg">Have an idea?</p>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="mt-2">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Let's build something
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #c4b5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              worth talking about.
            </span>
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Direct links */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="space-y-4">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 group relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  whileHover={{ 
                    scale: 1.03, 
                    x: 6,
                    borderColor: "rgba(99,102,241,0.4)",
                    backgroundColor: "rgba(99,102,241,0.08)"
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    className="p-3 rounded-xl shrink-0 relative z-10 transition-colors duration-300"
                    style={{ background: "rgba(99,102,241,0.1)" }}
                    whileHover={{ background: "rgba(99,102,241,0.25)", rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={20} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" aria-hidden="true" />
                  </motion.div>
                  <div className="relative z-10">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-0.5 group-hover:text-indigo-300 transition-colors">{label}</p>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors font-semibold">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.25} direction="left">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <GlassCard className="p-6">
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs text-gray-500 font-mono mb-1.5 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs text-gray-500 font-mono mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-xs text-gray-500 font-mono mb-1.5 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell me about your idea or project..."
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={state === "submitting" || state === "success"}
                    whileHover={state === "success" ? {} : { scale: 1.02, boxShadow: "0 8px 30px rgba(99,102,241,0.4)" }}
                    whileTap={state === "success" ? {} : { scale: 0.96 }}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-90 disabled:cursor-not-allowed group relative overflow-hidden"
                    style={{
                      background: state === "success" 
                        ? "linear-gradient(135deg, #059669, #10b981)" 
                        : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      boxShadow: state === "success" 
                        ? "0 4px 24px rgba(16,185,129,0.25)" 
                        : "0 4px 24px rgba(99,102,241,0.25)",
                    }}
                  >
                    {state === "success" ? (
                      <>
                        <CheckCircle size={16} aria-hidden="true" />
                        <span className="relative z-10">Message Sent Successfully!</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" aria-hidden="true" />
                        <span className="relative z-10">{state === "submitting" ? "Sending..." : "Send Message"}</span>
                      </>
                    )}
                  </motion.button>

                {state === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-3 text-xs text-red-400 font-mono"
                    role="alert"
                  >
                    <AlertCircle size={13} aria-hidden="true" />
                    Oops! Something went wrong. Please try again or use the direct links.
                  </motion.p>
                )}
              </form>
            </GlassCard>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
