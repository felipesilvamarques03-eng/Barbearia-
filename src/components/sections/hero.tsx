import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";

/** Painel ilustrativo de uma trilha de aulas (marcado como "Exemplo"). */
const lessons = [
  { label: "Como pensar um projeto com IA", status: "done" },
  { label: "Seu primeiro site no ar", status: "done" },
  { label: "Formulário com proteção contra spam", status: "current" },
  { label: "Banco de dados e login", status: "next" },
  { label: "Publicar e manter", status: "next" },
] as const;

const statusLabel = { done: "Concluída", current: "Em andamento", next: "A seguir" } as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container className="grid items-center gap-16 pb-24 pt-20 sm:pt-28 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-7">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Pré-lançamento · lista de espera aberta
          </span>
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.5rem,5.2vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-balance"
          >
            Aprenda a criar sites, sistemas e apps com inteligência artificial.
          </h1>
          <p className="max-w-[540px] text-lg text-muted sm:text-[19px]">
            Mesmo sem saber programar. Aulas em vídeo, projetos guiados do zero à publicação e uma comunidade para
            aprender junto — num plano mensal acessível.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/#lista">Entrar na lista de espera</ButtonLink>
            <ButtonLink href="/#como-funciona" variant="secondary">
              Como funciona
            </ButtonLink>
          </div>
        </div>

        <figure
          className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-7"
          aria-label="Exemplo de trilha de aulas com o progresso do aluno"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-display text-[15px] font-semibold">Trilha · Seu primeiro app com IA</span>
            <span className="rounded-full border border-line-strong px-2.5 py-1 text-xs text-muted">Exemplo</span>
          </div>
          <div className="h-px bg-line" />
          <ol className="flex flex-col gap-1">
            {lessons.map((step, i) => (
              <li key={step.label} className="flex items-center gap-3.5 py-1.5">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    step.status === "done"
                      ? "border-accent bg-accent text-bg"
                      : step.status === "current"
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line-strong text-muted"
                  }`}
                  aria-hidden="true"
                >
                  {step.status === "done" ? "✓" : i + 1}
                </span>
                <span className={`flex-1 text-[15px] ${step.status === "next" ? "text-muted" : "text-ink"}`}>
                  {step.label}
                </span>
                <span className={`text-xs ${step.status === "current" ? "text-accent" : "text-muted"}`}>
                  {statusLabel[step.status]}
                </span>
              </li>
            ))}
          </ol>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#1c2029]" aria-hidden="true">
            <div className="h-full w-1/2 bg-accent" />
          </div>
          <figcaption className="text-[13px] text-muted">Cada módulo termina com um projeto funcionando na internet.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
