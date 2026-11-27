"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시합니다.
  const [counts, setCounts] = useState<Counts>(() => Object.fromEntries(links.map((l) => [l.id, 0])));

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { counts: Counts }) => setCounts((prev) => ({ ...prev, ...data.counts })))
      .catch((err) => {
        if (err.name !== "AbortError") console.error("클릭 수 불러오기 실패:", err);
      });
    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    // 화면에는 즉시 +1 하고, 서버 응답이 오면 실제 값으로 맞춥니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true, // 링크 이동 중에도 요청이 끊기지 않도록
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { id: string; count: number }) => setCounts((prev) => ({ ...prev, [data.id]: data.count })))
      .catch((err) => {
        console.error("클릭 수 저장 실패:", err);
        setCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 1) - 1) }));
      });
  };

  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
