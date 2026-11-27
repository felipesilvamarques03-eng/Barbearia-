import { Container } from "@/components/ui/container";
import { WaitlistForm } from "./waitlist-form";

export function Waitlist() {
  return (
    <section id="lista" aria-labelledby="lista-title" className="border-t border-[#1c2029]">
      <Container className="grid gap-16 py-28 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">Lista de espera</span>
          <h2
            id="lista-title"
            className="font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.01em] text-balance sm:text-[44px]"
          >
            Seja avisado quando as inscrições abrirem.
          </h2>
          <p className="text-[17px] text-muted">
            Quem entra na lista recebe o aviso de abertura primeiro. Contar o que você quer criar nos ajuda a montar
            os primeiros projetos guiados.
          </p>
        </div>
        <WaitlistForm />
      </Container>
    </section>
  );
}
