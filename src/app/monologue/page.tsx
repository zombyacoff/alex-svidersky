import Link from "next/link";
import { getPosts, formatDate } from "@/lib/mdxUtils";
import styles from "./monologue.module.scss";

export default function Monologue() {
  const posts = getPosts();

  return (
    <div className="content">
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/monologue/${post.slug}`}>
              {post.data.title} <span>({formatDate(post.data.date)})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
