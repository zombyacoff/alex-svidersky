import React from "react";
import styles from "./UrlButton.module.scss";
import { ArrowUpRight } from "lucide-react";

interface UrlButtonProps {
  url: string;
  text: string;
  arrowSize?: number;
}

export const UrlButton: React.FC<UrlButtonProps> = ({
  url,
  text,
  arrowSize = 16,
}) => {
  return (
    <div className={styles.button}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <ArrowUpRight size={arrowSize} />
        <span>{text}</span>
      </a>
    </div>
  );
};
