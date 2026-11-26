/*
 * Portfólio.
 * IMPORTANTE: só publique cases com fatos reais e autorização do cliente.
 * Demonstrações internas devem usar kind "Projeto conceito".
 * Enquanto `published` for false, o case não aparece no site.
 */

export type Project = {
  slug: string;
  title: string;
  segment: string;
  kind: string;
  summary: string;
  published: boolean;
};

export const projects: Project[] = [
  {
    slug: "case-01",
    title: "[Case 01 — nome do projeto]",
    segment: "Beleza",
    kind: "Sistema web",
    summary: "[Problema do cliente e o que a solução mudou, só com fatos reais.]",
    published: false,
  },
  {
    slug: "case-02",
    title: "[Case 02 — nome do projeto]",
    segment: "[Segmento]",
    kind: "Site institucional",
    summary: "[Problema do cliente e o que a solução mudou, só com fatos reais.]",
    published: false,
  },
  {
    slug: "case-03",
    title: "[Case 03 — nome do projeto]",
    segment: "[Segmento]",
    kind: "Projeto conceito",
    summary: "[Demonstração identificada como projeto conceito.]",
    published: false,
  },
];

export const publishedProjects = projects.filter((p) => p.published);
