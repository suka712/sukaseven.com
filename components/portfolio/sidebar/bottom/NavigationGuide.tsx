"use client";

const shortcuts = [
  { key: "Click file", desc: "View in central panel" },
  { key: "Type in terminal", desc: "Navigate to page" },
  { key: "Collapse arrows", desc: "Toggle sidebars" },
  { key: "Ping button", desc: "Send phone notification" },
  { key: "Tab links", desc: "Open projects in new tab" },
  { key: "Login", desc: "Sign in via email OTP" },
];

export function NavigationGuide() {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Navigation
      </div>
      <div className="flex flex-col gap-1 text-xs font-mono">
        {shortcuts.map((s) => (
          <div key={s.key} className="flex items-center gap-2 min-w-0">
            <span className="text-foreground/70 shrink-0">{s.key}</span>
            <span className="text-muted-foreground/40">—</span>
            <span className="text-muted-foreground/60 truncate">{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
