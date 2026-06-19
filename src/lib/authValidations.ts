import { z } from 'zod';

export const getLoginSchema = (locale: string) => {
  const m = locale === 'ar'
    ? { email: 'البريد الإلكتروني غير صحيح', password: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }
    : { email: 'Invalid email address', password: 'Password must be at least 8 characters' };

  return z.object({
    email: z.string().email(m.email),
    password: z.string().min(8, m.password),
  });
};

export const getSignupSchema = (locale: string) => {
  const m = locale === 'ar'
    ? {
        name: 'الاسم مطلوب',
        email: 'البريد الإلكتروني غير صحيح',
        password: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
        mismatch: 'كلمتا المرور غير متطابقتين',
      }
    : {
        name: 'Name is required',
        email: 'Invalid email address',
        password: 'Password must be at least 8 characters',
        mismatch: 'Passwords do not match',
      };

  return z
    .object({
      name: z.string().min(2, m.name),
      email: z.string().email(m.email),
      password: z.string().min(8, m.password),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: m.mismatch,
      path: ['confirmPassword'],
    });
};

export type LoginFormData = z.infer<ReturnType<typeof getLoginSchema>>;
export type SignupFormData = z.infer<ReturnType<typeof getSignupSchema>>;