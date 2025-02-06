import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import styles from "./layout.module.scss";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AlexSvidersky",
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable}`}>
      <body>
        <div className={styles.container}>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
