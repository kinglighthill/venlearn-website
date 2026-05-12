import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Venlearn School Management Software",
    short_name: "Venlearn",
    description:
      "All-in-one school management software for admissions, records, fees, attendance, report cards, CBT, portals, communication, and offline or cloud operations.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fbfbff",
    theme_color: "#2661ac",
    categories: ["education", "productivity", "business"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
