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

export function getMDXData(directory: string): Post[] {
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
  const posts = getMDXData(
    path.join(process.cwd(), "src", "content", "monologue")
  );

  return posts.sort((a, b) => {
    const dateA = parseDate(a.data.date);
    const dateB = parseDate(b.data.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function formatDate(dateString: string): string {
  const date = parseDate(dateString);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
