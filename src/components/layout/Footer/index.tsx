import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* <ul className={styles.linkList}>
        <li>
          <a
            href="https://github.com/zombyacoff"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight size={arrowSize} />
            <span>github</span>
          </a>
        </li>
        <li>
          <a
            href="https://vercel.com/templates/next.js/portfolio-starter-kit"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight size={arrowSize} />
            <span>view source</span>
          </a>
        </li>
      </ul> */}
      <p className={styles.copy}>© {currentYear} MIT Licensed</p>
    </footer>
  );
};

export default Footer;
