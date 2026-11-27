import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { icons } from "@/components/ui/icons";
import { CtaBand } from "@/components/sections/cta-band";
import { serviceDetails } from "@/content/services";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Sites institucionais, sistemas web, aplicativos, automações, soluções com inteligência artificial e suporte. Projetos sob medida com segurança e LGPD.",
  alternates: { canonical: "/servicos" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Serviços"
        title="Tecnologia sob medida, do site ao sistema completo."
        lead="Cada projeto começa entendendo o seu negócio. Depois, escopo, prazo e investimento ficam fechados por escrito antes de qualquer linha de código."
      />
      <Container className="flex flex-col gap-6 py-20">
        {serviceDetails.map((s) => {
          const Icon = icons[s.icon];
          return (
            <article
              key={s.slug}
              id={s.slug}
              aria-labelledby={`${s.slug}-title`}
              className="grid gap-8 rounded-2xl border border-line bg-surface p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr]"
            >
              <div className="flex flex-col gap-4">
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon />
                </span>
                <h2 id={`${s.slug}-title`} className="font-display text-2xl font-semibold sm:text-[28px]">
                  {s.title}
                </h2>
                <p className="text-lg text-ink-2">{s.lead}</p>
                <p className="text-[15px] text-muted">
                  <span className="font-medium text-ink-2">Para quem: </span>
                  {s.forWhom}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">O que inclui</span>
                <ul className="flex flex-col gap-2.5">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] text-ink-2">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </Container>
      <CtaBand />
    </>
  );
}
