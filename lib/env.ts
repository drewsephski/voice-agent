import { z } from 'zod'

const envSchema = z.object({
  POLAR_ACCESS_TOKEN: z.string().min(1, 'POLAR_ACCESS_TOKEN is required'),
  POLAR_WEBHOOK_SECRET: z.string().min(1, 'POLAR_WEBHOOK_SECRET is required'),
  POLAR_ENVIRONMENT: z.enum(['sandbox', 'production']).default('production'),
  POLAR_PRODUCT_ID_MONTHLY: z.string().min(1, 'POLAR_PRODUCT_ID_MONTHLY is required'),
  POLAR_PRODUCT_ID_ONETIME: z.string().min(1, 'POLAR_PRODUCT_ID_ONETIME is required'),
})

export const env = envSchema.parse(process.env)