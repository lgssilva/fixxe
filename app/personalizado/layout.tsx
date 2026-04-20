import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Projetos Personalizados | Fixxe" },
  description: "Tens uma ideia? A Fixxe transforma qualquer projecto em realidade. Peças sob medida em PLA, PETG, ABS ou Resina. Orçamento gratuito em 24h.",
  openGraph: {
    title: "Projetos Personalizados | Fixxe",
    description: "Do teu ficheiro ao produto final. Orçamento gratuito e sem compromisso.",
    url: "https://fixxe3d.com/personalizado",
  },
};

export default function PersonalizadoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
