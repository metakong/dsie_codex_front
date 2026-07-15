import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thedsiecodex.com";
  const routes = ["", "/what-is-dsie", "/how-it-works", "/services", "/about", "/book"];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${baseUrl}/services/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries];
}
