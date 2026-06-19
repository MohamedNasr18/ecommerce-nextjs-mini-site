import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CartClient from './CartClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cart' });

  return {
    title: `${t('title')} | ShopNext`,
    alternates: {
      canonical: `${siteUrl}/${locale}/cart`,
      languages: { en: `${siteUrl}/en/cart`, ar: `${siteUrl}/ar/cart` },
    },
    robots: { index: false, follow: true },
  };
}

export default function CartPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <CartClient />
    </div>
  );
}