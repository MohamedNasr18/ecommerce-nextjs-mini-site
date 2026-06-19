import { z } from 'zod';

export const getContactSchema = (locale: string) => {
  const m = locale === 'ar'
    ? { name: 'الاسم مطلوب', email: 'البريد الإلكتروني غير صحيح', message: 'الرسالة يجب أن تكون 10 أحرف على الأقل' }
    : { name: 'Name is required', email: 'Invalid email address', message: 'Message must be at least 10 characters' };

  return z.object({
    name: z.string().min(2, m.name),
    email: z.string().email(m.email),
    message: z.string().min(10, m.message),
  });
};

export type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>;