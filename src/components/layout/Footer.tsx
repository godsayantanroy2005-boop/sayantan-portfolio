import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../ui/Icons";
import { config } from "../../data/config";

const SOCIAL_LINKS = [
  { href: config.social.github, icon: GithubIcon, label: "GitHub" },
  { href: config.social.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: config.social.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: `mailto:${config.social.email}`, icon: Mail, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black/20 backdrop-blur-md py-10 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold text-white tracking-tight">{config.name.toUpperCase()}</p>
            <p className="text-sm text-gray-500 mt-0.5 font-mono">CSE (AI) • IEM KOLKATA</p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="relative p-2.5 rounded-xl text-gray-400 bg-white/5 border border-white/5 flex items-center justify-center transition-colors"
                whileHover={{ 
                  scale: 1.15, 
                  y: -5,
                  color: "#fff",
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  borderColor: "rgba(99, 102, 241, 0.4)",
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.25)" 
                }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600 font-mono">
            &copy; {year} Sayantan Roy. Built with curiosity.
          </p>
          <p className="text-xs text-gray-700 font-mono">
            React · TypeScript · Vite · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

