"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { experienceLevels, waitlistSchema, type WaitlistInput } from "@/lib/validation";

/*
 * Formulário da lista de espera, enviado para a Netlify Forms.
 * - Validação com o mesmo schema Zod antes de enviar.
 * - Envio por AJAX para /__forms.html (exigência do runtime Next.js na Netlify).
 * - Proteções da Netlify: honeypot (bot-field), filtro Akismet e higienização do conteúdo.
 */

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<keyof WaitlistInput, string>>;

const field =
  "min-h-12 w-full rounded-[10px] border border-line-strong bg-bg px-3.5 py-3 text-ink placeholder:text-[#6b7385] focus:border-accent focus:outline-none aria-[invalid=true]:border-[#f07171]";
const labelCls = "flex flex-col gap-1.5 text-sm text-ink-2";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="text-[13px] text-[#f59a9a]">
      {message}
    </span>
  );
}

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (k: string) => String(data.get(k) ?? "");

    const parsed = waitlistSchema.safeParse({
      nome: text("nome"),
      email: text("email"),
      whatsapp: text("whatsapp"),
      nivel: text("nivel"),
      objetivo: text("objetivo"),
      consentimento: text("consentimento"),
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof WaitlistInput;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-8">
        <span className="font-display text-2xl font-semibold">Você está na lista!</span>
        <p className="text-muted">Avisaremos por e-mail quando as inscrições abrirem.</p>
      </div>
    );
  }

  const hasFieldErrors = Object.keys(errors).length > 0;

  return (
    <form
      name="lista-de-espera"
      method="POST"
      onSubmit={handleSubmit}
      aria-label="Lista de espera"
      className="flex flex-col gap-[18px] rounded-[20px] border border-line bg-surface p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value="lista-de-espera" />
      <input type="hidden" name="subject" value="Nova inscrição na lista de espera da NEXORA" />
      {/* Honeypot: escondido de pessoas e leitores de tela. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Não preencha
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Nome
          <input
            className={field}
            type="text"
            name="nome"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={errors.nome ? "erro-nome" : undefined}
          />
          <FieldError id="erro-nome" message={errors.nome} />
        </label>
        <label className={labelCls}>
          E-mail
          <input
            className={field}
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={200}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "erro-email" : undefined}
          />
          <FieldError id="erro-email" message={errors.email} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          <span>
            WhatsApp <span className="text-muted">(opcional)</span>
          </span>
          <input
            className={field}
            type="tel"
            name="whatsapp"
            autoComplete="tel"
            maxLength={30}
            placeholder="(11) 90000-0000"
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "erro-whatsapp" : undefined}
          />
          <FieldError id="erro-whatsapp" message={errors.whatsapp} />
        </label>
        <label className={labelCls}>
          Sua experiência
          <select className={field} name="nivel" required defaultValue={experienceLevels[0]}>
            {experienceLevels.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelCls}>
        <span>
          O que você gostaria de criar? <span className="text-muted">(opcional)</span>
        </span>
        <textarea
          className={`${field} resize-y`}
          name="objetivo"
          rows={3}
          maxLength={1000}
          placeholder="Ex.: um app de agendamento para o meu salão"
          aria-invalid={Boolean(errors.objetivo)}
        />
        <FieldError id="erro-objetivo" message={errors.objetivo} />
      </label>

      <label className="flex items-start gap-2.5 text-[13px] leading-normal text-muted">
        <input
          type="checkbox"
          name="consentimento"
          required
          className="mt-0.5 size-[18px] shrink-0 accent-accent"
          aria-invalid={Boolean(errors.consentimento)}
        />
        <span>
          Concordo em receber e-mails sobre o lançamento da NEXORA e com o uso dos meus dados conforme a{" "}
          <Link href="/politica-de-privacidade" className="text-accent hover:underline">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      <FieldError id="erro-consentimento" message={errors.consentimento} />

      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-[#5a2a2a] bg-[#2a1416] px-4 py-3 text-sm text-[#f5b3b3]">
          {hasFieldErrors ? "Revise os campos destacados." : "Não foi possível concluir agora. Tente novamente em instantes."}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 cursor-pointer rounded-xl bg-accent px-6 py-3.5 font-semibold text-bg transition-opacity disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Entrar na lista de espera"}
      </button>
      <p className="text-center text-[13px] text-muted">Sem cobrança. Você pode sair da lista quando quiser.</p>
    </form>
  );
}
