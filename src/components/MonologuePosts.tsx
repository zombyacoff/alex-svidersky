import Link from "next/link";
import { getPosts, formatDate, sortPostsByDate } from "@/lib/mdxUtils";
import styles from "./MonologuePosts.module.scss";

interface MonologuePostsProps {
  limit?: number;
}

export const MonologuePosts: React.FC<MonologuePostsProps> = ({ limit }) => {
  const posts = sortPostsByDate(getPosts());
  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <ul className={styles.postList}>
      {displayedPosts.map((post) => (
        <li key={post.slug}>
          <Link href={`/monologue/${post.slug}`}>
            <span className={styles.date}>{formatDate(post.data.date)}</span>
            <span className={styles.title}>{post.data.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
