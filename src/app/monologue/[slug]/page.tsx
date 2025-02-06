import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { postsDirectory } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import remarkGfm from "remark-gfm";
import React from "react";
import { MDXComponents } from "@/components/MDX/MDXComponents";
import styles from "./post.module.scss";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    await fs.access(fullPath);
  } catch (error) {
    notFound();
  }

  const source = await fs.readFile(fullPath, "utf8");
  const { content, data } = matter(source);

  return (
    <div className={styles.postContainer}>
      <article className={styles.article}>
        <h1 className={styles.title}>{data.title as React.ReactNode}</h1>
        <p className={styles.date}>{data.date as React.ReactNode}</p>
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
