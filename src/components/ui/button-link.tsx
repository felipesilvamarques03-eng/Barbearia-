import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-[15px] font-semibold transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-bg hover:bg-[color-mix(in_srgb,var(--color-accent)_85%,white)]",
  secondary: "border border-line-strong text-ink hover:border-muted",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
