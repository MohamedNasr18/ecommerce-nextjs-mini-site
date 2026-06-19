import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ProductDetailClient from './ProductDetailClient';
import ProductCard from '@/components/ProductCard';
import products from '../../../../../data/products.json';
import categories from '../../../../../data/categories.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};

  const name = locale === 'ar' ? product.name_ar : product.name_en;
  const description = locale === 'ar' ? product.description_ar : product.description_en;
  const title = `${name} | ShopNext`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/product/${id}`,
      languages: {
        en: `${siteUrl}/en/product/${id}`,
        ar: `${siteUrl}/ar/product/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/product/${id}`,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [{ url: `${siteUrl}${product.image}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}${product.image}`],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const t = await getTranslations('nav');
  const category = categories.find((c) => c.slug === product.category);
  const categoryName = category ? (locale === 'ar' ? category.name_ar : category.name_en) : '';
  const name = locale === 'ar' ? product.name_ar : product.name_en;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: `${siteUrl}${product.image}`,
    description: locale === 'ar' ? product.description_ar : product.description_en,
    sku: product.id,
    category: categoryName,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/${locale}/product/${product.id}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: t('home'), href: '/' },
          { label: categoryName, href: `/category/${product.category}` },
          { label: name },
        ]}
      />

      <ProductDetailClient product={product} />

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            {locale === 'ar' ? 'منتجات مشابهة' : 'Related Products'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}