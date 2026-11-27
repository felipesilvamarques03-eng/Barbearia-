import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { icons } from "@/components/ui/icons";
import { audience, curriculum, faq, includes, journey, plan } from "@/content/home";

const band = "border-y border-[#1c2029] bg-bg-alt";

export function Audience() {
  return (
    <section aria-labelledby="publico-title" className={band}>
      <Container className="flex flex-col gap-10 py-20">
        <h2
          id="publico-title"
          className="max-w-[720px] font-display text-3xl font-semibold leading-[1.15] tracking-[-0.01em] text-balance sm:text-4xl"
        >
          Para quem quer construir, não só assistir.
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((p, i) => (
            <li key={p.title} className="flex flex-col gap-2">
              <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[19px] font-semibold">{p.title}</h3>
              <p className="text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Includes() {
  return (
    <section id="o-que-inclui" aria-labelledby="inclui-title">
      <Container className="flex flex-col gap-12 py-28">
        <SectionHeading id="inclui-title" eyebrow="O que está incluso" title="Tudo o que você precisa para sair do zero." />
        <ul className="grid gap-4 sm:grid-cols-2">
          {includes.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.title} className="flex flex-col gap-3.5 rounded-2xl border border-line bg-surface p-7">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon />
                </span>
                <h3 className="text-[19px] font-semibold">{s.title}</h3>
                <p className="text-[15px] text-muted">{s.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function Journey() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className={band}>
      <Container className="flex flex-col gap-12 py-28">
        <SectionHeading
          id="como-title"
          eyebrow="Como funciona"
          title="Aprender fazendo, do primeiro dia ao projeto publicado."
        />
        <ol className="grid border-t border-line-strong sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((m, i) => (
            <li key={m.title} className="flex flex-col gap-2.5 pr-6 pt-7">
              <span className="font-display text-[32px] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <p className="text-[15px] text-muted">{m.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Curriculum() {
  return (
    <section id="trilha" aria-labelledby="trilha-title">
      <Container className="grid gap-12 py-28 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <SectionHeading
            id="trilha-title"
            eyebrow="Trilha inicial"
            title="Do primeiro site ao sistema completo."
            description="A primeira trilha está em produção. A ordem dos módulos pode mudar até o lançamento."
          />
          <span className="w-fit rounded-full border border-line-strong px-3 py-1 text-xs text-muted">Conteúdo em produção</span>
        </div>
        <ol className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-surface">
          {curriculum.map((c, i) => (
            <li key={c.title} className="flex gap-5 p-6">
              <span className="w-24 shrink-0 whitespace-nowrap font-display text-lg font-semibold text-accent">Módulo {i + 1}</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-[15px] text-muted">{c.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

export function Pricing() {
  return (
    <section id="plano" aria-labelledby="plano-title" className={band}>
      <Container className="flex flex-col items-center gap-10 py-28">
        <SectionHeading id="plano-title" eyebrow="Plano" title="Um plano, tudo incluso." />
        <div className="flex w-full max-w-[460px] flex-col gap-6 rounded-[20px] border-2 border-accent bg-surface p-8">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-semibold">{plan.name}</span>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">Assinatura em breve</span>
          </div>
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-5xl font-semibold">{brl.format(plan.priceMonthly)}</span>
            <span className="text-muted">/mês</span>
          </p>
          <ul className="flex flex-col gap-3">
            {plan.includes.map((item) => (
              <li key={item} className="flex gap-3 text-ink-2">
                <span className="mt-0.5 text-accent" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href="/cadastro">Começar grátis pelo Módulo 1</ButtonLink>
          <p className="text-center text-[13px] text-muted">Crie a conta sem cartão. Avisamos quando a assinatura abrir.</p>
        </div>
      </Container>
    </section>
  );
}

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="faq-title">
      <Container className="flex max-w-[860px] flex-col gap-8 py-28">
        <h2 id="faq-title" className="text-center font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] sm:text-[40px]">
          Perguntas frequentes
        </h2>
        <div className="border-t border-line">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-line py-5">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-lg font-medium">
                {f.q}
                <span className="text-2xl text-accent transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-2 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function SignupCta() {
  return (
    <section id="comecar" aria-labelledby="comecar-title" className="border-t border-[#1c2029] bg-bg-alt">
      <Container className="flex flex-col items-start gap-6 py-24 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-[640px] flex-col gap-3">
          <h2 id="comecar-title" className="font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.01em] text-balance sm:text-[44px]">
            Comece agora pelo Módulo 1, de graça.
          </h2>
          <p className="text-[17px] text-muted">Crie sua conta em menos de um minuto, sem cartão de crédito.</p>
        </div>
        <ButtonLink href="/cadastro">Criar conta grátis</ButtonLink>
      </Container>
    </section>
  );
}
