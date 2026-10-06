import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  rel?: string;
  theme?: "default" | "dark" | "primary";
};

export default function Button({
  children,
  href,
  target,
  rel,
  theme = "default",
}: ButtonProps) {
  const buttonClassName = `button button--glass${theme === "dark" ? " button--dark" : theme === "primary" ? " button--primary" : ""}`;
  if (href) {
    return (
      <a className={buttonClassName} href={href} target={target} rel={rel}>
        <span className="button__text">{children}</span>
      </a>
    );
  }

  return (
    <button className={buttonClassName} type="button">
      <span className="button__text">{children}</span>
    </button>
  );
}
