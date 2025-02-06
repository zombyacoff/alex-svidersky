import React from "react";
import styles from "./dashboard.module.scss";
import { Background } from "@/components/ui/AnimatedBackground";
import { MonologuePosts } from "@/components/MonologuePosts";

function titleSpan(text: string) {
  return <span className={styles.line}>{text}</span>;
}

export default function Dashboard() {
  return (
    <div>
      <Background />
      <div className={`content ${styles.centering}`}>
        <h1 className={styles.title}>
          {titleSpan("alex svidersky's")}
          {titleSpan("website")}
        </h1>
        {/* <MonologuePosts limit={3} /> */}
      </div>
    </div>
  );
}
