import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Sobre a Fixxe | Impressão 3D em Cascais, Lisboa" },
  description: "Conhece a equipa Fixxe: a nossa missão, valores e paixão pela impressão 3D de alta qualidade feita em Cascais, Lisboa.",
  openGraph: {
    title: "Sobre a Fixxe | Impressão 3D em Cascais, Lisboa",
    description: "Conhece a equipa Fixxe: a nossa missão, valores e paixão pela impressão 3D de alta qualidade feita em Cascais, Lisboa.",
    url: "https://fixxe.pt/sobre",
  },
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
