import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { requireUser } from "@/lib/auth";
import { getCatalog } from "@/lib/courses";
import { signOut } from "../(auth)/actions";

export const metadata: Metadata = { title: "Minhas aulas", robots: { index: false } };

export default function LessonsPage() {
  return (
    <Container className="py-16">
      <Suspense fallback={<p className="text-muted">Carregando suas aulas…</p>}>
        <Dashboard />
      </Suspense>
    </Container>
  );
}

async function Dashboard() {
  const { supabase, user } = await requireUser();
  const [{ tree, active, doneCount, total }, profile] = await Promise.all([
    getCatalog(supabase, user.id),
    supabase.from("profiles").select("nome").eq("id", user.id).maybeSingle(),
  ]);
  const nome = profile.data?.nome ?? "aluno";
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">Área do aluno</span>
          <h1 className="font-display text-4xl font-semibold">Olá, {nome.split(" ")[0]}.</h1>
          <p className="text-muted">
            {doneCount} de {total} aulas concluídas · {active ? "Assinatura ativa" : "Plano gratuito (Módulo 1)"}
          </p>
          <div className="mt-2 h-1.5 w-64 max-w-full overflow-hidden rounded-full bg-[#1c2029]" aria-hidden="true">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <form action={signOut}>
          <button type="submit" className="min-h-11 cursor-pointer rounded-xl border border-line-strong px-5 text-sm hover:border-muted">
            Sair
          </button>
        </form>
      </header>

      {!active ? (
        <div className="flex flex-col gap-2 rounded-2xl border border-accent/40 bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-2">
            O <strong className="text-ink">Módulo 1 é gratuito</strong>. Os demais módulos são liberados com a
            assinatura, que abre em breve.
          </p>
        </div>
      ) : null}

      {tree.map((m) => (
        <section key={m.id} aria-labelledby={`mod-${m.slug}`} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-display text-sm text-accent">Módulo {m.position}</span>
            <h2 id={`mod-${m.slug}`} className="font-display text-2xl font-semibold">
              {m.title}
            </h2>
            <p className="text-[15px] text-muted">{m.description}</p>
          </div>
          {m.lessons.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line-strong p-6 text-[15px] text-muted">
              Aulas em produção. Avisaremos quando forem publicadas.
            </p>
          ) : (
            <ol className="flex flex-col divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {m.lessons.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/aulas/${l.slug}`}
                    className="flex items-center gap-4 p-5 transition-colors hover:bg-surface-2"
                  >
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                        l.done ? "border-accent bg-accent text-bg" : "border-line-strong text-muted"
                      }`}
                      aria-hidden="true"
                    >
                      {l.done ? "✓" : l.position}
                    </span>
                    <span className="flex flex-1 flex-col">
                      <span className="font-medium">{l.title}</span>
                      <span className="text-sm text-muted">{l.summary}</span>
                    </span>
                    <span className="hidden shrink-0 text-xs text-muted sm:block">
                      {l.locked ? "Assinantes" : l.is_free ? "Grátis" : ""}
                      {l.duration_min ? ` · ${l.duration_min} min` : ""}
                    </span>
                    <span className="sr-only">{l.done ? "Concluída" : l.locked ? "Bloqueada" : "Disponível"}</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </div>
  );
}
