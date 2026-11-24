import type { Metadata } from "next";
const configured =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL);
export const origin = new URL(configured || "http://localhost:3000").origin;
export function pageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(origin),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: "Arctic Glass",
      images: [{ url: "/images/profile.webp", alt: "Tejasvi Gupta outdoors" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/profile.webp"],
    },
  };
}
