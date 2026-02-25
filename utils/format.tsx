import { FileText, LucideFile } from "lucide-react";
import { ReactNode } from "react";
import { BiLogoGoLang } from "react-icons/bi";
import { FaFileCode, FaGolang, FaRegFileCode, FaRust } from "react-icons/fa6";
import { TbBrandRust, TbBrandTypescript } from "react-icons/tb";

export const formatMsToSecond = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export const truncateWords = (text: string, wordNum: number) => {
  return text.split(' ').length > wordNum ? text.split(' ').slice(0, wordNum).join(' ') + '...' : text
}

export const truncateText = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

export const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
  return `${Math.floor(seconds / 31536000)} years ago`;
};

export const getFileIcons = (extension: string | undefined): ReactNode => {
  switch (extension) {
    case '.go':
      return <FaGolang className="size-4 text-cyan-400" />;
    case '.rs':
      return <FaRust className="size-4 text-red-400" />
    case '.ts':
      return <TbBrandTypescript className="size-4 text-blue-400"/>
    default:
      return <FaRegFileCode className="size-4 shrink-0 text-zinc-300" />;
  }
}