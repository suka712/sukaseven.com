"use client";

import { useState, useCallback } from "react";
import { GridLayout } from "./GridLayout";
import { TopTabs } from "../panels/top/TopTabs";
import { LastActive } from "../panels/top/LastActive";
import { Explorer } from "../panels/left/Explorer";
import { Links } from "../panels/left/Links";
import { CentralPanel } from "../panels/central/CentralPanel";
import { ListeningTo } from "../panels/right/ListeningTo";
import { PingPhone } from "../panels/right/PingPhone";
import { ActivityFeed } from "../panels/right/ActivityFeed";
import { LeftHealthPanel } from "../panels/bottom/HealthPanel";
import { NavigationTerminal } from "../panels/bottom/NavigationTerminal";
import { StatsTerminal } from "../panels/bottom/StatsTerminal";
import { NavigationGuide } from "../panels/bottom/NavigationGuide";
import { Login } from "../panels/right/Login";
import { WeatherPanel } from "../panels/right/WeatherPanel";
import { OsStats } from "../panels/top/OsStats";
import { LastDiff } from "../panels/left/LastDiff";
import type { MobileTab } from "./MobileLayout";

type CollapsibleSection = "left" | "right";

export const PortfolioLayout = () => {
  const [activePath, setActivePath] = useState<string | null>("index");
  const [collapsedSections, setCollapsedSections] = useState<Set<CollapsibleSection>>(new Set());
  const [mobileTab, setMobileTab] = useState<MobileTab>("home");

  const handleFileSelect = useCallback((path: string) => {
    setActivePath(path);
    // Auto-switch to home tab on mobile so the user sees the content
    setMobileTab("home");
  }, []);

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

  const handleMobileTabChange = useCallback((tab: MobileTab) => {
    setMobileTab(tab);
  }, []);

  return (
    <GridLayout
      osStats={<OsStats />}
      tabs={<TopTabs />}
      lastActive={<LastActive />}
      leftFileTree={<Explorer onFileSelect={handleFileSelect} activePath={activePath} />}
      leftDiff={<LastDiff />}
      leftListening={<ListeningTo />}
      leftLinks={<Links />}
      central={<CentralPanel contentPath={activePath} />}
      rightLogin={<Login />}
      rightTaskBoard={<ActivityFeed />}
      rightWeather={<WeatherPanel />}
      rightPing={<PingPhone />}
      navTerminal={<NavigationTerminal onFileSelect={handleFileSelect} onPing={handlePing} />}
      healthPanel={<LeftHealthPanel />}
      statsTerminal={<StatsTerminal />}
      bottomGuide={<NavigationGuide />}
      collapsedSections={collapsedSections}
      onToggleSection={toggleSection}
      mobileTab={mobileTab}
      onMobileTabChange={handleMobileTabChange}
    />
  );
};
