import { z } from 'zod'

const envSchema = z.object({
  POLAR_ACCESS_TOKEN: z.string().min(1, 'POLAR_ACCESS_TOKEN is required'),
  POLAR_WEBHOOK_SECRET: z.string().min(1, 'POLAR_WEBHOOK_SECRET is required'),
  POLAR_ENVIRONMENT: z.enum(['sandbox', 'production']).default('production'),
  POLAR_PRODUCT_ID_MONTHLY: z.string().min(1, 'POLAR_PRODUCT_ID_MONTHLY is required'),
  POLAR_PRODUCT_ID_ONETIME: z.string().min(1, 'POLAR_PRODUCT_ID_ONETIME is required'),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url('NEXT_PUBLIC_APP_URL must be a valid URL')
    .optional(),
})

export const env = envSchema.parse({
  POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
  POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
  POLAR_ENVIRONMENT: process.env.POLAR_ENVIRONMENT,
  POLAR_PRODUCT_ID_MONTHLY: process.env.POLAR_PRODUCT_ID_MONTHLY,
  POLAR_PRODUCT_ID_ONETIME: process.env.POLAR_PRODUCT_ID_ONETIME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})