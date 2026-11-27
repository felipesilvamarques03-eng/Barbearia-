"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";

const lessonId = z.coerce.number().int().positive();

/** Marca ou desmarca uma aula como concluída. A RLS garante que só vale para aulas acessíveis ao aluno. */
export async function toggleLessonDone(formData: FormData) {
  const parsedId = lessonId.safeParse(formData.get("lessonId"));
  const slug = String(formData.get("slug") ?? "");
  if (!parsedId.success || !/^[a-z0-9-]{2,80}$/.test(slug)) return;

  const { supabase, user } = await requireUser();
  const done = formData.get("done") === "1";

  if (done) {
    await supabase.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", parsedId.data);
  } else {
    await supabase.from("lesson_progress").insert({ user_id: user.id, lesson_id: parsedId.data });
  }
  revalidatePath(`/aulas/${slug}`);
  revalidatePath("/aulas");
}
