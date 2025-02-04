import React from "react";
import styles from "./Dashboard.module.scss";
import Background from "@/components/ui/dashboard/AsciiBackground";

function titleSpan(text: string) {
  return <span className={styles.line}>{text}</span>;
}

export default function DashboardPage() {
  return (
    <div className="main-container">
      <h1 className={styles.title}>
        {titleSpan("metamodern")}
        {titleSpan("diary of")}
        {titleSpan("Alex Svidersky")}
      </h1>
      <Background />
    </div>
  );
}
