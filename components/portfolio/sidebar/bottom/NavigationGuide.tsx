"use client";

const shortcuts = [
  { key: "Click file", desc: "View in central panel" },
  { key: "Type in terminal", desc: "Navigate to page" },
  { key: "Collapse arrows", desc: "Toggle sidebars" },
  { key: "Ping button", desc: "Send phone notification" },
  { key: "Tab links", desc: "Open projects in new tab" },
  { key: "Login", desc: "Sign in with GitHub" },
];

export function NavigationGuide() {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Navigation Guide
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
        {shortcuts.map((s) => (
          <div key={s.key} className="flex items-center gap-2">
            <span className="text-foreground/80 whitespace-nowrap">
              {s.key}
            </span>
            <span className="text-muted-foreground truncate">{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
