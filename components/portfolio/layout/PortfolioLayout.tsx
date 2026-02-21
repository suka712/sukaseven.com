"use client";

import { useState } from "react";
import { GridLayout } from "./GridLayout";
import { TopTabs } from "../sidebar/top/TopTabs";
import { LeftFileTree } from "../sidebar/left/LeftFileTree";
import { LeftHealthPanel } from "../sidebar/left/LeftHealthPanel";
import { CentralPanel } from "../central/CentralPanel";
import { ListeningTo } from "../sidebar/right/ListeningTo";
import { PingPhone } from "../sidebar/right/PingPhone";
import { Links } from "../sidebar/right/Links";
import { NavigationTerminal } from "../terminal/NavigationTerminal";
import { StatsTerminal } from "../terminal/StatsTerminal";
import { LastActive } from "../sidebar/top/LastActive";

export const PortfolioLayout = () => {
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
      lastActive={<LastActive />}
      leftFileTree={<LeftFileTree onFileSelect={handleFileSelect} activePath={activePath} />}
      leftHealthPanel={<LeftHealthPanel />}
      central={<CentralPanel contentPath={activePath} />}
      rightListening={<ListeningTo />}
      rightPing={<PingPhone />}
      rightLinks={<Links />}
      navTerminal={<NavigationTerminal onFileSelect={handleFileSelect} onPing={handlePing} />}
      statsTerminal={<StatsTerminal />}
    />
  );
}
