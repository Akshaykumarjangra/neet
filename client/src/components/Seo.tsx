import { Helmet } from "react-helmet-async";

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
      {url && <meta property="og:url" content={url} />}
      
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      {description && <meta property="twitter:description" content={description} />}
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      {url && <meta property="twitter:url" content={url} />}
      
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="language" content="English" />
      
      {url && <link rel="canonical" href={url} />}

      {/* Breadcrumb Schema */}
      {url && (
        <script type="application/ld+json">
          {(() => {
            const pathSegments = new URL(url).pathname.split('/').filter(Boolean);
            return JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://neet.zeropage.in"
                },
                ...pathSegments.map((part, index) => ({
                  "@type": "ListItem",
                  "position": index + 2,
                  "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
                  "item": `https://neet.zeropage.in/${pathSegments.slice(0, index + 1).join('/')}`
                }))
              ]
            });
          })()}
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
