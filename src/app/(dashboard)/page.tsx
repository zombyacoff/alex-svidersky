import React from "react";
import styles from "./Dashboard.module.scss";
import Background from "@/components/ui/dashboard/ASCIIBackground";

export default function Dashboard() {
  return (
    <div>
      <Background />
      <div className="main-container">
        <h1 className={styles.title}>
          <span className={styles.line}>post-metamodern</span>
          <span className={styles.line}>aesthetic</span>
        </h1>
      </div>
    </div>
  );
}
