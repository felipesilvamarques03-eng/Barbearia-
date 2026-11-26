import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { icons } from "@/components/ui/icons";
import { differentials, faq, method, problems, services } from "@/content/home";
import { publishedProjects } from "@/content/projects";

const band = "border-y border-[#1c2029] bg-bg-alt";

export function Problems() {
  return (
    <section aria-labelledby="problemas-title" className={band}>
      <Container className="flex flex-col gap-10 py-20">
        <h2
          id="problemas-title"
          className="max-w-[720px] font-display text-3xl font-semibold leading-[1.15] tracking-[-0.01em] text-balance sm:text-4xl"
        >
          Você precisa de tecnologia que resolva, não de mais um problema para gerenciar.
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
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

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title">
      <Container className="flex flex-col gap-12 py-28">
        <SectionHeading id="servicos-title" eyebrow="Serviços" title="Do site institucional ao sistema completo." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
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

export function Method() {
  return (
    <section id="metodo" aria-labelledby="metodo-title" className={band}>
      <Container className="flex flex-col gap-12 py-28">
        <SectionHeading
          id="metodo-title"
          eyebrow="Método"
          title="Um processo claro, do primeiro contato à entrega."
          description="Nenhum projeto é considerado concluído só porque a tela está bonita. Ele precisa funcionar, estar seguro e documentado."
        />
        <ol className="grid border-t border-line-strong sm:grid-cols-2 lg:grid-cols-5">
          {method.map((m, i) => (
            <li key={m.title} className="flex flex-col gap-2.5 pr-6 pt-7">
              <span className="font-display text-[32px] font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <p className="text-[15px] text-muted">{m.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function PortfolioPreview() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title">
      <Container className="flex flex-col gap-12 py-28">
        <SectionHeading
          id="portfolio-title"
          eyebrow="Portfólio"
          title="Projetos reais, explicados do problema ao resultado."
        />
        {publishedProjects.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {publishedProjects.map((p) => (
              <li key={p.slug} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="flex flex-col gap-2.5 p-6">
                  <div className="flex flex-wrap gap-2 text-xs text-ink-2">
                    <span className="rounded-full border border-line-strong px-2.5 py-0.5">{p.segment}</span>
                    <span className="rounded-full border border-line-strong px-2.5 py-0.5">{p.kind}</span>
                  </div>
                  <h3 className="text-[19px] font-semibold">{p.title}</h3>
                  <p className="text-[15px] text-muted">{p.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-strong p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[560px] text-muted">
              Estamos documentando nossos primeiros projetos com o cuidado que eles merecem. Quer ver um exemplo do
              nosso trabalho aplicado ao seu segmento?
            </p>
            <Link href="/#contato" className="flex min-h-11 items-center font-medium text-accent hover:underline">
              Peça uma demonstração →
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export function Differentials() {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-title" className={band}>
      <Container className="grid gap-16 py-28 lg:grid-cols-2">
        <SectionHeading
          id="diferenciais-title"
          eyebrow="Diferenciais"
          title="Tecnologia de empresa grande, atendimento de perto."
          description="Usamos inteligência artificial para produzir mais rápido e com custo menor — sem abrir mão de revisão, testes e segurança."
        />
        <ul className="grid gap-8 sm:grid-cols-2">
          {differentials.map((d) => (
            <li key={d.title} className="flex flex-col gap-2 border-t border-line-strong pt-5">
              <h3 className="text-lg font-semibold">{d.title}</h3>
              <p className="text-[15px] text-muted">{d.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Faq() {
  return (
    <section aria-labelledby="faq-title">
      <Container className="flex max-w-[860px] flex-col gap-8 py-28">
        <h2
          id="faq-title"
          className="text-center font-display text-3xl font-semibold leading-[1.1] tracking-[-0.01em] sm:text-[40px]"
        >
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
