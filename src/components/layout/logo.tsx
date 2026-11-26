type Props = { className?: string; size?: number };

/** Símbolo da NEXORA: o "N" como caminho contínuo que termina num ponto de conexão. */
export function LogoMark({ className = "", size = 32 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 22V10l12 12V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="10" r="2.6" fill="var(--color-accent)" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-ink">
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-[0.08em]">NEXORA</span>
    </span>
  );
}
