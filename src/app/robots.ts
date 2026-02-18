import { MetadataRoute } from "next";

const APP_URL = "https://proof-layer-ai.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/admin/"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
