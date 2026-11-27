import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export type LessonRow = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  position: number;
  duration_min: number | null;
  is_free: boolean;
  module_id: number;
};

export type ModuleRow = { id: number; slug: string; title: string; description: string; position: number };

/** Catálogo completo (módulos + aulas), o progresso do aluno e se a assinatura está ativa. */
export async function getCatalog(supabase: SupabaseClient, userId: string) {
  const [modules, lessons, progress, subscription] = await Promise.all([
    supabase.from("modules").select("id, slug, title, description, position").order("position"),
    supabase
      .from("lessons")
      .select("id, slug, title, summary, position, duration_min, is_free, module_id")
      .order("position"),
    supabase.from("lesson_progress").select("lesson_id").eq("user_id", userId),
    supabase.from("subscriptions").select("status").eq("user_id", userId).maybeSingle(),
  ]);

  const done = new Set((progress.data ?? []).map((p) => p.lesson_id as number));
  const active = subscription.data?.status === "ativa";
  const allLessons = (lessons.data ?? []) as LessonRow[];

  const tree = ((modules.data ?? []) as ModuleRow[]).map((m) => ({
    ...m,
    lessons: allLessons
      .filter((l) => l.module_id === m.id)
      .map((l) => ({ ...l, done: done.has(l.id), locked: !l.is_free && !active })),
  }));

  return { tree, active, doneCount: done.size, total: allLessons.length };
}

/** Só aceita vídeos de YouTube ou Vimeo, convertidos para o endereço de incorporação. */
export function embedUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:") return null;
    if (u.hostname === "www.youtube.com" || u.hostname === "youtube.com") {
      const id = u.searchParams.get("v");
      return id && /^[\w-]{6,20}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return /^[\w-]{6,20}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (u.hostname === "vimeo.com") {
      const id = u.pathname.slice(1);
      return /^\d{5,15}$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}
