import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SignupClient from './SignupClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: `${t('signup_title')} | ShopNext`,
    alternates: {
      canonical: `${siteUrl}/${locale}/signup`,
      languages: { en: `${siteUrl}/en/signup`, ar: `${siteUrl}/ar/signup` },
    },
  };
}

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <SignupClient />
    </div>
  );
}