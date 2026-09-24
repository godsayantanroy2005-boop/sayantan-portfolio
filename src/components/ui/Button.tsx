import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "../animations/MagneticButton";

type ButtonVariant = "primary" | "secondary" | "ghost" | "glow";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  magnetic?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30",
  secondary: "bg-transparent text-white border border-white/10 hover:border-white/20 hover:bg-white/5",
  ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border-none",
  glow: "bg-indigo-600/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/20 hover:border-indigo-400/50 shadow-lg shadow-indigo-600/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  variant = "secondary",
  size = "md",
  className = "",
  magnetic = false,
  href,
  target,
  rel,
  disabled,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 select-none";
  const styles = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const inner = href ? (
    <a
      href={href}
      target={target}
      rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
      className={styles}
    >
      {children}
    </a>
  ) : (
    <motion.button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );

  if (magnetic) {
    return <MagneticButton>{inner}</MagneticButton>;
  }
  return inner;
}
