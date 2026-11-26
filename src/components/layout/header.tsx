import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1c2029] bg-bg/90 backdrop-blur">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="NEXORA, página inicial" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 text-[15px] md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink-2 transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/#contato" className="min-h-11 px-[18px] py-2">
            Solicitar orçamento
          </ButtonLink>
        </nav>

        {/* Menu móvel sem JavaScript: <details> abre e fecha nativamente e funciona com teclado. */}
        <MobileMenu>
          <nav
            aria-label="Principal (móvel)"
            className="absolute right-0 top-14 flex w-64 flex-col gap-1 rounded-2xl border border-line bg-surface p-3 shadow-xl"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-ink-2 hover:bg-surface-2 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/#contato" className="mt-2">
              Solicitar orçamento
            </ButtonLink>
          </nav>
        </MobileMenu>
      </Container>
    </header>
  );
}
