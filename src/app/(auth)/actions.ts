"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";

export type AuthState = { error?: string; info?: string; email?: string; nome?: string };

const credentials = z.object({
  email: z.email("Informe um e-mail válido.").trim().max(200),
  senha: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres.").max(72, "Senha longa demais."),
});

const signupSchema = credentials.extend({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  consentimento: z.literal("on", "É preciso concordar com os Termos e a Política de Privacidade."),
});

const text = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v : "";
};

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentials.safeParse({ email: text(formData, "email"), senha: text(formData, "senha") });
  if (!parsed.success) return { error: parsed.error.issues[0].message, email: text(formData, "email") };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.senha,
  });

  if (error) {
    // Mensagem genérica: não revela se o e-mail existe.
    const unconfirmed = error.code === "email_not_confirmed";
    return {
      error: unconfirmed
        ? "Confirme seu e-mail pelo link que enviamos antes de entrar."
        : "E-mail ou senha incorretos.",
      email: parsed.data.email,
    };
  }
  redirect("/aulas");
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const values = {
    nome: text(formData, "nome"),
    email: text(formData, "email"),
    senha: text(formData, "senha"),
    consentimento: text(formData, "consentimento"),
  };
  const parsed = signupSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message, email: values.email, nome: values.nome };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.senha,
    options: {
      data: { nome: parsed.data.nome },
      emailRedirectTo: `${siteConfig.url}/auth/callback`,
    },
  });

  if (error) {
    if (error.code === "weak_password") {
      return { error: "Senha fraca. Use pelo menos 8 caracteres, misturando letras e números.", email: values.email, nome: values.nome };
    }
    if (error.code === "over_email_send_rate_limit") {
      return { error: "Muitos cadastros agora. Tente novamente em alguns minutos.", email: values.email, nome: values.nome };
    }
    return { error: "Não foi possível criar a conta. Tente novamente.", email: values.email, nome: values.nome };
  }

  // Com confirmação de e-mail desligada, a sessão já vem pronta.
  if (data.session) redirect("/aulas");

  return { info: "Conta criada! Enviamos um link de confirmação para o seu e-mail. Depois de confirmar, é só entrar." };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
