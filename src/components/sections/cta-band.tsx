import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";

type Props = { title?: string; text?: string };

/** Chamada final das páginas internas, levando ao formulário de contato. */
export function CtaBand({
  title = "Vamos conversar sobre o seu projeto?",
  text = "Conte o que você precisa. Retornamos com os próximos passos, sem compromisso.",
}: Props) {
  return (
    <section className="border-t border-[#1c2029] bg-bg-alt">
      <Container className="flex flex-col items-start gap-6 py-20 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-[640px] flex-col gap-2">
          <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-[-0.01em]">{title}</h2>
          <p className="text-muted">{text}</p>
        </div>
        <ButtonLink href="/#contato">Solicitar orçamento</ButtonLink>
      </Container>
    </section>
  );
}
