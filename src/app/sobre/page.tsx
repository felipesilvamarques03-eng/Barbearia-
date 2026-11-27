import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { differentials, method } from "@/content/home";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A NEXORA é uma empresa brasileira de tecnologia que usa inteligência artificial para entregar software sob medida com rigor de engenharia.",
  alternates: { canonical: "/sobre" },
};

const values = [
  { title: "Transparência", text: "Você sabe o que está pronto, o que falta e o que precisa de decisão. Nada é dado como pronto sem teste." },
  { title: "Segurança por padrão", text: "Proteção de dados, controle de acesso e LGPD fazem parte do projeto desde o primeiro dia." },
  { title: "Simplicidade", text: "Só o que resolve o problema. Funcionalidade desnecessária é custo e manutenção." },
  { title: "Autonomia do cliente", text: "O código, a documentação e os acessos são seus. Você não fica preso a ninguém." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre a NEXORA"
        title="Uma software house nova, com o método de uma empresa madura."
        lead="A NEXORA desenvolve sites, sistemas, aplicativos e automações para profissionais e empresas. Usamos inteligência artificial para produzir com mais velocidade e custo menor, mantendo revisão, testes e segurança em cada entrega."
      />

      <section aria-labelledby="ia-title">
        <Container className="grid gap-10 py-20 lg:grid-cols-2">
          <h2 id="ia-title" className="font-display text-3xl font-semibold leading-[1.15] sm:text-4xl">
            Como usamos inteligência artificial
          </h2>
          <div className="flex flex-col gap-4 text-ink-2">
            <p>
              A IA acelera a escrita de código, a documentação e os testes. Ela não substitui o entendimento do seu
              negócio nem a responsabilidade pelo resultado.
            </p>
            <p>
              Todo código passa por revisão, testes funcionais e verificações de segurança antes de ser entregue. Dados
              de clientes nunca são enviados a ferramentas externas sem necessidade e autorização.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="valores-title" className="border-y border-[#1c2029] bg-bg-alt">
        <Container className="flex flex-col gap-10 py-20">
          <h2 id="valores-title" className="font-display text-3xl font-semibold sm:text-4xl">
            O que nos guia
          </h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="flex flex-col gap-2 border-t border-line-strong pt-5">
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="text-[15px] text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="como-title">
        <Container className="grid gap-12 py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 id="como-title" className="font-display text-3xl font-semibold sm:text-4xl">
              Como trabalhamos
            </h2>
            <ol className="flex flex-col gap-5">
              {method.map((m, i) => (
                <li key={m.title} className="flex gap-4">
                  <span className="font-display text-xl font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-semibold">{m.title}</h3>
                    <p className="text-[15px] text-muted">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Compromissos</h2>
            <ul className="flex flex-col gap-5">
              {differentials.map((d) => (
                <li key={d.title}>
                  <h3 className="font-semibold">{d.title}</h3>
                  <p className="text-[15px] text-muted">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
