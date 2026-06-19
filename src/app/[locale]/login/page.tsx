import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LoginClient from './LoginClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: `${t('login_title')} | ShopNext`,
    alternates: {
      canonical: `${siteUrl}/${locale}/login`,
      languages: { en: `${siteUrl}/en/login`, ar: `${siteUrl}/ar/login` },
    },
  };
}

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <LoginClient />
    </div>
  );
}