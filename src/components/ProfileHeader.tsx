import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 푸른 톤 그림자로 살짝 떠 있는 느낌 */}
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-slate-200 shadow-[0_12px_32px_-12px_rgba(30,64,120,0.45)] ring-4 ring-white/80 dark:bg-slate-800 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)] dark:ring-white/10 sm:h-32 sm:w-32">
        {imageUrl ? (
          <Image src={imageUrl} alt={`${name} 프로필 사진`} fill sizes="128px" className="object-cover" priority />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl font-bold text-slate-500 dark:text-slate-400">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-400">{bio}</p>
    </header>
  );
}
