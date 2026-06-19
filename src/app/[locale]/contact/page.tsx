import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactClient from './ContactClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: `${t('title')} | ShopNext`,
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: { en: `${siteUrl}/en/contact`, ar: `${siteUrl}/ar/contact` },
    },
  };
}

export default function ContactPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <ContactClient />
    </div>
  );
}