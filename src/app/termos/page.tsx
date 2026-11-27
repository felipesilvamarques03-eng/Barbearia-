import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Regras de uso da plataforma NEXORA.",
  alternates: { canonical: "/termos" },
};

/*
 * MINUTA. Antes de iniciar cobranças, preencher os campos entre colchetes
 * e revisar com advogado (Código de Defesa do Consumidor e Marco Civil da Internet).
 */
export default function TermsPage() {
  return (
    <Container className="max-w-[760px] py-20">
      <article className="flex flex-col gap-6 text-ink-2 [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc">
        <h1 className="font-display text-4xl font-semibold text-ink">Termos de Uso</h1>
        <p className="text-sm text-muted">Última atualização: 27 de novembro de 2026.</p>

        <p>
          Estes termos regulam o uso da plataforma {siteConfig.name}, oferecida por [RAZÃO SOCIAL], CNPJ{" "}
          {siteConfig.cnpj || "[CNPJ]"}. Ao criar uma conta, você concorda com eles.
        </p>

        <h2>1. A plataforma</h2>
        <p>
          A {siteConfig.name} oferece conteúdo educacional sobre criação de sites, sistemas e aplicativos com o apoio
          de inteligência artificial. O Módulo 1 é gratuito. Os demais conteúdos são liberados para assinantes.
        </p>

        <h2>2. Sua conta</h2>
        <ul>
          <li>Você é responsável por manter sua senha em sigilo e pelas ações feitas com a sua conta.</li>
          <li>A conta é pessoal e intransferível. Não é permitido compartilhar o acesso.</li>
          <li>É preciso ter 18 anos ou autorização do responsável legal.</li>
        </ul>

        <h2>3. Assinatura</h2>
        <ul>
          <li>A assinatura é mensal, com renovação automática, e pode ser cancelada a qualquer momento, sem multa.</li>
          <li>
            Você pode desistir em até 7 dias após a contratação com reembolso integral (art. 49 do Código de Defesa do
            Consumidor).
          </li>
          <li>Os pagamentos são processados pelo Mercado Pago. Não armazenamos dados de cartão.</li>
        </ul>

        <h2>4. Conteúdo</h2>
        <p>
          As aulas e materiais são protegidos por direitos autorais. Você pode usar o que aprender nos seus projetos,
          mas não pode copiar, revender ou redistribuir o conteúdo.
        </p>

        <h2>5. Limites</h2>
        <p>
          O conteúdo é educacional. Os resultados dependem da sua dedicação e não há garantia de renda ou de
          resultados profissionais. As ferramentas de terceiros citadas nas aulas têm seus próprios termos e preços.
        </p>

        <h2>6. Conduta</h2>
        <p>
          É proibido usar a plataforma ou a comunidade para atividades ilegais, assédio, spam ou tentativa de acessar
          dados de outras pessoas. Contas que descumprirem estes termos podem ser suspensas.
        </p>

        <h2>7. Contato</h2>
        <p>{siteConfig.email || "[E-MAIL DE CONTATO]"}. Foro: [CIDADE/UF].</p>
      </article>
    </Container>
  );
}
