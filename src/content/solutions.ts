/** Soluções por segmento (página /solucoes). Exemplos do que dá para construir, não promessas de resultado. */
export type Solution = {
  segment: string;
  pains: string;
  examples: string[];
};

export const solutions: Solution[] = [
  {
    segment: "Beleza e bem-estar",
    pains: "Barbearias, salões, estúdios e clínicas de estética que vivem de agenda e de clientes que voltam.",
    examples: [
      "Fila ou agenda online com aviso pelo WhatsApp",
      "Faturamento por período e por serviço",
      "Lista de clientes que sumiram, com botão para chamar de volta",
    ],
  },
  {
    segment: "Saúde",
    pains: "Consultórios e clínicas que precisam de agenda organizada e cuidado redobrado com dados sensíveis.",
    examples: [
      "Agendamento online com confirmação automática",
      "Cadastro de pacientes com controle de acesso por perfil",
      "Site profissional com informações claras e conformidade com a LGPD",
    ],
  },
  {
    segment: "Varejo e e-commerce",
    pains: "Lojas físicas e online que perdem tempo com pedidos, estoque e marketplaces separados.",
    examples: [
      "Painel que centraliza pedidos de marketplaces",
      "Controle de estoque, notas fiscais e financeiro",
      "Integração com fornecedores e redes sociais",
    ],
  },
  {
    segment: "Serviços profissionais",
    pains: "Escritórios de advocacia, contabilidade, engenharia e consultoria que dependem de credibilidade.",
    examples: [
      "Site institucional que transmite confiança",
      "Portal do cliente para envio e acompanhamento de documentos",
      "Automação de orçamentos, contratos e lembretes",
    ],
  },
];
