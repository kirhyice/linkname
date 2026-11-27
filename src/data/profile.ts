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
  name: "Byron Lee",
  bio: "SAS Consultant | Ai가 재밌다",
  imageUrl: "/profile.jpg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/" },
    { id: "facebook", title: "Facebook", url: "https://www.facebook.com/jaesung.lee.7587" },
    { id: "email", title: "이메일", url: "mailto:kirhyice@gmail.com" },
  ],
};
