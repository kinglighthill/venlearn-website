import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/", "/book-demo-success"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/book-demo-success"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/book-demo-success"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/book-demo-success"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/book-demo-success"],
      },
    ],
    sitemap: "https://venlearn.com/sitemap.xml",
    host: "https://venlearn.com",
  };
}
