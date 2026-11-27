import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AuthForm } from "../auth-form";

export const metadata: Metadata = {
  title: "Criar conta grátis",
  description: "Crie sua conta na NEXORA e comece agora o Módulo 1, gratuito.",
  alternates: { canonical: "/cadastro" },
};

export default function SignUpPage() {
  return (
    <Container className="grid max-w-[1000px] items-center gap-12 py-20 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">Módulo 1 gratuito</span>
        <h1 className="font-display text-4xl font-semibold leading-tight">Comece hoje, sem pagar nada.</h1>
        <p className="text-muted">
          Crie sua conta e tenha acesso imediato ao Módulo 1: como funciona um site, como conversar com a IA, como
          preparar o computador e as regras de segurança. Sem cartão de crédito.
        </p>
      </div>
      <AuthForm mode="cadastro" />
    </Container>
  );
}
