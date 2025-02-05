import path from "path";

export const NAV_LINKS = [
  { href: "/", name: "home" },
  { href: "/monologue", name: "monologue" },
];

export const PROFILE_URLS = {
  github: "https://github.com/zombyacoff",
  steam: "https://steamcommunity.com/id/zombyacoff",
};

export const postsDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "monologue"
);
