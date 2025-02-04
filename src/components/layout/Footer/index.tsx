import React from "react";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={styles.footer}
      role="contentinfo"
      aria-label="Подвал сайта"
    >
      <p className={styles.copy}>
        <small>© {currentYear} MIT Licensed</small>
      </p>
    </footer>
  );
};
