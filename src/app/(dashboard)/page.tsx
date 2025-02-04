import React from "react";
import styles from "./dashboard.module.scss";
import { Background } from "@/components/ui/AnimatedBackground";

function titleSpan(text: string) {
  return <span className={styles.line}>{text}</span>;
}

export default function Dashboard() {
  return (
    <div className="main-container">
      <h1 className={styles.title}>
        {titleSpan("metamodern")}
        {titleSpan("diary of")}
        {titleSpan("alex svidersky")}
      </h1>
      <Background />
    </div>
  );
}
