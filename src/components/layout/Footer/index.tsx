import React from "react";
import styles from "./Footer.module.scss";
import { UrlButton } from "@/components/ui/buttons/UrlButton";
import { PROFILE_URLS } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerButtons}>
        <UrlButton
          url={PROFILE_URLS.repository}
          text="view source"
          arrowSize={16}
        />
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} MIT Licensed</p>
    </footer>
  );
};
