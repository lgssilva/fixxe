import type { Metadata } from "next";
import { generateSeoMetadata, breadcrumbSchema, BASE_URL } from "@/app/lib/seo";

export const metadata: Metadata = {
  ...generateSeoMetadata("checkout"),
  robots: { index: false, follow: false },
};

const breadcrumb = breadcrumbSchema([
  { name: "Início",   url: BASE_URL },
  { name: "Checkout", url: `${BASE_URL}/checkout` },
]);

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
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
