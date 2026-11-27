import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-7 pb-20 pt-6 sm:px-8 sm:pt-10">
      <div className="flex w-full justify-end">
        <ThemeToggle />
      </div>
      <div className="mt-8 flex w-full flex-col items-center gap-12 sm:mt-12">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <LinkList links={profile.links} />
      </div>
    </main>
  );
}
