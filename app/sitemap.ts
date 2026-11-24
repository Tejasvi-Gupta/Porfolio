import type { MetadataRoute } from "next";
import { origin } from "../content/metadata";
import { projects } from "../content/projects.mjs";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...projects.map((p) => "/projects/" + p.id + "/")].map(
    (path) => ({ url: origin + path }),
  );
}
