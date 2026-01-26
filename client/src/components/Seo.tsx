import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  url?: string;
  keywords?: string[];
  ogImage?: string;
  structuredData?: any | any[];
  noindex?: boolean;
}

export function Seo({
  title,
  description,
  url,
  keywords = [],
  ogImage,
  structuredData,
  noindex = false
}: SeoProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const ensureMeta = (name: string, content: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const ensureProperty = (property: string, content: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Primary meta tags
    if (description) {
      ensureMeta("description", description);
      ensureProperty("og:description", description);
      ensureProperty("twitter:description", description);
    }

    if (keywords.length > 0) {
      ensureMeta("keywords", keywords.join(", "));
    }

    // Robots meta
    ensureMeta("robots", noindex
      ? "noindex, nofollow"
      : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    // Open Graph
    ensureProperty("og:title", title);
    ensureProperty("og:type", "website");
    ensureProperty("og:locale", "en_IN");

    if (ogImage) {
      ensureProperty("og:image", ogImage);
    }

    // Twitter
    ensureProperty("twitter:card", "summary_large_image");
    ensureProperty("twitter:title", title);
    if (ogImage) {
      ensureProperty("twitter:image", ogImage);
    }

    // India/NEET specific
    ensureMeta("geo.region", "IN");
    ensureMeta("geo.placename", "India");
    ensureMeta("language", "English");

    if (url) {
      ensureProperty("og:url", url);
      ensureProperty("twitter:url", url);
      let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];

      // Remove existing structured data scripts
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        if (script.getAttribute('data-seo-component') === 'true') {
          script.remove();
        }
      });

      // Add new structured data
      dataArray.forEach((data, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-component', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
  }, [title, description, url, keywords, ogImage, structuredData, noindex]);

  return null;
}
