import React from "react";
import styles from "./MDXComponents.module.scss";

function slugify(text: string): string {
  const cyrillicMap: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return (
    text
      .toLowerCase()
      // Транслитерируем кириллические буквы согласно мэппингу
      .split("")
      .map((char) => cyrillicMap[char] || char)
      .join("")
      .trim()
      // Удаляем недопустимые символы, оставляя пробелы и дефисы
      .replace(/[^\w\s-]/g, "")
      // Заменяем один или более пробелов на один дефис
      .replace(/\s+/g, "-")
  );
}

/**
 * Функция для создания компонента заголовка, который рендерит текст как кликабельный элемент.
 * Если текст не содержит ссылку, добавляется якорь для удобной навигации.
 * Иконка якоря появляется при наведении на заголовок.
 */
function createHeadingComponent(
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  additionalClasses: string
) {
  return (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...rest } = props;
    // Извлекаем чистый текст из детей для генерации id
    const text =
      typeof children === "string"
        ? children
        : React.Children.toArray(children)
            .filter((child) => typeof child === "string")
            .join("");
    const id = slugify(text);
    const HeadingTag = heading;

    // Проверяем, содержит ли содержимое уже элемент anchor
    const containsAnchor = React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        (child.type === "a" ||
          (typeof child.type === "string" && child.type.toLowerCase() === "a"))
    );

    if (containsAnchor) {
      return (
        <HeadingTag
          id={id}
          className={`${styles.headingBase} ${additionalClasses} my-4 relative`}
          {...rest}
        >
          {children}
        </HeadingTag>
      );
    }

    return (
      <HeadingTag
        id={id}
        className={`${styles.headingBase} ${additionalClasses} my-4 relative group`}
        {...rest}
      >
        <a href={`#${id}`} className="block">
          <span
            className={`${styles.anchorIcon} group-hover:opacity-100`}
            aria-hidden="true"
          >
            #
          </span>
          {children}
        </a>
      </HeadingTag>
    );
  };
}

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
