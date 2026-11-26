import { Container } from "@/components/ui/container";
import { icons } from "@/components/ui/icons";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { ContactForm } from "./contact-form";

export function Contact() {
  const wa = whatsappLink();

  return (
    <section id="contato" aria-labelledby="contato-title" className="border-t border-[#1c2029] bg-bg-alt">
      <Container className="grid gap-16 py-28 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">Contato</span>
          <h2
            id="contato-title"
            className="font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.01em] text-balance sm:text-[44px]"
          >
            Conte a sua ideia. A gente transforma em projeto.
          </h2>
          <p className="text-[17px] text-muted">
            Responda algumas perguntas rápidas e retornamos com os próximos passos. Sem compromisso.
          </p>
          <ul className="flex flex-col gap-2 text-base">
            {wa ? (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2.5 hover:text-accent">
                  <icons.chat width={20} height={20} /> Conversar pelo WhatsApp
                </a>
              </li>
            ) : null}
            {siteConfig.email ? (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-11 items-center gap-2.5 hover:text-accent">
                  <icons.mail width={20} height={20} /> {siteConfig.email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
