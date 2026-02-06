import { useEffect } from "react";

const BASE_URL = "https://riscalesmotor.lovable.app";
const DEFAULT_OG_IMAGE = `${BASE_URL}/logo.png`;
const SITE_NAME = "Riscales Motor Co.";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

function updateMeta(nameOrProperty: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, nameOrProperty);
    document.head.appendChild(el);
  }
  el.content = content;
}

function updateLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SEOHead({ title, description, canonical, ogImage, ogType = "website", noIndex }: SEOHeadProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || `${BASE_URL}${window.location.pathname}`;
  const ogImg = ogImage || DEFAULT_OG_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    updateMeta("description", description);
    updateLink("canonical", canonicalUrl);

    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImg, true);
    updateMeta("og:url", canonicalUrl, true);
    updateMeta("og:site_name", SITE_NAME, true);
    updateMeta("og:locale", "es_ES", true);

    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImg);

    if (noIndex) {
      updateMeta("robots", "noindex, nofollow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    return () => {
      document.title = "Riscales Motor Co. | Camisetas Artesanales de Vehículos Clásicos";
    };
  }, [fullTitle, description, canonicalUrl, ogImg, ogType, noIndex, title]);

  return null;
}
