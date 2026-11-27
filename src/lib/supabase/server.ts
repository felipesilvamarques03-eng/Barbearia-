import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente do Supabase para o servidor (Server Components, Server Actions, Route Handlers).
 * Usa a chave PUBLICÁVEL: a segurança vem das regras RLS do banco, nunca desta chave.
 * A chave de serviço (service_role) NUNCA é usada no site.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Chamado de um Server Component: o proxy renova a sessão, então pode ser ignorado.
          }
        },
      },
    },
  );
}
