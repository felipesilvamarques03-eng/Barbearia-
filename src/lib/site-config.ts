/**
 * Configuração central do site.
 * Dados que mudam por ambiente vêm de variáveis de ambiente (ver .env.example).
 * Valores entre colchetes são placeholders que ainda precisam de dados reais.
 */

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

export const siteConfig = {
  name: "NEXORA",
  legalName: "NEXORA Tecnologia",
  tagline: "Software sob medida, entregue com velocidade de IA e rigor de engenharia.",
  description:
    "A NEXORA desenvolve sites, sistemas, aplicativos, automações e soluções com inteligência artificial para profissionais e empresas, com segurança e conformidade com a LGPD.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt_BR",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  cnpj: process.env.NEXT_PUBLIC_CNPJ ?? "",
  whatsapp: {
    number: whatsappNumber,
    message: "Olá! Vim pelo site da NEXORA e gostaria de conversar sobre um projeto.",
  },
  nav: [
    { label: "Serviços", href: "/#servicos" },
    { label: "Método", href: "/#metodo" },
    { label: "Portfólio", href: "/#portfolio" },
    { label: "Diferenciais", href: "/#diferenciais" },
    { label: "Contato", href: "/#contato" },
  ],
} as const;

/** Link do WhatsApp com mensagem pré-preenchida, ou null se o número não estiver configurado. */
export function whatsappLink(): string | null {
  if (!siteConfig.whatsapp.number) return null;
  const text = encodeURIComponent(siteConfig.whatsapp.message);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`;
}
