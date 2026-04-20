import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Materiais de Impressão 3D | Fixxe" },
  description: "PLA, PETG, ABS e Resina: conhece os materiais que a Fixxe usa para criar peças únicas de impressão 3D. Características, aplicações e comparações.",
  openGraph: {
    title: "Materiais de Impressão 3D | Fixxe",
    description: "PLA, PETG, ABS e Resina: conhece os materiais que a Fixxe usa para criar peças únicas.",
    url: "https://fixxe3d.com/materiais",
  },
};

export default function MateriaisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
