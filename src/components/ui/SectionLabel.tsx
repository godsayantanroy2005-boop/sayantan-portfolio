interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="h-px w-6 bg-indigo-500/60" />
      <span className="text-xs uppercase tracking-widest text-indigo-400 font-medium font-mono">
        {children}
      </span>
    </div>
  );
}
