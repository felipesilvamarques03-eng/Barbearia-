import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/sections/cta-band";
import { getPublishedProject, projects } from "@/content/projects";

/*
 * Com Cache Components, generateStaticParams precisa devolver ao menos um item.
 * Listamos todos os cases; os não publicados respondem 404 via notFound().
 */
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) return { title: "Projeto não encontrado", robots: { index: false } };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
  };
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-2">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) notFound();

  return (
    <>
      <article>
        <header className="border-b border-[#1c2029]">
          <Container className="flex flex-col gap-5 pb-14 pt-16">
            <Link href="/portfolio" className="flex min-h-11 w-fit items-center text-sm text-muted hover:text-ink">
              ← Portfólio
            </Link>
            <div className="flex flex-wrap gap-2 text-xs text-ink-2">
              <span className="rounded-full border border-line-strong px-2.5 py-0.5">{project.segment}</span>
              <span className="rounded-full border border-line-strong px-2.5 py-0.5">{project.kind}</span>
            </div>
            <h1 className="max-w-[860px] font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-balance">
              {project.title}
            </h1>
            <p className="text-muted">{project.client}</p>
            <p className="max-w-[680px] text-lg text-ink-2">{project.summary}</p>
          </Container>
        </header>

        <Container className="grid gap-14 py-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-3">
              <h2 className="font-display text-2xl font-semibold">O problema</h2>
              <p className="text-ink-2">{project.problem}</p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-semibold">O que foi construído</h2>
              <List items={project.features} />
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-semibold">Segurança</h2>
              <List items={project.security} />
            </section>
          </div>
          <aside className="h-fit rounded-2xl border border-line bg-surface p-7">
            <h2 className="mb-4 text-[13px] font-medium uppercase tracking-[0.12em] text-muted">Tecnologias</h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-2">
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </article>
      <CtaBand title="Quer algo parecido para o seu negócio?" />
    </>
  );
}
