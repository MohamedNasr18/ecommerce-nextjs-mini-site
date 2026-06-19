import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingBag} from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const footerLinks = {
    shop: [
      { href: `/${locale}/category/all`, label: t('nav.categories') },
      { href: `/${locale}/cart`, label: t('nav.cart') },
      { href: `/${locale}/wishlist`, label: t('nav.wishlist') },
    ],
    company: [
      { href: `/${locale}/about`, label: t('nav.about') },
      { href: `/${locale}/contact`, label: t('nav.contact') },
    ],
    account: [
      { href: `/${locale}/login`, label: t('nav.login') },
      { href: `/${locale}/signup`, label: t('nav.signup') },
    ],
  };

  return (
    <footer className=" bg-[#f3f0f1] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
           <Link href={`/${locale}`} className="flex items-center gap-2 text-black font-bold text-lg mb-3">
<svg width="166" height="25" viewBox="0 0 166 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9042 24.9793C3.81939 24.9515 2.34282e-07 22.4424 0.195152 16.3648H7.13697C7.22061 17.9539 8.55879 18.9296 11.9042 18.9575C14.8594 18.9854 16.2255 18.149 16.2255 17.0618C16.2255 16.309 15.8073 15.5284 13.5212 15.1939L10.5103 14.7199C6.07758 13.9951 0.752728 13.4654 0.752728 7.47146C0.752728 2.84358 4.51636 -6.00167e-05 11.96 -6.00167e-05C18.6788 -6.00167e-05 23.3624 1.86782 23.223 8.55873H16.337C16.0582 6.99752 14.7479 6.02176 11.7927 6.02176C9.22788 6.02176 8.16849 6.80236 8.16849 7.86176C8.16849 8.53085 8.58667 9.33933 10.3709 9.61812L12.8521 10.0363C17.5079 10.8169 23.8921 10.9563 23.8921 17.3684C23.8921 22.4702 19.9333 25.0072 11.9042 24.9793ZM42.1645 0.780547H49.8869V24.1987H42.1645V15.7236H33.076V24.1987H25.3536V0.780547H33.076V9.2557H42.1645V0.780547ZM64.7014 24.9793C56.6445 24.9793 51.4311 19.989 51.4311 12.4896C51.4311 4.99024 56.6445 -6.00167e-05 64.7014 -6.00167e-05C72.7584 -6.00167e-05 77.9717 4.99024 77.9717 12.4896C77.9717 19.989 72.7584 24.9793 64.7014 24.9793ZM64.7014 18.3163C67.7681 18.3163 70.3051 16.1975 70.3051 12.4896C70.3051 8.78176 67.7681 6.66297 64.7014 6.66297C61.6348 6.66297 59.0978 8.78176 59.0978 12.4896C59.0978 16.1975 61.6348 18.3163 64.7014 18.3163ZM79.5212 24.1987V0.780547H92.8194C99.2036 0.780547 102.995 3.62418 102.995 9.92479C102.995 16.2254 99.2036 19.069 92.8473 19.069H87.2436V24.1987H79.5212ZM87.2436 12.6569H92.1503C94.0182 12.6569 95.217 11.7369 95.217 9.92479C95.217 8.11267 94.0182 7.19267 92.1782 7.19267H87.2436V12.6569ZM106.859 24.6448C104.768 24.6448 103.011 22.9163 103.011 20.8533C103.011 18.7902 104.768 17.0618 106.859 17.0618C108.949 17.0618 110.706 18.7902 110.706 20.8533C110.706 22.9163 108.949 24.6448 106.859 24.6448ZM125.39 24.9793C117.5 24.9793 112.231 19.989 112.231 12.4896C112.231 4.99024 117.5 -6.00167e-05 125.39 -6.00167e-05C131.105 -6.00167e-05 136.959 2.50903 137.74 10.4266H130.38C129.739 7.86176 127.927 6.66297 125.39 6.66297C122.323 6.66297 119.898 8.94903 119.898 12.4896C119.898 16.0302 122.323 18.3163 125.39 18.3163C127.927 18.3163 129.739 17.1175 130.38 14.4969H137.74C136.959 22.4702 131.161 24.9793 125.39 24.9793ZM152.422 24.9793C144.365 24.9793 139.151 19.989 139.151 12.4896C139.151 4.99024 144.365 -6.00167e-05 152.422 -6.00167e-05C160.479 -6.00167e-05 165.692 4.99024 165.692 12.4896C165.692 19.989 160.479 24.9793 152.422 24.9793ZM152.422 18.3163C155.488 18.3163 158.025 16.1975 158.025 12.4896C158.025 8.78176 155.488 6.66297 152.422 6.66297C149.355 6.66297 146.818 8.78176 146.818 12.4896C146.818 16.1975 149.355 18.3163 152.422 18.3163Z" fill="black"/>
</svg>

           </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {t('about.description')}
            </p>
            <div className="flex items-center gap-3 mt-4">
             
             
             
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-black font-semibold text-sm mb-4 uppercase tracking-wider">
              {locale === 'ar' ? 'تسوّق' : 'Shop'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-black font-semibold text-sm mb-4 uppercase tracking-wider">
              {locale === 'ar' ? 'الشركة' : 'Company'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-black font-semibold text-sm mb-4 uppercase tracking-wider">
              {locale === 'ar' ? 'حسابي' : 'Account'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.account.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ShopNext.{' '}
            {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href={`/${locale}`} className="hover:text-slate-300 transition-colors">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}`} className="hover:text-slate-300 transition-colors">
              {locale === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}