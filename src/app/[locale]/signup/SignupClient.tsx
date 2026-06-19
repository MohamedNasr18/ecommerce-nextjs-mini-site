'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { getSignupSchema, SignupFormData } from '@/lib/authValidations';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignupClient() {
  const locale = useLocale();
  const t = useTranslations('auth');
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const schema = getSignupSchema(locale);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: SignupFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    login({ id: 'u1', name: data.name, email: data.email });
    router.push(`/${locale}`);
  };

  const fields: { id: keyof SignupFormData; label: string; type: string }[] = [
    { id: 'name', label: t('name'), type: 'text' },
    { id: 'email', label: t('email'), type: 'email' },
    { id: 'password', label: t('password'), type: 'password' },
    { id: 'confirmPassword', label: t('confirm_password'), type: 'password' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">{t('signup_title')}</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              {...register(field.id)}
              aria-invalid={!!errors[field.id]}
              aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                errors[field.id] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[field.id] && (
              <p id={`${field.id}-error`} role="alert" className="text-red-600 text-xs mt-1">
                {errors[field.id]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {t('signup_btn')}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        {t('have_account')}{' '}
        <Link href="/login" className="text-black font-medium hover:underline">
          {t('login_btn')}
        </Link>
      </p>
    </div>
  );
}