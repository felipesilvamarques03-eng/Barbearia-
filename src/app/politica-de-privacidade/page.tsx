import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a NEXORA coleta, usa e protege dados pessoais, conforme a LGPD (Lei 13.709/2018).",
  alternates: { canonical: "/politica-de-privacidade" },
};

/*
 * MINUTA. Antes de publicar, preencha os campos entre colchetes e peça a revisão de um advogado.
 */
export default function PrivacyPage() {
  const contato = siteConfig.email || "[E-MAIL PARA ASSUNTOS DE PRIVACIDADE]";

  return (
    <Container className="max-w-[760px] py-20">
      <article className="flex flex-col gap-6 text-ink-2 [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc">
        <h1 className="font-display text-4xl font-semibold text-ink">Política de Privacidade</h1>
        <p className="text-sm text-muted">Última atualização: [DATA DA PUBLICAÇÃO]</p>

        <p>
          Esta política explica como a {siteConfig.legalName} ([RAZÃO SOCIAL], CNPJ{" "}
          {siteConfig.cnpj || "[CNPJ]"}) trata os dados pessoais de quem visita este site ou entra em contato
          conosco, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
        </p>

        <h2>Quais dados coletamos</h2>
        <ul>
          <li>Dados que você informa no formulário de contato: nome, e-mail, WhatsApp (opcional), tipo de projeto e mensagem.</li>
          <li>Dados técnicos mínimos necessários para o funcionamento e a segurança do site, como endereço IP e registros de acesso.</li>
        </ul>

        <h2>Para que usamos</h2>
        <ul>
          <li>Responder ao seu contato e enviar proposta comercial quando solicitada.</li>
          <li>Proteger o site contra abuso, spam e ataques.</li>
        </ul>
        <p>Não vendemos nem compartilhamos seus dados para fins de marketing de terceiros.</p>

        <h2>Base legal</h2>
        <p>
          Consentimento (art. 7º, I), dado ao marcar a caixa do formulário, e procedimentos preliminares relacionados a
          contrato, a pedido do titular (art. 7º, V).
        </p>

        <h2>Com quem compartilhamos</h2>
        <p>
          Apenas com fornecedores necessários para operar o serviço, como hospedagem do site e envio de e-mails, que
          tratam os dados somente conforme nossas instruções. [LISTAR FORNECEDORES QUANDO DEFINIDOS]
        </p>

        <h2>Por quanto tempo guardamos</h2>
        <p>
          Pelo tempo necessário para responder ao contato e conduzir a negociação, ou conforme exigido por lei.
          [PRAZO DE RETENÇÃO]
        </p>

        <h2>Seus direitos</h2>
        <p>
          Você pode pedir a qualquer momento confirmação, acesso, correção, anonimização, portabilidade ou exclusão
          dos seus dados, e revogar o consentimento, escrevendo para {contato}.
        </p>

        <h2>Cookies</h2>
        <p>Este site não utiliza cookies de rastreamento ou publicidade.</p>

        <h2>Contato</h2>
        <p>Encarregado pelo tratamento de dados: [NOME DO ENCARREGADO] — {contato}.</p>
      </article>
    </Container>
  );
}
