"use client";

import { useEffect } from "react";

interface PageSeoInput {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  noIndex?: boolean;
}

/**
 * Client-side hook that updates document.title dynamically.
 * For full SEO (indexable metadata) use generateMetadata() in server layouts.
 * This hook is useful for:
 *  - Pages with dynamic titles based on client state
 *  - Ensuring the browser tab title stays in sync with navigation
 */
export function usePageSeo({ title, noIndex }: PageSeoInput = {}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    if (noIndex) {
      const meta = document.querySelector('meta[name="robots"]');
      if (meta) {
        meta.setAttribute("content", "noindex, nofollow");
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "robots";
        newMeta.content = "noindex, nofollow";
        document.head.appendChild(newMeta);
      }
    }
  }, [noIndex]);

  return { title };
}
