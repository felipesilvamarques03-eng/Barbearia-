import { Hero } from "@/components/sections/hero";
import {
  Differentials,
  Faq,
  Method,
  PortfolioPreview,
  Problems,
  Services,
} from "@/components/sections/home-sections";
import { Contact } from "@/components/sections/contact";
import { faq } from "@/content/home";
import { siteConfig } from "@/lib/site-config";

/** Dados estruturados (JSON-LD) para o Google entender a empresa e o FAQ. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      ...(siteConfig.email ? { email: siteConfig.email } : {}),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Conteúdo 100% nosso (sem dados de visitantes); "<" é escapado para evitar injeção.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Problems />
      <Services />
      <Method />
      <PortfolioPreview />
      <Differentials />
      <Faq />
      <Contact />
    </>
  );
}
