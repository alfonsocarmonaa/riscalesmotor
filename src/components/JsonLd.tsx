const BASE_URL = "https://riscalesmotor.lovable.app";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Riscales Motor Co.",
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        description:
          "Camisetas artesanales ilustradas con vehículos clásicos. Diseños únicos, algodón premium, fabricación responsable. Hecho con amor en España.",
        email: "riscalesmotors@gmail.com",
        sameAs: [
          "https://instagram.com/riscalesmotor",
          "https://facebook.com/riscalesmotor",
        ],
      }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: string;
  currency: string;
  availability: boolean;
  url: string;
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency,
  availability,
  url,
}: ProductSchemaProps) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image,
        brand: {
          "@type": "Brand",
          name: "Riscales Motor Co.",
        },
        offers: {
          "@type": "Offer",
          price,
          priceCurrency: currency,
          availability: availability
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url,
          seller: {
            "@type": "Organization",
            name: "Riscales Motor Co.",
          },
        },
      }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
        })),
      }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
