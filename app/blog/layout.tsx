import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Blog | Fixxe — Impressão 3D" },
  description: "Artigos, tutoriais e novidades sobre impressão 3D. Materiais, técnicas, projetos e dicas da equipa Fixxe.",
  openGraph: {
    title: "Blog | Fixxe — Impressão 3D",
    description: "Artigos, tutoriais e novidades sobre impressão 3D. Materiais, técnicas, projetos e dicas da equipa Fixxe.",
    url: "https://fixxe3d.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
