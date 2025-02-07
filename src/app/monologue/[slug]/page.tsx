import { MDXRemote } from "next-mdx-remote/rsc";
import { getPosts, formatDate } from "@/lib/mdxUtils";
import { MDXComponents } from "@/components/MDXComponents";
import styles from "./post.module.scss";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.postContainer}>
      <article className={styles.article}>
        <h1 className={styles.title}>{post.data.title}</h1>
        <p className={styles.date}>{formatDate(post.data.date)}</p>
        <MDXRemote
          source={post.content}
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
