import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  url?: string;
}

export function Seo({ title, description, url }: SeoProps) {
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

    if (description) {
      ensureMeta("description", description);
      ensureProperty("og:description", description);
      ensureProperty("twitter:description", description);
    }

    ensureProperty("og:title", title);
    ensureProperty("twitter:title", title);

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
  }, [title, description, url]);

  return null;
}
