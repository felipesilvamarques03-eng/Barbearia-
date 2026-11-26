"use server";

import { isEmailConfigured, sendContactEmail } from "@/lib/email";
import { contactSchema, type ContactInput, type ContactState } from "@/lib/validation";

/**
 * Server Action do formulário de contato.
 * Roda apenas no servidor. Nunca confia no navegador: valida tudo de novo aqui.
 * Pendente (Etapa 6): Cloudflare Turnstile e limite de envios por IP.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: campo invisível para pessoas. Se vier preenchido, é robô.
  // Respondemos "sucesso" para não ensinar o robô a contornar a proteção.
  if (String(formData.get("site_empresa") ?? "") !== "") {
    return { status: "success", message: "Mensagem recebida. Em breve entraremos em contato." };
  }

  const text = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  const values = {
    nome: text("nome"),
    email: text("email"),
    whatsapp: text("whatsapp"),
    tipo: text("tipo"),
    mensagem: text("mensagem"),
    consentimento: text("consentimento"),
  };

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Revise os campos destacados.", fieldErrors, values };
  }

  if (!isEmailConfigured()) {
    return {
      status: "error",
      message: "O envio pelo formulário ainda não está ativo. Por favor, fale conosco pelo WhatsApp ou e-mail.",
      values,
    };
  }

  try {
    await sendContactEmail(parsed.data);
    return { status: "success", message: "Mensagem enviada! Responderemos em breve." };
  } catch {
    return {
      status: "error",
      message: "Não foi possível enviar agora. Tente novamente em instantes ou fale conosco pelo WhatsApp.",
      values,
    };
  }
}
