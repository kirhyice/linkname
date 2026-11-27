type Props = {
  title: string;
  url: string;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, count, onClick }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-white/60 bg-white/40 px-16 py-[18px] text-center text-[15px] font-semibold shadow-[0_4px_20px_-8px_rgba(30,64,120,0.2)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_8px_28px_-10px_rgba(30,64,120,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/10"
    >
      {title}
      {/* 제목은 가운데 유지, 클릭 수는 오른쪽에 작게 */}
      <span
        aria-label={`클릭 ${count}회`}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400"
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
