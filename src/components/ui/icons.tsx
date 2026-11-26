import type { SVGProps } from "react";

/** Ícones de traço simples (24×24). Decorativos por padrão: use aria-label quando tiverem significado. */
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const icons = {
  site: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M7 7h.01" />
    </Icon>
  ),
  system: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M4 4h16v6H4zM4 14h7v6H4zM15 14h5v6h-5z" />
    </Icon>
  ),
  app: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </Icon>
  ),
  automation: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M4 12h4l3-7 3 14 3-7h3" />
    </Icon>
  ),
  ai: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  ),
  shield: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
    </Icon>
  ),
  chat: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
    </Icon>
  ),
  mail: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Icon>
  ),
  menu: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  ),
} as const;

export type IconName = keyof typeof icons;
