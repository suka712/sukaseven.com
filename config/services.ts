export const MONITORED_SERVICES = [
  { name: "KatanaID",     url: "https://katanaid.com" },
  { name: "KatanaID API", url: "https://api.katanaid.com" },
  { name: "Caphne",       url: "https://caphne.co" },
  { name: "Caphne API",   url: "https://api.caphne.co" },
  { name: "Anyu",         url: "https://anyu.sukaseven.com" },
  { name: "Tldraw",       url: "https://tldraw.sukaseven.com" },
  { name: "Hasaki",       url: "https://hasaki.sukaseven.com" },
  { name: "Hanshi",       url: "https://hanshi.sukaseven.com" },
] as const;

export type ServiceName = (typeof MONITORED_SERVICES)[number]["name"];
