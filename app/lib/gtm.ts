/* ── Google Tag Manager utilities ─────────────────
   Usage:
     initGTM("GTM-XXXXXXX")           — injected by layout.tsx via env
     pushDataLayer("event", { ... })  — generic event push
     trackPageView(url)               — virtualPageView
     trackAddToCart(product)          — ecommerce addToCart
     trackPurchase(order)             — ecommerce purchase
   ─────────────────────────────────────────────── */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/* Ensure dataLayer exists before GTM loads */
export function initDataLayer() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
}

/* Generic push */
export function pushDataLayer(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...data });
}

/* Page view (for SPA routing) */
export function trackPageView(url: string) {
  pushDataLayer("virtualPageView", {
    page: { path: url, title: typeof document !== "undefined" ? document.title : "" },
  });
}

/* Add to cart */
export function trackAddToCart(product: {
  id: number;
  name: string;
  price: number;
  material: string;
  category: string;
  qty?: number;
}) {
  pushDataLayer("add_to_cart", {
    ecommerce: {
      currency: "EUR",
      value: product.price * (product.qty ?? 1),
      items: [
        {
          item_id: `FX-${String(product.id).padStart(4, "0")}`,
          item_name: product.name,
          price: product.price,
          quantity: product.qty ?? 1,
          item_category: product.category,
          item_variant: product.material,
          item_brand: "Fixxe",
        },
      ],
    },
  });
}

/* Purchase */
export function trackPurchase(order: {
  id: string;
  total: number;
  shipping: number;
  items: { id: number; name: string; price: number; qty: number; material: string; category: string }[];
}) {
  pushDataLayer("purchase", {
    ecommerce: {
      transaction_id: order.id,
      currency: "EUR",
      value: order.total,
      shipping: order.shipping,
      items: order.items.map(item => ({
        item_id: `FX-${String(item.id).padStart(4, "0")}`,
        item_name: item.name,
        price: item.price,
        quantity: item.qty,
        item_category: item.category,
        item_variant: item.material,
        item_brand: "Fixxe",
      })),
    },
  });
}

/* GTM head snippet (returns the string to embed) */
export function gtmHeadSnippet(containerId: string) {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`;
}

/* GTM noscript iframe src */
export function gtmNoscriptSrc(containerId: string) {
  return `https://www.googletagmanager.com/ns.html?id=${containerId}`;
}
