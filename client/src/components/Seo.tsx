import { Helmet } from "react-helmet-async";

const SITE_URL = "https://neet.zeroai.org.in";

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
  noindex = false,
}: SeoProps) {
  const dataArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  // Ensure url is always absolute
  const absoluteUrl = url
    ? url.startsWith("http")
      ? url
      : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`
    : undefined;

  // Safely parse path segments for breadcrumbs
  let pathSegments: string[] = [];
  if (absoluteUrl) {
    try {
      pathSegments = new URL(absoluteUrl).pathname.split('/').filter(Boolean);
    } catch {
      // fallback: split the url prop directly
      pathSegments = (url || '').replace(/^\//, '').split('/').filter(Boolean);
    }
  }

  return (
    <Helmet>
      <title>{title}</title>
      
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      
      <meta 
        name="robots" 
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        } 
      />
      
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {absoluteUrl && <meta property="og:url" content={absoluteUrl} />}
      
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      {description && <meta property="twitter:description" content={description} />}
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      {absoluteUrl && <meta property="twitter:url" content={absoluteUrl} />}
      
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="language" content="English" />
      
      {absoluteUrl && <link rel="canonical" href={absoluteUrl} />}

      {/* Breadcrumb Schema */}
      {pathSegments.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
              },
              ...pathSegments.map((part, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
                "item": `${SITE_URL}/${pathSegments.slice(0, index + 1).join('/')}`
              }))
            ]
          })}
        </script>
      )}

      {dataArray.map((data, index) => (
        <script type="application/ld+json" key={`structured-data-${index}`}>
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
