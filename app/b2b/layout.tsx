import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B | Fixxe 3D — Parceiro de Produção 3D para Empresas",
  description:
    "Soluções de impressão 3D para empresas em Cascais e Lisboa. Prototipagem rápida, produção em série, orçamentos em 4h, NDA garantido. O parceiro ideal para startups, arquitetura e indústria.",
  keywords:
    "impressão 3d empresas, b2b cascais, prototipagem industrial lisboa, produção série 3d, parceiro fabricação 3d portugal",
  openGraph: {
    title: "B2B | Fixxe 3D — Parceiro de Produção 3D para Empresas",
    description:
      "Soluções de impressão 3D para empresas em Cascais e Lisboa. Prototipagem rápida, produção em série, orçamentos em 4h.",
    url: "https://fixxe3d.com/b2b",
  },
};

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
