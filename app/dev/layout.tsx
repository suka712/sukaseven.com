import type { Metadata } from "next";
import { DarkThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "sukaseven.com — dev portfolio",
  description: "Developer portfolio — projects, tools & experience",
};

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DarkThemeProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add('dark')`,
        }}
      />
      <div className="h-full">{children}</div>
    </DarkThemeProvider>
  );
}

