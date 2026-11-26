"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";
import { projectTypes, type ContactState } from "@/lib/validation";

const initialState: ContactState = { status: "idle" };

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

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-8">
        <span className="font-display text-2xl font-semibold">Obrigado!</span>
        <p className="text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      aria-label="Formulário de contato"
      className="flex flex-col gap-[18px] rounded-[20px] border border-line bg-surface p-6 sm:p-8"
    >
      {/* Honeypot: escondido de pessoas e leitores de tela. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site da empresa
          <input type="text" name="site_empresa" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Nome
          <input
            className={field}
            type="text"
            name="nome"
            defaultValue={values.nome}
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
            defaultValue={values.email}
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
            defaultValue={values.whatsapp}
            autoComplete="tel"
            maxLength={30}
            placeholder="(11) 90000-0000"
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "erro-whatsapp" : undefined}
          />
          <FieldError id="erro-whatsapp" message={errors.whatsapp} />
        </label>
        <label className={labelCls}>
          Tipo de projeto
          <select className={field} name="tipo" required defaultValue={values.tipo || projectTypes[0]}>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelCls}>
        Conte sobre o projeto
        <textarea
          className={`${field} resize-y`}
          name="mensagem"
          defaultValue={values.mensagem}
          rows={4}
          required
          minLength={10}
          maxLength={3000}
          aria-invalid={Boolean(errors.mensagem)}
          aria-describedby={errors.mensagem ? "erro-mensagem" : undefined}
        />
        <FieldError id="erro-mensagem" message={errors.mensagem} />
      </label>

      <label className="flex items-start gap-2.5 text-[13px] leading-normal text-muted">
        <input
          type="checkbox"
          name="consentimento"
          defaultChecked={values.consentimento === "on"}
          required
          className="mt-0.5 size-[18px] shrink-0 accent-accent"
          aria-invalid={Boolean(errors.consentimento)}
        />
        <span>
          Concordo com o uso dos meus dados para retorno deste contato, conforme a{" "}
          <Link href="/politica-de-privacidade" className="text-accent hover:underline">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      <FieldError id="erro-consentimento" message={errors.consentimento} />

      {state.status === "error" ? (
        <p role="alert" className="rounded-lg border border-[#5a2a2a] bg-[#2a1416] px-4 py-3 text-sm text-[#f5b3b3]">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="min-h-12 cursor-pointer rounded-xl bg-accent px-6 py-3.5 font-semibold text-bg transition-opacity disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
