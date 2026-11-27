import type { IconName } from "@/components/ui/icons";

/*
 * Textos da página de pré-lançamento da NEXORA (assinatura para aprender a criar apps com IA).
 * Regra da casa: nada de números de alunos, depoimentos ou resultados inventados.
 * O conteúdo da trilha é PLANEJADO e está marcado assim no site até as aulas existirem.
 */

export const plan = {
  name: "Plano NEXORA",
  /** Preço sugerido dentro da faixa decidida (R$ 29–49). Altere aqui. */
  priceMonthly: 39,
  includes: [
    "Aulas passo a passo, do zero à publicação",
    "Projetos guiados passo a passo",
    "Comunidade de alunos para tirar dúvidas",
    "Novas aulas e projetos todo mês",
    "Cancele quando quiser, sem multa",
  ],
} as const;

export const audience = [
  {
    title: "Você tem uma ideia, mas não sabe programar",
    text: "Um app para o seu negócio, um site, uma ferramenta. Você vai aprender a tirar do papel usando IA.",
  },
  {
    title: "Você quer trabalhar com tecnologia",
    text: "Aprenda a criar projetos reais para montar portfólio e atender os primeiros clientes.",
  },
  {
    title: "Você já usa IA, mas não sai do básico",
    text: "Vá além das perguntas no chat: use a IA como parceira para planejar, construir e publicar.",
  },
] as const;

export const includes: { icon: IconName; title: string; text: string }[] = [
  { icon: "site", title: "Aulas passo a passo", text: "Explicações diretas, em português, com exercícios práticos. Versões em vídeo sendo gravadas." },
  { icon: "system", title: "Projetos guiados", text: "Você constrói projetos reais do início ao fim, com o passo a passo e o código de referência." },
  { icon: "chat", title: "Comunidade", text: "Um espaço para tirar dúvidas, mostrar o que construiu e aprender com outros alunos." },
  { icon: "shield", title: "Boas práticas desde o início", text: "Segurança, proteção de dados e LGPD fazem parte de cada projeto, não são um capítulo opcional." },
];

/** Como funciona a jornada do aluno. */
export const journey = [
  { title: "Assine o plano", text: "Acesso imediato à área de membros, cancelável a qualquer momento." },
  { title: "Siga a trilha", text: "Comece pelo básico: como pensar um projeto e conversar com a IA para construí-lo." },
  { title: "Construa projetos reais", text: "Cada módulo termina com algo funcionando, publicado na internet." },
  { title: "Evolua com a comunidade", text: "Tire dúvidas, receba sugestões e acompanhe as novas aulas do mês." },
] as const;

/** Trilha inicial PLANEJADA (exibida como "em produção" até as aulas estarem prontas). */
export const curriculum = [
  { title: "Fundamentos", text: "Como funciona um site e um app, e como trabalhar com a IA como parceira." },
  { title: "Seu primeiro site", text: "Do zero a um site publicado na internet, com domínio e formulário de contato." },
  { title: "Banco de dados e login", text: "Guardar informações com segurança e criar áreas com acesso por senha." },
  { title: "Seu primeiro sistema", text: "Um sistema completo, como agendamento ou controle de pedidos." },
  { title: "Publicar e manter", text: "Colocar no ar, corrigir erros, fazer backups e cuidar da segurança." },
] as const;

export const faq = [
  {
    q: "Preciso saber programar?",
    a: "Não. O plano foi pensado para quem está começando. Você aprende os conceitos necessários enquanto constrói, com a IA ajudando a escrever o código.",
  },
  {
    q: "Posso começar de graça?",
    a: "Sim. Crie uma conta gratuita e acesse agora todo o Módulo 1. A assinatura, que libera os demais módulos, abre em breve.",
  },
  {
    q: "O que eu preciso para acompanhar?",
    a: "Um computador com internet. As ferramentas de IA usadas nas aulas têm opções gratuitas e pagas; explicamos em cada aula o que é necessário.",
  },
  {
    q: "Posso cancelar?",
    a: "Sim, a qualquer momento, sem multa. Você também tem 7 dias após a assinatura para desistir com reembolso integral, como prevê o Código de Defesa do Consumidor.",
  },
  {
    q: "Criar a conta gratuita me obriga a assinar?",
    a: "Não. A conta gratuita não pede cartão e não gera cobrança. Você só assina se quiser.",
  },
] as const;
