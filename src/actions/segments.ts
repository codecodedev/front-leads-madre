'use server'

import { formSchemaUpdateSegment } from '@/components/template/DetailSegments/schema'
import { formSchemaRegisterSegment } from '@/components/template/RegisterSegments/schema'
import { api } from '@/data/api'
import { Errors, InitialState } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'

export async function registerSegment(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
  const validatedFields = formSchemaRegisterSegment.safeParse({
    name: formData.get('name'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const response = await api(`/create/segment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Falha ao criar Segmento' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}

export async function updateSegment(
  prevState: InitialState,
  formData: FormData,
): Promise<InitialState> {
  const validatedFields = formSchemaUpdateSegment.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
  })

  if (validatedFields.success) {
    try {
      const TOKEN_SIM = getTokenFromCookieServer()
      if (!TOKEN_SIM) {
        return {
          errors: { request: 'Erro de credenciais' },
        }
      }
      const idSegment = formData.get('id')
      const response = await api(`/update/segment/${idSegment}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get('name'),
        }),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        return {
          errors: { request: JSON.parse(errorMessage).message },
        }
      }
      return {
        errors: {},
        ok: true,
      }
    } catch (error) {
      return {
        errors: { request: 'Falha ao atualizar o  Seguimento' },
      }
    }
  } else if (validatedFields.error) {
    const error = validatedFields.error.flatten().fieldErrors as Errors
    return {
      errors: { ...error },
    }
  } else {
    return { errors: { request: 'Error unknown' } }
  }
}
