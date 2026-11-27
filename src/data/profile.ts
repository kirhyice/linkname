export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl?: string;
  links: LinkItem[];
};

// 내 프로필과 링크 목록 — 여기만 수정하면 페이지에 반영됩니다.
export const profile: Profile = {
  name: "질풍노도Ai",
  bio: "아직도 호기심 많은 개발자",
  imageUrl: undefined, // 예: "/profile.jpg" (public 폴더에 이미지 추가)
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/" },
    { id: "blog", title: "블로그", url: "https://example.com/blog" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com/" },
  ],
};
