import { type Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "./constants";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

export function generateMetadata({
  title,
  description = APP_DESCRIPTION,
  path = "",
  image = "/og-image.png",
  type = "website",
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${APP_NAME}` : `${APP_NAME} — ${APP_DESCRIPTION}`;
  const url = `${APP_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(APP_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: APP_NAME,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
