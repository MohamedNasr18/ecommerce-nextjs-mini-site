import { z } from 'zod';

export const getShippingSchema = (locale: string) => {
  const messages = {
    en: {
      name: 'Name must be at least 2 characters',
      email: 'Invalid email address',
      address: 'Address must be at least 5 characters',
      city: 'City is required',
      country: 'Country is required',
      zip: 'ZIP code must be at least 3 characters',
    },
    ar: {
      name: 'الاسم يجب أن يكون حرفين على الأقل',
      email: 'البريد الإلكتروني غير صحيح',
      address: 'العنوان يجب أن يكون 5 أحرف على الأقل',
      city: 'المدينة مطلوبة',
      country: 'الدولة مطلوبة',
      zip: 'الرمز البريدي يجب أن يكون 3 أحرف على الأقل',
    },
  };

  const m = locale === 'ar' ? messages.ar : messages.en;

  return z.object({
    fullName: z.string().min(2, m.name),
    email: z.string().email(m.email),
    address: z.string().min(5, m.address),
    city: z.string().min(2, m.city),
    country: z.string().min(2, m.country),
    zip: z.string().min(3, m.zip),
  });
};

export type ShippingFormData = z.infer<ReturnType<typeof getShippingSchema>>;