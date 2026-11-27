import type { IconName } from "@/components/ui/icons";

/** Catálogo de serviços (página /servicos). Sem preços: cada projeto recebe proposta própria. */
export type ServiceDetail = {
  slug: string;
  icon: IconName;
  title: string;
  lead: string;
  forWhom: string;
  includes: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "sites",
    icon: "site",
    title: "Sites institucionais",
    lead: "Um site rápido, que funciona bem no celular e aparece no Google.",
    forWhom: "Profissionais liberais, empresas e negócios locais que precisam transmitir confiança.",
    includes: [
      "Design exclusivo, sem template genérico",
      "Versões para celular, tablet e computador",
      "SEO básico: títulos, descrições, sitemap e dados estruturados",
      "Formulário de contato protegido e botão de WhatsApp",
      "Política de privacidade adequada à LGPD",
    ],
  },
  {
    slug: "sistemas",
    icon: "system",
    title: "Sistemas web",
    lead: "Ferramentas sob medida para organizar a operação do seu negócio.",
    forWhom: "Empresas que dependem de planilhas, papel ou sistemas que não se encaixam no processo.",
    includes: [
      "Agendamentos, filas, cadastros, painéis e relatórios",
      "Níveis de acesso por perfil (dono, equipe, cliente)",
      "Banco de dados com backups e controle de acesso",
      "Treinamento da equipe e documentação",
    ],
  },
  {
    slug: "aplicativos",
    icon: "app",
    title: "Aplicativos",
    lead: "Apps que seus clientes e sua equipe instalam e usam no dia a dia.",
    forWhom: "Negócios que precisam estar no celular do cliente ou da equipe de campo.",
    includes: [
      "Aplicativo instalável (PWA) para Android e iPhone",
      "Notificações, login seguro e uso em qualquer tela",
      "Publicação nas lojas quando o projeto exigir",
    ],
  },
  {
    slug: "automacoes",
    icon: "automation",
    title: "Automações e integrações",
    lead: "Menos trabalho repetitivo: sistemas conversando entre si.",
    forWhom: "Equipes que copiam dados de um lugar para outro ou repetem as mesmas tarefas todos os dias.",
    includes: [
      "Integração com WhatsApp, e-mail, marketplaces e planilhas",
      "Rotinas automáticas agendadas",
      "Alertas e relatórios enviados sozinhos",
    ],
  },
  {
    slug: "ia",
    icon: "ai",
    title: "Soluções com inteligência artificial",
    lead: "IA aplicada a tarefas reais do seu negócio, com supervisão humana.",
    forWhom: "Empresas que querem atender mais rápido, analisar documentos ou organizar informações.",
    includes: [
      "Assistentes de atendimento com as informações do seu negócio",
      "Leitura e resumo de documentos",
      "Classificação e organização automática de dados",
      "Cuidados com privacidade e revisão humana nas decisões importantes",
    ],
  },
  {
    slug: "suporte",
    icon: "shield",
    title: "Manutenção e suporte",
    lead: "Seu sistema atualizado, seguro e funcionando depois da entrega.",
    forWhom: "Quem já tem um site ou sistema e precisa de alguém responsável por ele.",
    includes: [
      "Atualizações de segurança e de dependências",
      "Monitoramento e backups",
      "Correções e pequenas melhorias mensais",
    ],
  },
];
