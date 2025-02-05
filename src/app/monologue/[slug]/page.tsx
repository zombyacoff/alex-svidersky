import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { postsDirectory } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import remarkGfm from "remark-gfm";

type PageProps = {
  params: { slug: string };
};

const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold my-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold my-4" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-2 leading-relaxed" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-500 hover:underline" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc ml-6 my-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal ml-6 my-2" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="my-1" {...props} />
  ),
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const source = await fs.readFile(fullPath, "utf8");
  const { content, data } = matter(source);

  return (
    <div className="main-container">
      <article>
        <h1>{data.title as React.ReactNode}</h1>
        <p>{data.date as React.ReactNode}</p>
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
          components={MDXComponents}
        />
      </article>
    </div>
  );
}
