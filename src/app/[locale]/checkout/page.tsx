import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CheckoutClient from './CheckoutClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'checkout' });

  return {
    title: `${t('title')} | ShopNext`,
    alternates: {
      canonical: `${siteUrl}/${locale}/checkout`,
      languages: { en: `${siteUrl}/en/checkout`, ar: `${siteUrl}/ar/checkout` },
    },
    robots: { index: false, follow: false },
  };
}

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <CheckoutClient />
    </div>
  );
}