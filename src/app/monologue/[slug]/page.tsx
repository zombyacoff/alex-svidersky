import { MDXRemote } from "next-mdx-remote/rsc";
import { getPosts } from "@/lib/mdxUtils";
import { MDXComponents } from "@/components/MDXComponents";
import styles from "./slug.module.scss";
import { getHumanReadableDate } from "@/lib/getHumanReadableDate";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default function Post({ params }) {
  const slug = decodeURIComponent(params.slug);
  const post = getPosts().find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  return (
    <div className={styles.postContainer}>
      <article className={styles.article}>
        <h1 className={styles.title}>{post.metadata.title}</h1>
        <p className={styles.date}>
          {getHumanReadableDate(post.metadata.date)}
        </p>
        <MDXRemote source={post.content} components={MDXComponents} />
      </article>
    </div>
  );
}
