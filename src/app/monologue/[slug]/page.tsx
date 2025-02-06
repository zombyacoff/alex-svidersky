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

// This function pre-generates static params for dynamic routes.
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Updated Post component with inline type annotation for props and explicit return type.
export default async function Post({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<React.ReactElement> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  // Check if the file exists; if not, trigger a notFound response.
  try {
    await fs.access(fullPath);
  } catch (error) {
    notFound();
  }

  // Read the MDX file and parse the front matter.
  const source = await fs.readFile(fullPath, "utf8");
  const { content, data } = matter(source);

  // Render the post using MDXRemote with a custom MDXComponents set.
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
