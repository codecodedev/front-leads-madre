import { z } from 'zod'

export const formSchemaUpdateLead = z.object({
  name: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  phone: z.string().optional(),
  document: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  email: z.string().min(1, { message: 'O campo Id é obrigatório' }),
  city: z.string().min(1, { message: 'O campo Cidade é obrigatório' }),
  indicatorId: z
    .string()
    .min(1, { message: 'O campo indicador é obrigatório' }),
  consultantId: z
    .string()
    .min(1, { message: 'O campo indicador é obrigatório' })
    .optional(),
})

export const formSchemaCreateTimeLine = z.object({
  title: z.string().min(1, { message: 'O campo Titulo é obrigatório' }),
  description: z
    .string()
    .min(1, { message: 'O campo Descrição é obrigatório' }),
  status: z.string().min(1, { message: 'O campo Status é obrigatório' }),
  leadsId: z.string().min(1, { message: 'O campo leadsId é obrigatório' }),
  courseId: z.string().min(1, { message: 'O campo courseId é obrigatório' }),
})
