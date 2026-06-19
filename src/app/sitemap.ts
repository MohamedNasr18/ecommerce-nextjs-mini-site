import { MetadataRoute } from 'next';
import products from '../../data/products.json';
import categories from '../../data/categories.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const locales = ['en', 'ar'];

const staticRoutes = [
  '',
  '/about',
  '/contact',
  '/login',
  '/signup',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1 : 0.6,
        alternates: {
          languages: {
            en: `${siteUrl}/en${route}`,
            ar: `${siteUrl}/ar${route}`,
          },
        },
      });
    });
  });

  // Category pages
  categories.forEach((category) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${siteUrl}/${locale}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${siteUrl}/en/category/${category.slug}`,
            ar: `${siteUrl}/ar/category/${category.slug}`,
          },
        },
      });
    });
  });

  // Product pages
  products.forEach((product) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${siteUrl}/${locale}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${siteUrl}/en/product/${product.id}`,
            ar: `${siteUrl}/ar/product/${product.id}`,
          },
        },
      });
    });
  });

  return entries;
}