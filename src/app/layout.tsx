import type { Metadata } from "next";
import { Heebo, Suez_One } from "next/font/google";
import Analytics from "@/components/Analytics";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Distinctive bold display face for headings — gives this site its own identity.
const suezOne = Suez_One({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "סדנאות קצב | חוויה קצבית בלתי נשכחת",
  description:
    "סדנאות קצב מקצועיות לחברות, אירועים, בתי ספר וקהילות. חוויית גיבוש מיוחדת שמחברת אנשים דרך קצב ומוזיקה עם דליים ומקלות. 15+ שנות ניסיון, 500+ סדנאות.",
  keywords:
    "סדנאות קצב, גיבוש חברות, team building, קצב עם דליים, סדנה, אירועים, bucket drumming, גיבוש צוות, סדנת קצב",
  metadataBase: new URL("https://drumming.eladjak.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "סדנאות קצב | חוויה קצבית בלתי נשכחת",
    description:
      "סדנאות קצב מקצועיות לחברות, אירועים, בתי ספר וקהילות. 15+ שנות ניסיון.",
    locale: "he_IL",
    type: "website",
    url: "https://drumming.eladjak.com",
    siteName: "סדנאות קצב",
    images: [
      {
        url: "/images/drumming/og.jpg",
        width: 1200,
        height: 630,
        alt: "סדנת קצב קבוצתית",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "סדנאות קצב | חוויה קצבית בלתי נשכחת",
    description:
      "סדנאות קצב מקצועיות לחברות, אירועים, בתי ספר וקהילות.",
    images: ["/images/drumming/og.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "סדנאות קצב",
  description:
    "סדנאות קצב מקצועיות לחברות, אירועים, בתי ספר וקהילות — קצב עם דליים ומקלות",
  url: "https://drumming.eladjak.com",
  image: "https://drumming.eladjak.com/images/drumming/og.jpg",
  telephone: "+972-52-542-7474",
  email: "eladjak@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
  },
  priceRange: "$$",
  openingHours: "Su-Th 09:00-20:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${heebo.variable} ${suezOne.variable} antialiased`}>
        <Analytics />
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[60] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
        >
          דלג לתוכן
        </a>
        {children}
      </body>
    </html>
  );
}
