import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface PostData {
  date: string;
  title: string;
  [key: string]: any;
}

interface Post {
  content: string;
  data: PostData;
  slug: string;
}

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getMDXData(directory: string): Post[] {
  const files = fs.readdirSync(directory);
  return files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fileContents = fs.readFileSync(
      path.join(directory, fileName),
      "utf8"
    );
    const { data, content } = matter(fileContents);

    if (!data.date || !data.title) {
      throw new Error(`Missing required fields in ${fileName}`);
    }

    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(data.date)) {
      throw new Error(
        `Invalid date format in ${fileName}. Expected DD-MM-YYYY`
      );
    }

    return {
      content,
      data: data as PostData,
      slug,
    };
  });
}

export function getPosts(): Post[] {
  return getMDXData(path.join(process.cwd(), "src", "content", "monologue"));
}

export function sortPostsByTime(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    return parseDate(b.data.date).getTime() - parseDate(a.data.date).getTime();
  });
}

export function formatDate(dateString: string): string {
  return parseDate(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
