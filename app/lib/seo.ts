import type { Metadata } from "next";
import type { Product } from "@/app/lib/tokens";

export const BASE_URL = "https://fixxe.pt";
export const SITE_NAME = "Fixxe";
export const DEFAULT_DESCRIPTION =
  "Peças únicas de impressão 3D de alta qualidade, feitas em Cascais. PLA, PETG, ABS e Resina. Decoração, organização e peças personalizadas.";
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-fixxe.jpg`;

/* ── SEO por página ─────────────────────────────── */

interface PageSeo {
  title: string;
  description: string;
  keywords: string;
  path: string;
}

export const PAGE_SEO = {
  home: {
    title: "Fixxe | Impressão 3D em Cascais, Lisboa",
    description: DEFAULT_DESCRIPTION,
    keywords: "impressão 3d, cascais, lisboa, pla, petg, abs, resina, decoração, organização, personalizado, fixxe",
    path: "/",
  },
  produtos: {
    title: "Produtos de Impressão 3D | Fixxe",
    description: "Explora o catálogo completo da Fixxe: vasos, organizadores, ferramentas e peças personalizadas. Filtros por material e categoria.",
    keywords: "produtos impressão 3d, vaso 3d, organizador 3d, peças pla, petg, abs, resina, comprar impressão 3d",
    path: "/produtos",
  },
  carrinho: {
    title: "Carrinho | Fixxe",
    description: "O teu carrinho de compras na Fixxe. Peças de impressão 3D artesanais, feitas em Cascais.",
    keywords: "carrinho, comprar, fixxe",
    path: "/carrinho",
  },
  checkout: {
    title: "Checkout | Fixxe",
    description: "Finaliza a tua encomenda na Fixxe. Pagamento seguro via Stripe, PayPal e MB Way.",
    keywords: "checkout, pagamento, encomenda, fixxe",
    path: "/checkout",
  },
  sobre: {
    title: "Sobre Nós | Fixxe — Impressão 3D em Cascais",
    description: "Conhece a Fixxe: a nossa missão, os nossos valores e a paixão pela impressão 3D de alta qualidade em Cascais, Lisboa.",
    keywords: "sobre fixxe, impressão 3d cascais, quem somos",
    path: "/sobre",
  },
  contacto: {
    title: "Contacto | Fixxe",
    description: "Entra em contacto com a Fixxe. Email, telefone e localização em Cascais.",
    keywords: "contacto fixxe, email, telefone, cascais",
    path: "/contacto",
  },
} satisfies Record<string, PageSeo>;

/* ── generateSeoMetadata ────────────────────────── */

export function generateSeoMetadata(
  page: keyof typeof PAGE_SEO,
  overrides?: Partial<PageSeo>
): Metadata {
  const seo = { ...PAGE_SEO[page], ...overrides };
  const url = `${BASE_URL}${seo.path}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: seo.title }],
      type: "website",
      locale: "pt_PT",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [DEFAULT_OG_IMAGE],
      site: "@fixxe_pt",
    },
    robots: { index: true, follow: true },
  };
}

export function generateProductMetadata(product: Product): Metadata {
  const title = `${product.name} | Fixxe — Impressão 3D`;
  const url = `${BASE_URL}/produtos/${product.slug}`;

  return {
    title,
    description: `${product.desc} Material: ${product.material}. Dimensões: ${product.dimensions}. Peso: ${product.weight}. Feito em Cascais.`,
    keywords: `${product.name.toLowerCase()}, impressão 3d, ${product.material.toLowerCase()}, ${product.category.toLowerCase()}, fixxe`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: product.desc,
      url,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: product.name }],
      type: "website",
      locale: "pt_PT",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.desc,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

/* ── JSON-LD schemas ────────────────────────────── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-fixxe.svg` },
    description: DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cascais",
      addressRegion: "Lisboa",
      addressCountry: "PT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+351912345678",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    sameAs: [
      "https://instagram.com/fixxe.pt",
      "https://tiktok.com/@fixxe.pt",
      "https://linkedin.com/company/fixxe",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "pt-PT",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/produtos?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.desc,
    sku: `FX-${String(product.id).padStart(4, "0")}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: product.category,
    material: product.material,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/produtos/${product.slug}`,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
