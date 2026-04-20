import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "As Nossas Impressoras | Fixxe 3D — Tecnologia Bambu Lab",
  description:
    "Utilizamos impressoras Bambu Lab X1 Carbon, P1S e A1 Mini — tecnologia de ponta para resultados de qualidade industrial em impressão 3D em Cascais, Lisboa.",
  keywords:
    "bambu lab portugal, impressoras 3d profissionais, x1 carbon cascais, impressão 3d alta qualidade lisboa",
  openGraph: {
    title: "As Nossas Impressoras | Fixxe 3D — Tecnologia Bambu Lab",
    description:
      "Bambu Lab X1 Carbon, P1S e A1 Mini — tecnologia industrial ao serviço da tua ideia em Cascais.",
    url: "https://fixxe3d.com/impressoras",
  },
};

export default function ImpressorasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
