import { z } from "zod";

export const projectTypes = [
  "Site institucional",
  "Sistema web",
  "Aplicativo",
  "Automação ou IA",
  "Ainda não sei",
] as const;

/** Regras do formulário de contato. Usadas no servidor; o navegador repete as básicas via atributos HTML. */
export const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  email: z.email("Informe um e-mail válido.").trim().max(200),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, "Informe o WhatsApp com DDD.")
    .optional()
    .default(""),
  tipo: z.enum(projectTypes, "Escolha um tipo de projeto."),
  mensagem: z.string().trim().min(10, "Conte um pouco mais sobre o projeto.").max(3000, "Mensagem muito longa."),
  consentimento: z.literal("on", "É preciso concordar com a Política de Privacidade."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactInput, string>>;
      /** Valores enviados, devolvidos para o formulário não apagar o que a pessoa digitou. */
      values?: Partial<Record<keyof ContactInput, string>>;
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
