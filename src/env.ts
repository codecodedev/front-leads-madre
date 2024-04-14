import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

const parseEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

if (!parseEnv.success) {
  console.log(
    'invalid enviroments variables',
    parseEnv.error.flatten().fieldErrors,
  )

  throw new Error('invalid enviroments variables')
}

export const env = parseEnv.data