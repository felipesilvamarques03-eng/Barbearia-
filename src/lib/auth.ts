import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Camada de acesso (Data Access Layer): toda página logada passa por aqui.
 * - connection(): garante que nada daqui é pré-renderizado (depende do usuário e do horário).
 * - getUser(): confirma a sessão com o servidor do Supabase (não confia só no cookie).
 */
export async function requireUser() {
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/entrar");
  return { supabase, user };
}
