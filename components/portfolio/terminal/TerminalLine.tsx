interface TerminalLineProps {
  prompt?: string;
  content: string;
  className?: string;
}

export function TerminalLine({
  prompt = "$",
  content,
  className = "",
}: TerminalLineProps) {
  return (
    <div className={`flex gap-2 text-xs font-mono ${className}`}>
      <span className="text-emerald-500 shrink-0">{prompt}</span>
      <span className="text-foreground whitespace-pre-wrap">{content}</span>
    </div>
  );
}
