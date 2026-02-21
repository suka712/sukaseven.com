"use client";

import { useState } from "react";
import { GridLayout } from "./GridLayout";
import { TopTabs } from "../tabs/TopTabs";
import { LeftSidebar } from "../sidebar/LeftSidebar";
import { CentralPanel } from "../central/CentralPanel";
import { RightSidebar } from "../sidebar/RightSidebar";
import { NavigationTerminal } from "../terminal/NavigationTerminal";
import { StatsTerminal } from "../terminal/StatsTerminal";

export function PortfolioLayout() {
  const [activePath, setActivePath] = useState<string | null>(null);

  const handleFileSelect = (path: string) => {
    setActivePath(path);
  };

  const handlePing = () => {
    // Mock ping - would POST to backend in production
  };

  return (
    <GridLayout
      tabs={<TopTabs />}
      leftSidebar={
        <LeftSidebar onFileSelect={handleFileSelect} activePath={activePath} />
      }
      central={<CentralPanel contentPath={activePath} />}
      rightSidebar={<RightSidebar />}
      navTerminal={
        <NavigationTerminal onFileSelect={handleFileSelect} onPing={handlePing} />
      }
      statsTerminal={<StatsTerminal />}
    />
  );
}
