import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string): { metadata: any; content: string } {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(rawContent);
  return { metadata: parsed.data, content: parsed.content.trim() };
}

function getMDXData(
  dir: string
): { metadata: any; slug: string; content: string }[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const filePath = path.join(dir, file);
    const { metadata, content } = readMDXFile(filePath);
    const slug = path.basename(file, path.extname(file));
    return { metadata, slug, content };
  });
}

export function getPosts() {
  return getMDXData(path.join(process.cwd(), "src", "content", "monologue"));
}
