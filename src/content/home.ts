import type { IconName } from "@/components/ui/icons";

/*
 * Textos da página inicial.
 * Ficam aqui, separados dos componentes, para que mudar um texto não exija mexer no layout.
 * Regra da casa: nada de números, clientes ou resultados inventados.
 */

export const problems = [
  {
    title: "Processos manuais tomando o seu dia",
    text: "Agendas no papel, planilhas soltas e retrabalho que poderiam ser automatizados.",
  },
  {
    title: "Presença digital que não traz clientes",
    text: "Um site que não aparece no Google, não funciona no celular e não converte visitas.",
  },
  {
    title: "Sistemas genéricos que não se encaixam",
    text: "Ferramentas prontas que obrigam o seu negócio a se adaptar a elas, e não o contrário.",
  },
] as const;

export const services: { icon: IconName; title: string; text: string }[] = [
  { icon: "site", title: "Sites institucionais", text: "Rápidos, bonitos no celular e prontos para aparecer no Google." },
  { icon: "system", title: "Sistemas web", text: "Agendamentos, painéis, cadastros e gestão sob medida para o seu processo." },
  { icon: "app", title: "Aplicativos", text: "Apps para celular e web que seus clientes e sua equipe usam de verdade." },
  { icon: "automation", title: "Automações", text: "Integrações e rotinas automáticas que eliminam trabalho repetitivo." },
  { icon: "ai", title: "Soluções com IA", text: "Atendimento, análise de documentos e assistentes preparados para o seu negócio." },
  { icon: "shield", title: "Manutenção e suporte", text: "Atualizações, backups, monitoramento e melhorias contínuas após a entrega." },
];

export const method = [
  { title: "Entendimento", text: "Reunião para entender o problema, o público e o objetivo do projeto." },
  { title: "Proposta e arquitetura", text: "Escopo fechado, prazo, investimento e plano técnico por escrito." },
  { title: "Protótipo", text: "Você vê e aprova as telas antes de qualquer linha de código." },
  { title: "Desenvolvimento e testes", text: "Entregas por etapas, com testes funcionais e de segurança." },
  { title: "Entrega e suporte", text: "Publicação, documentação, treinamento e acompanhamento." },
] as const;

/** Etapas mostradas no painel do hero (ilustrativo, marcado como "Exemplo"). */
export const heroSteps = [
  { label: "Levantamento de requisitos", status: "done" },
  { label: "Arquitetura e protótipo", status: "done" },
  { label: "Desenvolvimento", status: "current" },
  { label: "Testes funcionais e de segurança", status: "next" },
  { label: "Implantação e entrega", status: "next" },
] as const;

export const differentials = [
  { title: "Segurança desde o início", text: "Autenticação, validação de dados e proteção contra ataques comuns em todo projeto." },
  { title: "LGPD levada a sério", text: "Dados pessoais tratados com consentimento, controle de acesso e transparência." },
  { title: "O código é seu", text: "Você recebe o projeto, a documentação e os acessos. Sem prisão a fornecedor." },
  { title: "Comunicação clara", text: "Sem jargão: você sabe o que está pronto, o que falta e o que precisa decidir." },
] as const;

export const faq = [
  {
    q: "Quanto custa um projeto?",
    a: "O valor depende do escopo. Depois de uma conversa inicial, você recebe uma proposta com escopo, prazo e investimento fechados.",
  },
  {
    q: "Quanto tempo leva?",
    a: "Um site institucional costuma levar de 3 a 5 semanas. Sistemas e aplicativos têm o prazo definido na proposta, de acordo com o escopo.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Não. Explicamos cada etapa em linguagem simples e você aprova as telas antes do desenvolvimento começar.",
  },
  {
    q: "E depois da entrega?",
    a: "Você recebe a documentação e os acessos do projeto. Também oferecemos planos de manutenção e suporte.",
  },
] as const;
