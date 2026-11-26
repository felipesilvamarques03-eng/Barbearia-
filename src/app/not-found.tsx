import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-6 py-32">
      <span className="font-display text-sm text-accent">Erro 404</span>
      <h1 className="font-display text-4xl font-semibold">Esta página não existe.</h1>
      <p className="text-muted">O endereço pode ter mudado ou sido digitado incorretamente.</p>
      <ButtonLink href="/">Voltar para o início</ButtonLink>
    </Container>
  );
}
