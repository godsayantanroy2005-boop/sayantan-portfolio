interface BadgeProps {
  children: string;
  variant?: "available" | "default";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  if (variant === "available") {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium font-mono">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>
        {children}
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/8 bg-white/4 text-gray-400 text-xs font-medium">
      {children}
    </div>
  );
}
