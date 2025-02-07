"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlButton } from "@/components/ui/buttons/UrlButton";
import { PROFILE_URLS } from "@/lib/constants";
import styles from "./Header.module.scss";

const NAV_LINKS = [
  { href: "/", name: "home" },
  { href: "/monologue", name: "monologue" },
];

interface NavLink {
  href: string;
  name: string;
}

const NavLinkComponent = ({ href, name }: NavLink) => {
  return (
    <Link
      href={href}
      className={`${styles.navLink} ${
        usePathname() === href ? styles.active : ""
      } ${styles.navLinkHover}`}
    >
      <span>{name}</span>
    </Link>
  );
};

export const Header = () => {
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
            <UrlButton url={PROFILE_URLS.steam} text="steam" />
            <UrlButton url={PROFILE_URLS.github} text="github" />
          </div>
        </div>
      </div>
    </header>
  );
};
