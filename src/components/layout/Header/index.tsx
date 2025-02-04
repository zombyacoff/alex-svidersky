"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlButton } from "@/components/ui/buttons/UrlButton";
import { PROFILE_URLS, NAV_LINKS } from "@/lib/constants";
import styles from "./Header.module.scss";

interface NavLink {
  href: string;
  name: string;
}

const NavLinkComponent = ({ href, name }: NavLink) => {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.active : ""} ${
        styles.navLinkHover
      }`}
    >
      <span>{name}</span>
    </Link>
  );
};

export const Header: React.FC = () => {
  const arrowSize = 16;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.navContainer}>
            <nav className={styles.nav}>
              {NAV_LINKS.map((link) => (
                <NavLinkComponent key={link.href} {...link} />
              ))}
            </nav>
          </div>
          <div className={styles.socialLinks}>
            <UrlButton
              url={PROFILE_URLS.steam}
              text="steam"
              arrowSize={arrowSize}
            />
            <UrlButton
              url={PROFILE_URLS.github}
              text="github"
              arrowSize={arrowSize}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
