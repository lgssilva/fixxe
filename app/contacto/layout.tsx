import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Contacto | Fixxe" },
  description: "Entra em contacto com a Fixxe. Email, telefone, morada em Cascais e formulário de contacto. Respondemos em menos de 24 horas.",
  openGraph: {
    title: "Contacto | Fixxe",
    description: "Entra em contacto com a Fixxe. Respondemos em menos de 24 horas.",
    url: "https://fixxe.pt/contacto",
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
