import Link from "next/link";
import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

/** Ano gerado no build e guardado em cache, revalidado diariamente (exigência do Cache Components). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-[#1c2029]">
      <Container className="flex flex-wrap justify-between gap-6 py-12 text-sm text-muted">
        <div className="flex flex-col gap-2">
          <span className="font-display text-lg font-bold tracking-[0.08em] text-ink">NEXORA</span>
          <span>Tecnologia sob medida.</span>
          {siteConfig.cnpj ? <span>CNPJ {siteConfig.cnpj}</span> : null}
        </div>
        <nav aria-label="Rodapé" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/#servicos" className="hover:text-ink">Serviços</Link>
          <Link href="/#portfolio" className="hover:text-ink">Portfólio</Link>
          <Link href="/#contato" className="hover:text-ink">Contato</Link>
          <Link href="/politica-de-privacidade" className="hover:text-ink">Política de Privacidade</Link>
          <span>© <CurrentYear /> {siteConfig.name}</span>
        </nav>
      </Container>
    </footer>
  );
}
