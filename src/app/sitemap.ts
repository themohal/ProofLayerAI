import { MetadataRoute } from "next";

const APP_URL = "https://proof-layer-ai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/verify",
    "/pricing",
    "/donate",
    "/docs",
    "/blog",
    "/terms",
    "/privacy",
    "/login",
    "/signup",
  ];

  return routes.map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
