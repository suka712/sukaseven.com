import { FileText, LucideFile, Terminal } from "lucide-react";
import { ReactNode } from "react";
import { BiLogoGoLang } from "react-icons/bi";
import { FaCss3, FaGolang, FaHtml5, FaJava, FaJs, FaMarkdown, FaPython, FaRegFileCode, FaRust } from "react-icons/fa6";
import { TbBrandCpp, TbBrandKotlin, TbBrandReact, TbBrandRust, TbBrandSwift, TbBrandTypescript, TbBrandVue, TbSql } from "react-icons/tb";

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
      return <FaGolang className="size-4 text-cyan-400 shrink-0" />;
    case '.rs':
      return <FaRust className="size-4 text-red-400 shrink-0" />
    case '.ts':
      return <TbBrandTypescript className="size-4 text-blue-400 shrink-0"/>
    default:
      return <FaRegFileCode className="size-4 text-zinc-400 shrink-0" />;
  }
}

export const getLanguageIcon = (language: string): ReactNode => {
  switch (language.toLowerCase()) {
    case 'go':
      return <FaGolang className="size-3.5 text-cyan-400 shrink-0" />;
    case 'rust':
      return <TbBrandRust className="size-3.5 text-red-400 shrink-0" />;
    case 'typescript':
      return <TbBrandTypescript className="size-3.5 text-blue-400 shrink-0" />;
    case 'javascript':
      return <FaJs className="size-3.5 text-yellow-300 shrink-0" />;
    case 'python':
      return <FaPython className="size-3.5 text-yellow-400 shrink-0" />;
    case 'java':
      return <FaJava className="size-3.5 text-orange-400 shrink-0" />;
    case 'kotlin':
      return <TbBrandKotlin className="size-3.5 text-purple-400 shrink-0" />;
    case 'swift':
      return <TbBrandSwift className="size-3.5 text-orange-400 shrink-0" />;
    case 'c++':
    case 'cpp':
      return <TbBrandCpp className="size-3.5 text-blue-500 shrink-0" />;
    case 'html':
      return <FaHtml5 className="size-3.5 text-orange-500 shrink-0" />;
    case 'css':
      return <FaCss3 className="size-3.5 text-blue-400 shrink-0" />;
    case 'vue':
      return <TbBrandVue className="size-3.5 text-emerald-400 shrink-0" />;
    case 'jsx':
    case 'tsx':
    case 'react':
      return <TbBrandReact className="size-3.5 text-cyan-400 shrink-0" />;
    case 'sql':
      return <TbSql className="size-3.5 text-amber-400 shrink-0" />;
    case 'markdown':
    case 'mdx':
      return <FaMarkdown className="size-3.5 text-zinc-400 shrink-0" />;
    case 'bash':
    case 'sh':
    case 'shell':
    case 'zsh':
      return <Terminal className="size-3.5 text-zinc-400 shrink-0" />;
    default:
      return <FaRegFileCode className="size-3.5 text-zinc-500 shrink-0" />;
  }
}