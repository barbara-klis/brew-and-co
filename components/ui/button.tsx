import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-crema-300 active:shadow-press active:translate-y-px",
  secondary: "bg-surface-inverse text-surface hover:bg-ink",
  quiet: "border border-line text-foreground hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6",
  lg: "h-14 px-8 text-lead",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className">)
);

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-pill font-display font-medium transition-colors duration-(--duration-quick) aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    return <Link {...props} className={classes} />;
  }
  return <button type="button" {...props} className={classes} />;
}
