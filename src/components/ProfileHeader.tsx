import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-800 sm:h-32 sm:w-32">
        {imageUrl ? (
          <Image src={imageUrl} alt={`${name} 프로필 사진`} fill className="object-cover" priority />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-400">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">{name}</h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{bio}</p>
    </header>
  );
}
