"use client";

import { LastActive } from "./LastActive";
import { ContactForm } from "./ContactForm";
import { PingPhone } from "./PingPhone";

export function RightSidebar() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <LastActive />
      <ContactForm />
      <PingPhone />
    </div>
  );
}
