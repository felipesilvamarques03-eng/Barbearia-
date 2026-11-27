import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a NEXORA coleta, usa e protege dados pessoais, conforme a LGPD (Lei 13.709/2018).",
  alternates: { canonical: "/politica-de-privacidade" },
};

/*
 * MINUTA. Antes do lançamento das assinaturas, preencha os campos entre colchetes
 * e peça a revisão de um advogado (pagamentos e área de membros ampliam o tratamento de dados).
 */
export default function PrivacyPage() {
  const contato = siteConfig.email || "[E-MAIL PARA ASSUNTOS DE PRIVACIDADE]";

  return (
    <Container className="max-w-[760px] py-20">
      <article className="flex flex-col gap-6 text-ink-2 [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc">
        <h1 className="font-display text-4xl font-semibold text-ink">Política de Privacidade</h1>
        <p className="text-sm text-muted">Versão de pré-lançamento. Última atualização: 27 de novembro de 2026.</p>

        <p>
          Esta política explica como a {siteConfig.name} ([RAZÃO SOCIAL], CNPJ {siteConfig.cnpj || "[CNPJ]"}) trata os
          dados pessoais de quem visita este site e se inscreve na lista de espera, em conformidade com a Lei Geral de
          Proteção de Dados (Lei nº 13.709/2018).
        </p>

        <h2>Quais dados coletamos</h2>
        <ul>
          <li>
            Dados que você informa na lista de espera: nome, e-mail, WhatsApp (opcional), nível de experiência e,
            se quiser, o que gostaria de criar.
          </li>
          <li>Dados técnicos mínimos para o funcionamento e a segurança do site, como endereço IP e registros de acesso.</li>
        </ul>

        <h2>Para que usamos</h2>
        <ul>
          <li>Avisar você sobre a abertura das inscrições e sobre o lançamento da plataforma.</li>
          <li>Entender o perfil dos interessados para planejar as primeiras aulas e projetos.</li>
          <li>Proteger o site contra abuso, spam e ataques.</li>
        </ul>
        <p>Não vendemos seus dados nem os compartilhamos para marketing de terceiros.</p>

        <h2>Base legal</h2>
        <p>Consentimento (art. 7º, I), dado ao marcar a caixa do formulário. Você pode revogá-lo quando quiser.</p>

        <h2>Com quem compartilhamos</h2>
        <p>
          Apenas com fornecedores necessários para operar o site. Hoje, a Netlify (hospedagem e armazenamento das
          inscrições), com servidores nos Estados Unidos. A transferência internacional segue as garantias previstas
          na LGPD.
        </p>

        <h2>Por quanto tempo guardamos</h2>
        <p>
          Até o lançamento da plataforma e por até 12 meses depois, ou até você pedir a exclusão, o que vier
          primeiro. [CONFIRMAR PRAZO]
        </p>

        <h2>Seus direitos</h2>
        <p>
          Você pode pedir confirmação, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, e
          revogar o consentimento, escrevendo para {contato}.
        </p>

        <h2>Cookies</h2>
        <p>Este site não utiliza cookies de rastreamento ou publicidade.</p>

        <h2>Contato</h2>
        <p>Encarregado pelo tratamento de dados: [NOME DO ENCARREGADO] — {contato}.</p>
      </article>
    </Container>
  );
}
