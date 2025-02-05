import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import styles from "./monologue.module.scss";

export default async function Monologue() {
  const posts = await getAllPosts();
  // posts.map((post) => console.log(post.slug));
  return (
    <div className="main-container">
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/monologue/${post.slug}`}>
              {post.title} <span>({post.date})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
