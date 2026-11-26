import "server-only";
import { escapeHtml, type ContactInput } from "./validation";

/**
 * Envio do formulário por e-mail via API do Resend.
 * As chaves ficam SOMENTE em variáveis de ambiente do servidor (nunca NEXT_PUBLIC_).
 */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

export async function sendContactEmail(data: ContactInput): Promise<void> {
  const rows: [string, string][] = [
    ["Nome", data.nome],
    ["E-mail", data.email],
    ["WhatsApp", data.whatsapp || "—"],
    ["Tipo de projeto", data.tipo],
  ];

  const html = `
    <h2>Novo contato pelo site</h2>
    <table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
      .join("")}</table>
    <p><strong>Mensagem</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.mensagem)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `Novo contato: ${data.nome} (${data.tipo})`,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    // Registra só o status: nunca dados pessoais do visitante nos logs.
    console.error(`[contato] Falha no envio de e-mail: HTTP ${response.status}`);
    throw new Error("EMAIL_SEND_FAILED");
  }
}
