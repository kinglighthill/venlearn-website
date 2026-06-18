import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/private/",
          "/book-demo-success",
          "/partner-success",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/book-demo-success", "/partner-success"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/book-demo-success", "/partner-success"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/book-demo-success", "/partner-success"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/book-demo-success", "/partner-success"],
      },
    ],
    sitemap: "https://venlearn.com/sitemap.xml",
    host: "https://venlearn.com",
  };
}
