import type { Metadata } from "next";
import { ALL_PRODUCTS } from "@/app/lib/tokens";
import {
  generateProductMetadata,
  productSchema,
  breadcrumbSchema,
  BASE_URL,
} from "@/app/lib/seo";

interface Props {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = ALL_PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return { title: "Produto | Fixxe", description: "Produto de impressão 3D da Fixxe." };
  }
  return generateProductMetadata(product);
}

export default function ProductDetailLayout({ children, params }: Props) {
  const product = ALL_PRODUCTS.find((p) => p.slug === params.slug);

  const schemas = [
    breadcrumbSchema([
      { name: "Início",   url: BASE_URL },
      { name: "Produtos", url: `${BASE_URL}/produtos` },
      { name: product?.name ?? "Produto", url: `${BASE_URL}/produtos/${params.slug}` },
    ]),
    ...(product ? [productSchema(product)] : []),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
