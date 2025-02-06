import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { postsDirectory } from "./constants";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const fileNames = await fs.promises.readdir(postsDirectory);

    const posts = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx$/, "");
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = await fs.promises.readFile(fullPath, "utf8");
          const { data } = matter(fileContents);

          return {
            slug,
            title: data.title || slug,
            date: data.date || "",
          };
        })
    );

    console.log("Final posts:", JSON.stringify(posts, null, 2));
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));

    return posts;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}
