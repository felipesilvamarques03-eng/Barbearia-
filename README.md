# NEXORA — site institucional

Site da NEXORA, feito com Next.js 16 (App Router), TypeScript, Tailwind CSS 4 e Zod.

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
| `src/app/` | Páginas e rotas (`page.tsx` = página inicial) |
| `src/app/actions/contact.ts` | Envio do formulário (roda só no servidor) |
| `src/components/layout/` | Cabeçalho, rodapé, logo, botão do WhatsApp |
| `src/components/sections/` | Seções da página inicial |
| `src/components/ui/` | Peças reutilizáveis (botão, container, ícones) |
| `src/content/` | **Textos do site**: edite aqui sem mexer no layout |
| `src/lib/site-config.ts` | Nome, contatos, menu |
| `src/lib/validation.ts` | Regras de validação do formulário |
| `src/app/globals.css` | Cores e fontes (design tokens) |

Para trocar a cor de destaque, altere `--color-accent` e `--color-accent-soft` em `src/app/globals.css`.

## Variáveis de ambiente

Veja `.env.example`. Variáveis `NEXT_PUBLIC_*` ficam visíveis no navegador, então nunca coloque segredos nelas.
`RESEND_API_KEY` é secreta: configure-a apenas no painel da hospedagem e no `.env.local`, que nunca vai para o Git.

## Segurança já implementada

- Validação do formulário no navegador e de novo no servidor (Zod)
- Honeypot contra robôs
- Conteúdo do visitante escapado antes de entrar no e-mail (contra XSS)
- Cabeçalhos HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy
- Nenhum dado pessoal gravado em logs

## Pendências conhecidas

- Turnstile (antibot) e limite de envios por IP — Etapa 6
- Content-Security-Policy completa — Etapa 7
- Política de Privacidade é uma **minuta**: preencher os campos entre colchetes e revisar com advogado
- Portfólio: cases só aparecem quando `published: true` em `src/content/projects.ts`, e apenas com fatos reais
- O menu móvel não fecha sozinho ao tocar num link
