export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  author: string;
  heroImage: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  keywords: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-school-management-software-in-nigeria",
    title: "Best School Management Software In Nigeria",
    excerpt:
      "See why Venlearn is a complete school management software for Nigerian schools, with admissions, fees, report cards, CBT, portals, attendance, communication, offline support, and more in one platform.",
    publishedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    readingTime: "14 min read",
    author: "Venlearn Team",
    heroImage: {
      src: "/images/demo-dashboard-generated.png",
      width: 1024,
      height: 1024,
      alt: "Venlearn school management software dashboard for Nigerian schools",
    },
    keywords: [
      "best school management software in Nigeria",
      "school management software Nigeria",
      "school ERP Nigeria",
      "school portal in Nigeria",
      "CBT software for Nigerian schools",
      "report card software Nigeria",
      "school fees management software Nigeria",
      "Venlearn",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
