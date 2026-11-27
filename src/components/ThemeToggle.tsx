"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="rounded-full border border-white/60 bg-white/40 p-2 text-base shadow-[0_4px_16px_-8px_rgba(30,64,120,0.25)] backdrop-blur-xl transition duration-300 hover:bg-white/60 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10"
    >
      {/* 마운트 전에는 빈 칸으로 두어 hydration 불일치 방지 */}
      <span className="block h-6 w-6 leading-6">{dark === null ? "" : dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
