import { icons } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/site-config";

/** Botão flutuante. Só aparece quando NEXT_PUBLIC_WHATSAPP_NUMBER está configurado. */
export function WhatsAppButton() {
  const href = whatsappLink();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a NEXORA pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-bg shadow-lg transition-transform hover:scale-105"
    >
      <icons.chat width={26} height={26} strokeWidth={1.8} />
    </a>
  );
}
