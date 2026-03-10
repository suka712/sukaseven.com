"use client";

import { useState, useCallback } from "react";
import { GridLayout } from "./GridLayout";
import { TopTabs } from "../sidebar/top/TopTabs";
import { LastActive } from "../sidebar/top/LastActive";
import { Explorer } from "../sidebar/left/Explorer";
import { Links } from "../sidebar/left/Links";
import { CentralPanel } from "../central/CentralPanel";
import { ListeningTo } from "../sidebar/right/ListeningTo";
import { PingPhone } from "../sidebar/right/PingPhone";
import { TaskBoard } from "../sidebar/right/TaskBoard";
import { LeftHealthPanel } from "../sidebar/bottom/HealthPanel";
import { NavigationTerminal } from "../sidebar/bottom/NavigationTerminal";
import { StatsTerminal } from "../sidebar/bottom/StatsTerminal";
import { NavigationGuide } from "../sidebar/bottom/NavigationGuide";
import { Login } from "../sidebar/right/Login";
import { WeatherPanel } from "../sidebar/right/WeatherPanel";
import { OsStats } from "../sidebar/top/OsStats";

type CollapsibleSection = "left" | "right";

export const PortfolioLayout = () => {
  const [activePath, setActivePath] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<CollapsibleSection>>(new Set());

  const handleFileSelect = (path: string) => {
    setActivePath(path);
  };

  const handlePing = () => {
    // Mock ping - would POST to backend in production
  };

  const toggleSection = useCallback((section: CollapsibleSection) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  }, []);


  return (
    <GridLayout
      osStats={<OsStats />}
      tabs={<TopTabs />}
      lastActive={<LastActive />}
      leftFileTree={<Explorer onFileSelect={handleFileSelect} activePath={activePath} />}
      leftListening={<ListeningTo />}
      leftLinks={<Links />}
      central={<CentralPanel contentPath={activePath} />}
      rightLogin={<Login />}
      rightTaskBoard={<TaskBoard />}
      rightWeather={<WeatherPanel />}
      rightPing={<PingPhone />}
      navTerminal={<NavigationTerminal onFileSelect={handleFileSelect} onPing={handlePing} />}
      healthPanel={<LeftHealthPanel />}
      statsTerminal={<StatsTerminal />}
      bottomGuide={<NavigationGuide />}
      collapsedSections={collapsedSections}
      onToggleSection={toggleSection}
    />
  );
};
