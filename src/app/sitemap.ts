import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllArticles } from "@/lib/articles";
import { getAllEditions } from "@/lib/newsletter";
import { getAllPolls } from "@/lib/polls";
import { getLiveLessons, lessonHref } from "@/content/courses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const editions = await getAllEditions();
  const paths = [
    "/",
    "/courses",
    ...getLiveLessons().map(({ lesson }) => lessonHref(lesson)),
    "/articles",
    ...getAllArticles().map((a) => `/articles/${a.slug}`),
    "/newsletter",
    ...editions.map((e) => `/newsletter/${e.slug}`),
    "/polls",
    ...getAllPolls().map((p) => `/polls/${p.id}`),
    "/privacy",
    "/terms",
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}
