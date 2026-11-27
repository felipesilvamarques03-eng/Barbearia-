import { Hero } from "@/components/sections/hero";
import { Audience, Curriculum, Faq, Includes, Journey, Pricing } from "@/components/sections/landing-sections";
import { Waitlist } from "@/components/sections/waitlist";
import { faq } from "@/content/home";
import { siteConfig } from "@/lib/site-config";

/** Dados estruturados (JSON-LD) para o Google entender a organização e o FAQ. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
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
      <Audience />
      <Includes />
      <Journey />
      <Curriculum />
      <Pricing />
      <Faq />
      <Waitlist />
    </>
  );
}
