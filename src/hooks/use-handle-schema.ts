import { formSchemaUpdateIndicator } from '@/components/template/DetailIndicators/schema'
import { formSchemaUpdateUnit } from '@/components/template/DetailUnits/schema'
import { formSchemaUpdateUserProfile } from '@/components/template/DetailUsers/schema'
import { formSchemaEditProfile } from '@/components/template/ProfileDetail/schema'
import { z } from 'zod'

export const SchemaDefault = z.object({
  default: z.string().min(1, { message: 'Schema Default' }),
})

export const useHandleSchema = () => {
  function getSchema(icon: string) {
    switch (icon) {
      case 'UpdateUnit':
        return formSchemaUpdateUnit
      case 'EditProfile':
        return formSchemaEditProfile
      case 'UpdateIndicator':
        return formSchemaUpdateIndicator
      case 'UpdateUserProfile':
        return formSchemaUpdateUserProfile
      default:
        return SchemaDefault
    }
  }
  return { getSchema }
}
