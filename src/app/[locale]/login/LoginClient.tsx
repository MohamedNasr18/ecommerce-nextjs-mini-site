'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { getLoginSchema, LoginFormData } from '@/lib/authValidations';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginClient() {
  const locale = useLocale();
  const t = useTranslations('auth');
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const schema = getLoginSchema(locale);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginFormData) => {
    // Mock login — no real backend
    await new Promise((r) => setTimeout(r, 600));
    login({ id: 'u1', name: data.email.split('@')[0], email: data.email });
    router.push(`/${locale}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">{t('login_title')}</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-red-600 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p id="password-error" role="alert" className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {t('login_btn')}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        {t('no_account')}{' '}
        <Link href="/signup" className="text-black font-medium hover:underline">
          {t('signup_btn')}
        </Link>
      </p>
    </div>
  );
}