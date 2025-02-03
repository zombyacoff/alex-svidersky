import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>© {currentYear} MIT Licensed</p>
    </footer>
  );
};

export default Footer;
