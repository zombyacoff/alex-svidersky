import React from "react";
import styles from "./dashboard.module.scss";
import { Background } from "@/components/ui/AnimatedBackground";

function titleSpan(text: string) {
  return <span className={styles.line}>{text}</span>;
}

export default function Dashboard() {
  return (
    <div>
      <Background />
      <div className="content">
        <h1 className={styles.title}>
          {titleSpan("alex svidersky's")}
          {titleSpan("website")}
        </h1>
      </div>
    </div>
  );
}
