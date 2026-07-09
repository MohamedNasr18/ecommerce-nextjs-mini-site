'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, Heart, Menu, X, User, ChevronDown, LogOut, Package } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isRTL = locale === 'ar';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const accountRef = useRef<HTMLDivElement>(null);

  const cartItems = useCartStore((s) => s.items);
  const wishlistItems = useWishlistStore((s) => s.items);
  const { user, logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, i) => sum + i.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setWishlistCount(wishlistItems.length);
  }, [wishlistItems]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (next: string) => {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  const navLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/category/all`, label: t('nav.categories') },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ];

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    router.push(`/${locale}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex-shrink-0 text-xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors"
          >
            <svg width="159" height="24" viewBox="0 0 159 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.3867 23.8933C3.65333 23.8667 2.08616e-07 21.4667 0.186667 15.6533H6.82667C6.90667 17.1733 8.18667 18.1067 11.3867 18.1333C14.2133 18.16 15.52 17.36 15.52 16.32C15.52 15.6 15.12 14.8533 12.9333 14.5333L10.0533 14.08C5.81333 13.3867 0.72 12.88 0.72 7.14667C0.72 2.72 4.32 0 11.44 0C17.8667 0 22.3467 1.78667 22.2133 8.18667H15.6267C15.36 6.69333 14.1067 5.76 11.28 5.76C8.82667 5.76 7.81333 6.50667 7.81333 7.52C7.81333 8.16 8.21333 8.93333 9.92 9.2L12.2933 9.6C16.7467 10.3467 22.8533 10.48 22.8533 16.6133C22.8533 21.4933 19.0667 23.92 11.3867 23.8933ZM40.3313 0.746668H47.7179V23.1467H40.3313V15.04H31.6379V23.1467H24.2513V0.746668H31.6379V8.85333H40.3313V0.746668ZM61.8883 23.8933C54.1817 23.8933 49.195 19.12 49.195 11.9467C49.195 4.77333 54.1817 0 61.8883 0C69.595 0 74.5817 4.77333 74.5817 11.9467C74.5817 19.12 69.595 23.8933 61.8883 23.8933ZM61.8883 17.52C64.8217 17.52 67.2483 15.4933 67.2483 11.9467C67.2483 8.4 64.8217 6.37333 61.8883 6.37333C58.955 6.37333 56.5283 8.4 56.5283 11.9467C56.5283 15.4933 58.955 17.52 61.8883 17.52ZM76.0638 23.1467V0.746668H88.7838C94.8904 0.746668 98.5171 3.46667 98.5171 9.49333C98.5171 15.52 94.8904 18.24 88.8104 18.24H83.4504V23.1467H76.0638ZM83.4504 12.1067H88.1438C89.9304 12.1067 91.0771 11.2267 91.0771 9.49333C91.0771 7.76 89.9304 6.88 88.1704 6.88H83.4504V12.1067ZM102.213 23.5733C100.213 23.5733 98.5325 21.92 98.5325 19.9467C98.5325 17.9733 100.213 16.32 102.213 16.32C104.213 16.32 105.893 17.9733 105.893 19.9467C105.893 21.92 104.213 23.5733 102.213 23.5733ZM119.938 23.8933C112.391 23.8933 107.351 19.12 107.351 11.9467C107.351 4.77333 112.391 0 119.938 0C125.405 0 131.005 2.4 131.751 9.97333H124.711C124.098 7.52 122.365 6.37333 119.938 6.37333C117.005 6.37333 114.685 8.56 114.685 11.9467C114.685 15.3333 117.005 17.52 119.938 17.52C122.365 17.52 124.098 16.3733 124.711 13.8667H131.751C131.005 21.4933 125.458 23.8933 119.938 23.8933ZM145.795 23.8933C138.088 23.8933 133.101 19.12 133.101 11.9467C133.101 4.77333 138.088 0 145.795 0C153.501 0 158.488 4.77333 158.488 11.9467C158.488 19.12 153.501 23.8933 145.795 23.8933ZM145.795 17.52C148.728 17.52 151.155 15.4933 151.155 11.9467C151.155 8.4 148.728 6.37333 145.795 6.37333C142.861 6.37333 140.435 8.4 140.435 11.9467C140.435 15.4933 142.861 17.52 145.795 17.52Z" fill="black"/>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href.includes('/category') && pathname.includes('/category'));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    isActive ? 'text-indigo-600' : 'text-slate-600'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Language switcher */}
            <div className="flex items-center border border-slate-200 rounded-full overflow-hidden text-xs font-semibold">
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1.5 transition-colors ${
                  locale === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('ar')}
                className={`px-3 py-1.5 transition-colors ${
                  locale === 'ar' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
                aria-label="Switch to Arabic"
              >
                AR
              </button>
            </div>

            {/* Wishlist */}
            <Link
              href={`/${locale}/wishlist`}
              className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-50"
              aria-label={`${t('nav.wishlist')} (${wishlistCount})`}
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href={`/${locale}/cart`}
              className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-50"
              aria-label={`${t('nav.cart')} (${cartCount})`}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth - Desktop */}
            {isAuthenticated() ? (
              <div className="relative hidden md:block" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200"
                  aria-expanded={accountOpen}
                  aria-haspopup="true"
                >
                  <User size={15} />
                  <span className="max-w-[80px] truncate">{user?.name.split(' ')[0]}</span>
                  <ChevronDown size={13} className={`transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
                </button>

                {accountOpen && (
                  <div
                    className={`absolute top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-50 ${
                      isRTL ? 'left-0' : 'right-0'
                    }`}
                    role="menu"
                  >
                    <div className="px-3 py-2 border-b border-slate-50">
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <Link
                      href={`/${locale}/orders`}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      role="menuitem"
                      onClick={() => setAccountOpen(false)}
                    >
                      <Package size={14} />
                      {t('nav.account')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      role="menuitem"
                    >
                      <LogOut size={14} />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href={`/${locale}/login`}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-3 py-1.5"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href={`/${locale}/signup`}
                  className="text-sm font-medium bg-indigo-600 text-white px-4 py-1.5 rounded-full hover:bg-indigo-700 transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-50"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}

            <div className="pt-2 border-t border-slate-100 space-y-1">
              {isAuthenticated() ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-start block px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={`/${locale}/login`}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    href={`/${locale}/signup`}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-lg text-center hover:bg-indigo-700 transition-colors"
                  >
                    {t('nav.signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}