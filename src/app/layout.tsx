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
    "סדנאות תיפוף מקצועיות לחברות, אירועים, בתי ספר וקהילות. חוויית גיבוש מיוחדת שמחברת אנשים דרך קצב ומוזיקה.",
  keywords: "סדנאות תיפוף, גיבוש חברות, team building, תיפוף, סדנה, אירועים",
  openGraph: {
    title: "סדנאות תיפוף | חוויה קצבית בלתי נשכחת",
    description: "סדנאות תיפוף מקצועיות לחברות, אירועים, בתי ספר וקהילות.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} antialiased`}>{children}</body>
    </html>
  );
}
