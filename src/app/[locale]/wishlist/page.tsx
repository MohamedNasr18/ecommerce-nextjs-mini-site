import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import WishlistClient from './WishlistClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'nav' });

  return {
    title: `${t('wishlist')} | ShopNext`,
    alternates: {
      canonical: `${siteUrl}/${locale}/wishlist`,
      languages: { en: `${siteUrl}/en/wishlist`, ar: `${siteUrl}/ar/wishlist` },
    },
    robots: { index: false, follow: true },
  };
}

export default function WishlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <WishlistClient />
    </div>
  );
}