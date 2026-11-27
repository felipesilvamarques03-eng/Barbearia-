import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/container";
import { requireUser } from "@/lib/auth";
import { embedUrl, getCatalog } from "@/lib/courses";
import { toggleLessonDone } from "../actions";

export const metadata: Metadata = { title: "Aula", robots: { index: false } };

export default function LessonPage({ params }: PageProps<"/aulas/[slug]">) {
  return (
    <Container className="max-w-[860px] py-14">
      <Suspense fallback={<p className="text-muted">Carregando a aula…</p>}>
        <Lesson params={params} />
      </Suspense>
    </Container>
  );
}

async function Lesson({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]{2,80}$/.test(slug)) notFound();

  const { supabase, user } = await requireUser();
  const { tree } = await getCatalog(supabase, user.id);
  const flat = tree.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitle: m.title, modulePos: m.position })));
  const idx = flat.findIndex((l) => l.slug === slug);
  if (idx === -1) notFound();
  const lesson = flat[idx];
  const prev = flat[idx - 1];
  const next = flat[idx + 1];

  // A RLS devolve o conteúdo só se a aula for grátis ou a assinatura estiver ativa.
  const { data: content } = await supabase
    .from("lesson_contents")
    .select("content_md, video_url")
    .eq("lesson_id", lesson.id)
    .maybeSingle();

  const video = embedUrl(content?.video_url ?? null);

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <Link href="/aulas" className="flex min-h-11 w-fit items-center text-sm text-muted hover:text-ink">
          ← Todas as aulas
        </Link>
        <span className="text-sm text-accent">
          Módulo {lesson.modulePos} · {lesson.moduleTitle} · Aula {lesson.position}
        </span>
        <h1 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-tight">{lesson.title}</h1>
        <p className="text-lg text-muted">{lesson.summary}</p>
      </header>

      {content ? (
        <>
          {video ? (
            <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-black">
              <iframe
                src={video}
                title={`Vídeo: ${lesson.title}`}
                className="size-full"
                allow="encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="lesson-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.content_md}</ReactMarkdown>
          </div>
          <form action={toggleLessonDone} className="flex justify-center border-t border-line pt-8">
            <input type="hidden" name="lessonId" value={lesson.id} />
            <input type="hidden" name="slug" value={lesson.slug} />
            <input type="hidden" name="done" value={lesson.done ? "1" : "0"} />
            <button
              type="submit"
              className={`min-h-12 cursor-pointer rounded-xl px-6 font-semibold ${
                lesson.done ? "border border-line-strong text-ink-2" : "bg-accent text-bg"
              }`}
            >
              {lesson.done ? "✓ Concluída — desmarcar" : "Marcar aula como concluída"}
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-8">
          <span className="font-display text-2xl font-semibold">Aula exclusiva para assinantes</span>
          <p className="text-muted">
            Esta aula faz parte do plano NEXORA. O Módulo 1 continua gratuito para você. As assinaturas abrem em breve.
          </p>
          <Link href="/aulas" className="min-h-11 font-medium text-accent hover:underline">
            Voltar ao Módulo 1 →
          </Link>
        </div>
      )}

      <nav aria-label="Navegação entre aulas" className="flex flex-wrap justify-between gap-4">
        {prev ? (
          <Link href={`/aulas/${prev.slug}`} className="min-h-11 text-sm text-muted hover:text-ink">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/aulas/${next.slug}`} className="min-h-11 text-sm text-muted hover:text-ink">
            {next.title} →
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
