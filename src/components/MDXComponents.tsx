import React from "react";
import styles from "./MDXComponents.module.scss";
import { cyrillicMap } from "@/lib/cyrillicMap";

const slugify = (text: string): string => {
  const converted = text
    .toLowerCase()
    .replace(/[а-яё]/g, (char) => cyrillicMap.get(char) || char);
  return converted
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const createHeadingComponent = (
  HeadingTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  additionalClasses: string
) => {
  return ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text =
      React.Children.toArray(children)
        .filter((child) => typeof child === "string")
        .join("") || "";
    const id = slugify(text);

    const hasAnchor = React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        ((typeof child.type === "string" && child.type.toLowerCase() === "a") ||
          child.type === "a")
    );

    const headingProps = {
      id,
      className: `${styles.headingBase} ${additionalClasses} my-4 relative ${
        !hasAnchor ? "group" : ""
      }`,
      ...rest,
    };

    return (
      <HeadingTag {...headingProps}>
        {!hasAnchor ? (
          <a href={`#${id}`} className="block">
            <span
              className={`${styles.anchorIcon} group-hover:opacity-100 font-normal`}
              aria-hidden="true"
            >
              #
            </span>
            {children}
          </a>
        ) : (
          children
        )}
      </HeadingTag>
    );
  };
};

export const MDXComponents = {
  h1: createHeadingComponent("h1", "text-3xl font-bold"),
  h2: createHeadingComponent("h2", "text-2xl font-semibold"),
  h3: createHeadingComponent("h3", "text-xl font-medium"),
  h4: createHeadingComponent("h4", "text-lg font-medium"),
  h5: createHeadingComponent("h5", "text-base font-medium"),
  h6: createHeadingComponent("h6", "text-sm font-medium"),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={`${styles.article} my-2 leading-relaxed`} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className={styles.link} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc ml-6 my-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal ml-6 my-2" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="my-1" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className={styles.codeBlock} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className={styles.inlineCode} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className={`${styles.quote} my-4`} {...props} />
  ),
};
