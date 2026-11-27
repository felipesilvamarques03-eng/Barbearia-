/*
 * Portfólio.
 * REGRA: só fatos verificáveis. Nada de métricas, depoimentos ou resultados que não foram medidos.
 * Um case só aparece no site com `published: true`, depois de confirmar:
 *   1) autorização do cliente para divulgar;
 *   2) que as informações abaixo continuam corretas.
 */

export type Project = {
  slug: string;
  title: string;
  client: string;
  segment: string;
  kind: string;
  summary: string;
  problem: string;
  features: string[];
  security: string[];
  stack: string[];
  published: boolean;
};

export const projects: Project[] = [
  {
    slug: "fila-e-faturamento-barbearia",
    title: "Fila digital e faturamento para barbearia",
    client: "Barbearia do Andrezinho",
    segment: "Beleza",
    kind: "Sistema web",
    summary:
      "Fila online, chamada pelo WhatsApp, faturamento e acompanhamento da rotina dos clientes, com áreas separadas para cliente, barbeiro e dono.",
    problem:
      "A barbearia organizava a fila e o faturamento de forma manual, sem visão de quanto faturava por período nem de quais clientes deixaram de voltar.",
    features: [
      "Fila de atendimento com botão que abre o WhatsApp com a mensagem pronta para chamar o próximo cliente",
      "Faturamento do dia, da semana e do mês, comparado ao período anterior, com ticket médio e resultado por serviço",
      "Rotina dos clientes: quem está em dia, atrasado, sumiu ou espaçando as visitas, com botão para chamar de volta",
      "Três níveis de acesso: cliente, barbeiro e dono — só o dono edita e exclui atendimentos",
    ],
    security: [
      "Faturamento acessível somente com senha; os dados ficam trancados no banco e são lidos por funções protegidas",
      "Bloqueio temporário após tentativas de senha erradas, contra adivinhação",
    ],
    stack: ["HTML e JavaScript", "Supabase (PostgreSQL)", "Netlify"],
    published: false,
  },
  {
    slug: "painel-dropshipping-mercado-livre",
    title: "Painel de gestão para loja de dropshipping",
    client: "FJ store (produto próprio)",
    segment: "Varejo online",
    kind: "Plataforma web",
    summary:
      "Painel que centraliza pedidos do Mercado Livre, repasse ao fornecedor, notas fiscais, financeiro, estoque e Instagram da loja.",
    problem:
      "Operar uma loja de dropshipping exigia alternar entre Mercado Livre, fornecedor, planilhas e redes sociais para cada pedido.",
    features: [
      "Importação dos pedidos pagos do Mercado Livre com tarifa e frete reais",
      "Etiqueta oficial e mensagem de repasse ao fornecedor por WhatsApp ou e-mail",
      "Controle de nota fiscal, pagamento ao fornecedor e financeiro",
      "Envio de estoque ao Mercado Livre somente após confirmação explícita",
      "Calculadora de margem com a tarifa real do marketplace",
      "Sincronização automática do Instagram da loja com o painel",
      "Instalável no computador e no celular (PWA)",
    ],
    security: [
      "Painel entregue apenas a usuários com login, verificação em duas etapas e convite",
      "Chaves de integrações guardadas criptografadas, fora do código",
    ],
    stack: ["Netlify Functions", "Supabase (PostgreSQL)", "API do Mercado Livre", "PWA"],
    published: false,
  },
];

export const publishedProjects = projects.filter((p) => p.published);

export function getPublishedProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}
