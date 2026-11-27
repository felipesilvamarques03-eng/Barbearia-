import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AuthForm } from "../auth-form";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <Container className="grid max-w-[1000px] items-center gap-12 py-20 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-4xl font-semibold leading-tight">Bem-vindo de volta.</h1>
        <p className="text-muted">Entre para continuar de onde parou na trilha.</p>
      </div>
      <AuthForm mode="entrar" />
    </Container>
  );
}
