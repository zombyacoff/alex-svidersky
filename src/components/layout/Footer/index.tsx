import React from "react";
import styles from "./Footer.module.scss";
import { UrlButton } from "@/components/ui/buttons/UrlButton";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* <UrlButton url="/" text="view source" /> */}
      <p className={styles.copy}>
        <small>© {currentYear} MIT Licensed</small>
      </p>
    </footer>
  );
};
