import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Nossa Farm | Fixxe 3D — Produção 3D em Cascais",
  description:
    "A nossa farm de impressão 3D em Cascais tem capacidade para centenas de peças por dia. Prototipagem em 24-48h, produção em série e personalização total. Somos a fábrica da tua marca.",
  keywords:
    "farm impressão 3d cascais, produção série 3d lisboa, prototipagem rápida portugal, fabricação aditiva cascais",
  openGraph: {
    title: "A Nossa Farm | Fixxe 3D — Produção 3D em Cascais",
    description:
      "Capacidade para centenas de peças por dia. Prototipagem em 24-48h. A fábrica 3D da tua marca em Cascais.",
    url: "https://fixxe3d.com/farm",
  },
};

export default function FarmLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
