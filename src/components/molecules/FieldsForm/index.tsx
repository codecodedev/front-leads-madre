import { InputForm } from '@/components/atoms'
import { FormFieldText } from '@/components/molecules'
import FormFieldSelect from '@/components/molecules/FormFieldSelect'
import SelectFormWithSearch from '@/components/molecules/SelectFormWithSearch'
import { FieldsTemplateForm, InitialState } from '@/types/general'
import { Dispatch, SetStateAction } from 'react'
import { DefaultValues, FieldValues, Path, useForm } from 'react-hook-form'

type PropsFieldsForm<T> = {
  field: FieldsTemplateForm<T>
  state: InitialState<T>
  setFormDataExtra: Dispatch<SetStateAction<FormData>>
  defaultValues?: DefaultValues<T & FieldValues>
}

export default function FieldsForm<T>({
  field,
  state,
  setFormDataExtra,
  defaultValues,
}: PropsFieldsForm<T>) {
  const id = field.id as Path<T & { request?: string }>

  const { register } = useForm<T & FieldValues>({
    defaultValues: defaultValues ?? undefined,
  })

  const propsField = {
    props: { ...register(id, { required: field.required }) },
    label: field.label,
    classInput: `bg-gray-300 ${field.classInput ?? ''} ${
      state?.errors?.[id] && 'ring-red-500 focus:ring-red-500'
    }`,
    error: (state?.errors?.[id] && state.errors[id]?.[0]) ?? '',
    disabled: field.disabled,
  }

  if (field.type === 'select') {
    return (
      <FormFieldSelect
        {...propsField}
        type="select"
        options={field?.option?.list ?? []}
        optionKeyLabel={field?.option?.keyLabel}
        optionKeyValue={field?.option?.keyValue}
      />
    )
  } else if (field.type === 'selectSearch') {
    return (
      <SelectFormWithSearch
        {...propsField}
        label={field.label}
        setFormDataExtra={setFormDataExtra}
        options={field?.option?.list ?? []}
        optionKeyLabel={field?.option?.keyLabel}
        optionKeyValue={field?.option?.keyValue}
        variant={field?.option?.variant ?? 'multiple'}
        values={field.option?.values}
      />
    )
  } else if (field.type === 'hidden') {
    return (
      <InputForm
        propsInput={{ ...propsField.props }}
        type={field.type}
        placeholder={field.placeholder}
      />
    )
  } else {
    return <FormFieldText {...propsField} type={field.type} />
  }
}