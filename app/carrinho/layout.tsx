import type { Metadata } from "next";
import { generateSeoMetadata, breadcrumbSchema, BASE_URL } from "@/app/lib/seo";

export const metadata: Metadata = {
  ...generateSeoMetadata("carrinho"),
  robots: { index: false, follow: false },
};

const breadcrumb = breadcrumbSchema([
  { name: "Início",   url: BASE_URL },
  { name: "Carrinho", url: `${BASE_URL}/carrinho` },
]);

export default function CarrinhoLayout({ children }: { children: React.ReactNode }) {
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
