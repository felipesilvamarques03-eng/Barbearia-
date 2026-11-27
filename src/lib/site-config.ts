/**
 * Configuração central do site.
 * Dados que mudam por ambiente vêm de variáveis de ambiente (ver .env.example).
 * Valores entre colchetes são placeholders que ainda precisam de dados reais.
 */

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

export const siteConfig = {
  name: "NEXORA",
  legalName: "NEXORA Tecnologia",
  tagline: "Aprenda a criar sites, sistemas e apps com inteligência artificial.",
  description:
    "Plataforma de assinatura para aprender a criar sites, sistemas e aplicativos com inteligência artificial, mesmo sem saber programar. Aulas em vídeo, projetos guiados e comunidade.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt_BR",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  cnpj: process.env.NEXT_PUBLIC_CNPJ ?? "",
  whatsapp: {
    number: whatsappNumber,
    message: "Olá! Vim pelo site da NEXORA e tenho uma dúvida sobre o plano.",
  },
  nav: [
    { label: "O que inclui", href: "/#o-que-inclui" },
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Trilha", href: "/#trilha" },
    { label: "Plano", href: "/#plano" },
    { label: "Dúvidas", href: "/#duvidas" },
  ],
} as const;

/** Link do WhatsApp com mensagem pré-preenchida, ou null se o número não estiver configurado. */
export function whatsappLink(): string | null {
  if (!siteConfig.whatsapp.number) return null;
  const text = encodeURIComponent(siteConfig.whatsapp.message);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`;
}
