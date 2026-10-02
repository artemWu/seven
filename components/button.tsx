type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  theme?: "default" | "dark";
};

export default function Button({
  children,
  href,
  target,
  rel,
  theme = "default",
}: ButtonProps) {
  const buttonClassName = `button button--glass${theme === "dark" ? " button--dark" : ""}`;

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
