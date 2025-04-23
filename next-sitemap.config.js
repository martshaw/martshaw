module.exports = {
    siteUrl: "https://martinshaw.com",
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          allow: "/",
        },
        {
          userAgent: "*",
          disallow: ["/.next/", "/api/", "/_next/static/", "/_vercel/", "/node_modules/"],
        },
      ],
      additionalSitemaps: ["https://martinshaw.com/sitemap.xml"],
    },
    exclude: ["/404", "/500", "/_*", "/api/*"],
    changefreq: "monthly",
    priority: 0.7,
    sitemapSize: 5000,
    generateIndexSitemap: false,
    outDir: "public",
  }
  