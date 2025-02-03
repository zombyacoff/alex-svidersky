import React from "react";
import styles from "./main.module.scss";
import Background from "@/components/ui/ASCIIBackground";

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <Background />
      {/* <h1 className={styles.title}>welcome</h1> */}
    </div>
  );
}
