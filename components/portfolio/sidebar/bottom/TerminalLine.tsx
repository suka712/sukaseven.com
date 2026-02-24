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
      <span className="text-accent shrink-0" style={{ textShadow: "0 0 8px rgb(96 165 250 / 0.6)" }}>{prompt}</span>
      <span className="text-foreground whitespace-pre-wrap">{content}</span>
    </div>
  );
}
