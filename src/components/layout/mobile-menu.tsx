"use client";

import { useRef, type ReactNode } from "react";
import { icons } from "@/components/ui/icons";

/**
 * Menu móvel baseado em <details>: abre e fecha sem JavaScript.
 * O JavaScript apenas fecha o menu quando um link é tocado ou a tecla Esc é pressionada.
 */
export function MobileMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => ref.current?.removeAttribute("open");

  return (
    <details
      ref={ref}
      className="group relative md:hidden"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <summary
        aria-label="Abrir menu"
        className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-line-strong text-ink"
      >
        <icons.menu />
      </summary>
      {children}
    </details>
  );
}
