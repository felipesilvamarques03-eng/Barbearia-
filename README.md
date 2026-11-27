# NEXORA — página de pré-lançamento

Site da NEXORA, plataforma de assinatura mensal para aprender a criar sites, sistemas e apps com IA.
Fase atual: **pré-lançamento com lista de espera**. Próximas fases: área de membros (Supabase) e assinaturas (Mercado Pago).

Feito com Next.js 16 (App Router), TypeScript, Tailwind CSS 4 e Zod. Hospedado na Netlify.

## Como rodar no seu computador

Pré-requisito: Node.js 20.9 ou mais novo.

```bash
npm install                 # instala as dependências (só na primeira vez)
cp .env.example .env.local  # cria o arquivo de configuração local e preencha os valores
npm run dev                 # abre em http://localhost:3000
```

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run build` | Gera a versão de produção e acusa erros |
| `npm run start` | Roda a versão de produção gerada pelo build |
| `npm run lint` | Verifica a qualidade do código |

## Onde fica cada coisa

| Pasta / arquivo | Conteúdo |
| --- | --- |
| `src/app/page.tsx` | Página principal (ordem das seções) |
| `src/content/home.ts` | **Textos, preço e trilha**: edite aqui sem mexer no layout |
| `src/components/sections/` | Seções da página e formulário da lista de espera |
| `src/components/layout/` | Cabeçalho, rodapé, logo, botão do WhatsApp |
| `src/lib/validation.ts` | Regras de validação da lista de espera |
| `public/__forms.html` | Esqueleto do formulário para a Netlify Forms (nomes dos campos devem bater com o componente) |
| `src/app/globals.css` | Cores e fontes (design tokens) |

Para trocar o preço, altere `priceMonthly` em `src/content/home.ts`.
Para trocar a cor de destaque, altere `--color-accent` e `--color-accent-soft` em `src/app/globals.css`.

## Lista de espera

As inscrições são recebidas pela **Netlify Forms** (painel da Netlify → Forms → `lista-de-espera`), com filtro de spam e honeypot. Exporte em CSV e apague periodicamente (LGPD).

## Variáveis de ambiente

Veja `.env.example`. Variáveis `NEXT_PUBLIC_*` ficam visíveis no navegador, então nunca coloque segredos nelas.
`RESEND_API_KEY` é secreta: configure-a apenas no painel da hospedagem e no `.env.local`, que nunca vai para o Git.

## Segurança já implementada

- Validação do formulário com Zod antes do envio
- Honeypot e filtro de spam (Akismet) da Netlify; conteúdo higienizado pela Netlify
- Cabeçalhos HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy
- Nenhum dado pessoal gravado em logs

## Pendências conhecidas

- Área de membros (login, aulas, progresso) — Supabase
- Assinatura recorrente — Mercado Pago (Pix e cartão), com webhooks e termos de uso
- Content-Security-Policy completa
- Política de Privacidade é uma **minuta**: preencher os campos entre colchetes e revisar com advogado
