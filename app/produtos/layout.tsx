import type { Metadata } from "next";
import { generateSeoMetadata, breadcrumbSchema, BASE_URL } from "@/app/lib/seo";

export const metadata: Metadata = generateSeoMetadata("produtos");

const breadcrumb = breadcrumbSchema([
  { name: "Início",   url: BASE_URL },
  { name: "Produtos", url: `${BASE_URL}/produtos` },
]);

export default function ProdutosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {children}
    </>
  );
}
