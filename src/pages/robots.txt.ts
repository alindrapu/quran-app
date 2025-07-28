import type { APIRoute } from "astro";

const getRobotsTxt = () => `\
User-agent: *
Allow: /

Sitemap: ${process.env.DOMAIN}/sitemap-index.xml
Sitemap: ${process.env.DOMAIN}/sitemap-0.xml
`;

export const GET: APIRoute = ({}) => {
  return new Response(getRobotsTxt());
};
