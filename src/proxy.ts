import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

/*
 * Só roda nas áreas que usam login. A página de vendas fica fora, estática e rápida.
 */
export const config = {
  matcher: ["/aulas/:path*", "/entrar", "/cadastro", "/conta/:path*", "/admin/:path*", "/auth/:path*"],
};
