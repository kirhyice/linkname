type Props = {
  title: string;
  url: string;
  onClick?: () => void;
};

export default function LinkCard({ title, url, onClick }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="block w-full rounded-2xl border border-white/60 bg-white/40 px-6 py-[18px] text-center text-[15px] font-semibold shadow-[0_4px_20px_-8px_rgba(30,64,120,0.2)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_8px_28px_-10px_rgba(30,64,120,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/10"
    >
      {title}
    </a>
  );
}
