'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { getShippingSchema, ShippingFormData } from '@/lib/validations';

type Step = 'shipping' | 'review' | 'success';

export default function CheckoutClient() {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('checkout');
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();

  const [step, setStep] = useState<Step>('shipping');
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);

  const schema = getShippingSchema(locale);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitShipping = (data: ShippingFormData) => {
    setShippingData(data);
    setStep('review');
  };

  const placeOrder = () => {
    clearCart();
    setStep('success');
  };

  // ----- Empty cart guard -----
  if (items.length === 0 && step !== 'success') {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-6">
          {locale === 'ar' ? 'سلتك فارغة' : 'Your cart is empty'}
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          {locale === 'ar' ? 'تسوّق الآن' : 'Shop Now'}
        </Link>
      </div>
    );
  }

  // ----- Success screen -----
  if (step === 'success') {
    return (
      <div className="text-center py-20">
        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">{t('success_title')}</h1>
        <p className="text-gray-600 mb-8">{t('success_message')}</p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
        >
          {t('back_to_home')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <StepBadge active={step === 'shipping'} done={step === 'review'} label={t('shipping')} />
        <span className="text-gray-300">—</span>
        <StepBadge active={step === 'review'} done={false} label={t('review')} />
      </div>

      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      {step === 'shipping' && (
        <form onSubmit={handleSubmit(onSubmitShipping)} noValidate className="space-y-4">
          <Field
            label={t('full_name')}
            error={errors.fullName?.message}
            inputProps={register('fullName')}
            id="fullName"
          />
          <Field
            label={t('email')}
            error={errors.email?.message}
            inputProps={register('email')}
            id="email"
            type="email"
          />
          <Field
            label={t('address')}
            error={errors.address?.message}
            inputProps={register('address')}
            id="address"
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label={t('city')}
              error={errors.city?.message}
              inputProps={register('city')}
              id="city"
            />
            <Field
              label={t('zip')}
              error={errors.zip?.message}
              inputProps={register('zip')}
              id="zip"
            />
          </div>
          <Field
            label={t('country')}
            error={errors.country?.message}
            inputProps={register('country')}
            id="country"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 mt-4"
          >
            {t('next')}
          </button>
        </form>
      )}

      {step === 'review' && shippingData && (
        <div>
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-2">{t('shipping')}</h2>
            <p className="text-sm text-gray-600">{shippingData.fullName}</p>
            <p className="text-sm text-gray-600">{shippingData.email}</p>
            <p className="text-sm text-gray-600">
              {shippingData.address}, {shippingData.city}, {shippingData.country} {shippingData.zip}
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 mb-6 divide-y">
            {items.map(({ product, quantity }) => {
              const name = locale === 'ar' ? product.name_ar : product.name_en;
              return (
                <div key={product.id} className="flex justify-between py-2 text-sm">
                  <span>
                    {name} × {quantity}
                  </span>
                  <span className="font-medium">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
            <div className="flex justify-between pt-3 font-semibold">
              <span>{locale === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('shipping')}
              className="flex-1 border border-gray-300 py-3 rounded-md font-medium hover:bg-gray-50"
            >
              {t('back')}
            </button>
            <button
              onClick={placeOrder}
              className="flex-1 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800"
            >
              {t('place_order')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepBadge({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full font-medium ${
        active
          ? 'bg-black text-white'
          : done
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-500'
      }`}
    >
      {label}
    </span>
  );
}

function Field({
  label,
  error,
  inputProps,
  id,
  type = 'text',
}: {
  label: string;
  error?: string;
inputProps: UseFormRegisterReturn;
  id: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...inputProps}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-600 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}