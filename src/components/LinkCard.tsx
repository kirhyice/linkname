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
      className="block w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
    >
      {title}
    </a>
  );
}
