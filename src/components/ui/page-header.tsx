import { Container } from "./container";

type Props = { eyebrow: string; title: string; lead: string };

/** Abertura padrão das páginas internas (o único H1 da página). */
export function PageHeader({ eyebrow, title, lead }: Props) {
  return (
    <section className="border-b border-[#1c2029]">
      <Container className="flex flex-col gap-5 pb-16 pt-20 sm:pt-24">
        <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">{eyebrow}</span>
        <h1 className="max-w-[860px] font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-balance">
          {title}
        </h1>
        <p className="max-w-[640px] text-lg text-muted">{lead}</p>
      </Container>
    </section>
  );
}
