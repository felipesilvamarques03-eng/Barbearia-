import { z } from "zod";

export const experienceLevels = [
  "Nunca programei",
  "Já mexi um pouco com código",
  "Já programo",
] as const;

/** Regras do formulário da lista de espera. Usadas no servidor; o navegador repete as básicas via atributos HTML. */
export const waitlistSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  email: z.email("Informe um e-mail válido.").trim().max(200),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, "Informe o WhatsApp com DDD.")
    .optional()
    .default(""),
  nivel: z.enum(experienceLevels, "Escolha seu nível de experiência."),
  objetivo: z.string().trim().max(1000, "Texto muito longo.").optional().default(""),
  consentimento: z.literal("on", "É preciso concordar com a Política de Privacidade."),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof WaitlistInput, string>>;
      /** Valores enviados, devolvidos para o formulário não apagar o que a pessoa digitou. */
      values?: Partial<Record<keyof WaitlistInput, string>>;
    };

/** Escapa HTML para que o conteúdo enviado pelo visitante não vire código no e-mail (proteção contra XSS). */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
