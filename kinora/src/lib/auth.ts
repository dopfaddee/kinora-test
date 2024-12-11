import { z } from 'zod';

const phoneRegex = /^\+7\d{10}$/;

// Base schemas for shared fields
const baseUserSchema = {
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['screenwriter', 'producer', 'master', 'company']),
};

// Phone registration schema
export const phoneRegisterSchema = z.object({
  ...baseUserSchema,
  phone: z.string().regex(phoneRegex, 'Please enter a valid Russian phone number (+7XXXXXXXXXX)'),
  type: z.literal('phone'),
});

// Email registration schema
export const emailRegisterSchema = z.object({
  ...baseUserSchema,
  email: z.string().email('Invalid email address'),
  type: z.literal('email'),
});

// Combined registration schema
export const registerSchema = z.discriminatedUnion('type', [
  phoneRegisterSchema,
  emailRegisterSchema,
]);

// Login schemas
export const phoneLoginSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Please enter a valid Russian phone number (+7XXXXXXXXXX)'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  type: z.literal('phone'),
});

export const emailLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  type: z.literal('email'),
});

export const loginSchema = z.discriminatedUnion('type', [
  phoneLoginSchema,
  emailLoginSchema,
]);

export type PhoneRegisterFormData = z.infer<typeof phoneRegisterSchema>;
export type EmailRegisterFormData = z.infer<typeof emailRegisterSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export const roles = [
  {
    id: 'screenwriter',
    label: 'Screenwriter',
    description: 'Create and submit scripts, participate in competitions, and collaborate with producers.',
    icon: '✍️',
  },
  {
    id: 'producer',
    label: 'Producer',
    description: 'Find scripts, organize competitions, and connect with talented screenwriters.',
    icon: '🎬',
  },
  {
    id: 'master',
    label: 'Master',
    description: 'Share your expertise through courses, mentor others, and provide professional feedback.',
    icon: '👨‍🏫',
  },
  {
    id: 'company',
    label: 'Film Company',
    description: 'Access a wide pool of scripts, organize competitions, and find talented professionals.',
    icon: '🏢',
  },
] as const;