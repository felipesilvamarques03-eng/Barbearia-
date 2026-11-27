"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, signUp, type AuthState } from "./actions";

const field =
  "min-h-12 w-full rounded-[10px] border border-line-strong bg-bg px-3.5 py-3 text-ink focus:border-accent focus:outline-none";
const labelCls = "flex flex-col gap-1.5 text-sm text-ink-2";

export function AuthForm({ mode }: { mode: "entrar" | "cadastro" }) {
  const isSignup = mode === "cadastro";
  const [state, action, pending] = useActionState<AuthState, FormData>(isSignup ? signUp : signIn, {});

  if (state.info) {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-8">
        <span className="font-display text-2xl font-semibold">Quase lá!</span>
        <p className="text-muted">{state.info}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-[18px] rounded-[20px] border border-line bg-surface p-6 sm:p-8">
      {isSignup ? (
        <label className={labelCls}>
          Nome
          <input className={field} name="nome" autoComplete="name" required minLength={2} maxLength={100} defaultValue={state.nome} />
        </label>
      ) : null}
      <label className={labelCls}>
        E-mail
        <input className={field} type="email" name="email" autoComplete="email" required maxLength={200} defaultValue={state.email} />
      </label>
      <label className={labelCls}>
        Senha
        <input
          className={field}
          type="password"
          name="senha"
          autoComplete={isSignup ? "new-password" : "current-password"}
          required
          minLength={8}
          maxLength={72}
        />
        {isSignup ? <span className="text-xs text-muted">Pelo menos 8 caracteres.</span> : null}
      </label>

      {isSignup ? (
        <label className="flex items-start gap-2.5 text-[13px] leading-normal text-muted">
          <input type="checkbox" name="consentimento" required className="mt-0.5 size-[18px] shrink-0 accent-accent" />
          <span>
            Li e concordo com os{" "}
            <Link href="/termos" className="text-accent hover:underline">
              Termos de Uso
            </Link>{" "}
            e a{" "}
            <Link href="/politica-de-privacidade" className="text-accent hover:underline">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
      ) : null}

      {state.error ? (
        <p role="alert" className="rounded-lg border border-[#5a2a2a] bg-[#2a1416] px-4 py-3 text-sm text-[#f5b3b3]">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="min-h-12 cursor-pointer rounded-xl bg-accent px-6 py-3.5 font-semibold text-bg transition-opacity disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Aguarde…" : isSignup ? "Criar conta grátis" : "Entrar"}
      </button>

      <p className="text-center text-sm text-muted">
        {isSignup ? (
          <>
            Já tem conta?{" "}
            <Link href="/entrar" className="text-accent hover:underline">
              Entrar
            </Link>
          </>
        ) : (
          <>
            Ainda não tem conta?{" "}
            <Link href="/cadastro" className="text-accent hover:underline">
              Criar conta grátis
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
