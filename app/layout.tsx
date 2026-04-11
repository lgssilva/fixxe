import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import {
  organizationSchema,
  websiteSchema,
  BASE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "@/app/lib/seo";
import { gtmHeadSnippet } from "@/app/lib/gtm";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

/* ── Configurações de marketing (env vars) ────── */
const GTM_ID  = process.env.NEXT_PUBLIC_GTM_ID  ?? "";
const GA_ID   = process.env.NEXT_PUBLIC_GA_ID   ?? "";
const GSC_VER = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";
const META_VER= process.env.NEXT_PUBLIC_META_VERIFICATION ?? "";

/* ── Metadata global (override por layout de rota) */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} | Impressão 3D em Cascais, Lisboa`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: "impressão 3d, cascais, lisboa, pla, petg, abs, resina, decoração, organização, personalizado",
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Impressão 3D em Cascais, Lisboa`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fixxe_pt",
    creator: "@fixxe_pt",
    title: `${SITE_NAME} | Impressão 3D em Cascais, Lisboa`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: {
    ...(GSC_VER  ? { google: GSC_VER }          : {}),
    ...(META_VER ? { other: { "facebook-domain-verification": [META_VER] } } : {}),
  },
  alternates: { canonical: BASE_URL },
};

/* ── JSON-LD raiz ────────────────────────────── */
const ROOT_SCHEMAS = [organizationSchema(), websiteSchema()];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <head>
        {/* JSON-LD — Organization + WebSite */}
        {ROOT_SCHEMAS.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Google Tag Manager — head snippet */}
        {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {gtmHeadSnippet(GTM_ID)}
          </Script>
        )}

        {/* Google Analytics (standalone, sem GTM) */}
        {GA_ID && !GTM_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager — noscript body */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {children}
      </body>
    </html>
  );
}
