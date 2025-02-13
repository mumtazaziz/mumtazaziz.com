import type { MetadataRoute } from "next/types";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/$",
      disallow: "/",
    },
    sitemap: "https://www.mumtazaziz.com/sitemap.xml",
  };
}
