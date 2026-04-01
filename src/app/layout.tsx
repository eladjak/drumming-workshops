import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "סדנאות תיפוף | חוויה קצבית בלתי נשכחת",
  description:
    "סדנאות תיפוף מקצועיות לחברות, אירועים, בתי ספר וקהילות. חוויית גיבוש מיוחדת שמחברת אנשים דרך קצב ומוזיקה. 15+ שנות ניסיון, 500+ סדנאות.",
  keywords:
    "סדנאות תיפוף, גיבוש חברות, team building, תיפוף, סדנה, אירועים, תיפוף אפריקאי, גיבוש צוות, סדנת תופים",
  metadataBase: new URL("https://drumming.eladjak.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "סדנאות תיפוף | חוויה קצבית בלתי נשכחת",
    description:
      "סדנאות תיפוף מקצועיות לחברות, אירועים, בתי ספר וקהילות. 15+ שנות ניסיון.",
    locale: "he_IL",
    type: "website",
    url: "https://drumming.eladjak.com",
    siteName: "סדנאות תיפוף",
    images: [
      {
        url: "/images/drumming-hero-wide.jpg",
        width: 1200,
        height: 630,
        alt: "סדנת תיפוף קבוצתית",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "סדנאות תיפוף | חוויה קצבית בלתי נשכחת",
    description:
      "סדנאות תיפוף מקצועיות לחברות, אירועים, בתי ספר וקהילות.",
    images: ["/images/drumming-hero-wide.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "סדנאות תיפוף",
  description:
    "סדנאות תיפוף מקצועיות לחברות, אירועים, בתי ספר וקהילות",
  url: "https://drumming.eladjak.com",
  image: "https://drumming.eladjak.com/images/drumming-hero-wide.jpg",
  telephone: "+972-50-123-4567",
  email: "info@drumming.co.il",
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
      <body className={`${heebo.variable} antialiased`}>
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
