import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: `${t('title')} | ShopNext`,
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: { en: `${siteUrl}/en/about`, ar: `${siteUrl}/ar/about` },
    },
    openGraph: {
      title: `${t('title')} | ShopNext`,
      description: t('description'),
      url: `${siteUrl}/${locale}/about`,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
    },
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-gray-600 leading-relaxed">{t('description')}</p>
    </div>
  );
}