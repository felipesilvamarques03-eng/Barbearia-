import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { ProjectCard } from "@/components/sections/project-card";
import { publishedProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Projetos desenvolvidos pela NEXORA, explicados do problema à solução.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfólio"
        title="Projetos reais, explicados do problema à solução."
        lead="Mostramos só o que foi construído de verdade, com autorização de quem usa."
      />
      <Container className="py-20">
        {publishedProjects.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {publishedProjects.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line-strong p-8">
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
      <CtaBand />
    </>
  );
}
