import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Soluções por segmento",
  description:
    "Exemplos de soluções da NEXORA para beleza e bem-estar, saúde, varejo e e-commerce e serviços profissionais.",
  alternates: { canonical: "/solucoes" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Soluções"
        title="Cada segmento tem seus próprios problemas. A solução também."
        lead="Alguns exemplos do que construímos ou podemos construir. Seu negócio não está na lista? Conte o desafio — o método é o mesmo."
      />
      <Container className="grid gap-5 py-20 md:grid-cols-2">
        {solutions.map((s) => (
          <article key={s.segment} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-7 sm:p-9">
            <h2 className="font-display text-2xl font-semibold">{s.segment}</h2>
            <p className="text-muted">{s.pains}</p>
            <ul className="flex flex-col gap-2.5 border-t border-line pt-4">
              {s.examples.map((e) => (
                <li key={e} className="flex gap-3 text-[15px] text-ink-2">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Container>
      <CtaBand title="Não encontrou o seu segmento?" text="Conte o problema que você quer resolver. A gente avalia e responde com honestidade se faz sentido." />
    </>
  );
}
