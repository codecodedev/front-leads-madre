import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type InputFormPros = {
  type?: string
  placeholder?: string
  className?: string
  propsInput?: UseFormRegisterReturn<string>
  defaultValue?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
  id?: string
  inputRef?: React.RefObject<HTMLInputElement>
  disabled?: boolean
}

const InputForm = ({
  type,
  placeholder,
  className,
  propsInput,
  defaultValue,
  value,
  onChange,
  onFocus,
  onBlur,
  id,
  inputRef,
  disabled,
  ...rest
}: InputFormPros) => {
  return (
    <input
      value={value}
      {...rest}
      {...propsInput}
      id={id}
      disabled={disabled}
      onChange={onChange ?? propsInput?.onChange}
      onFocus={onFocus}
      onBlur={onBlur ?? propsInput?.onBlur}
      defaultValue={defaultValue}
      type={type}
      className={twMerge(
        'block w-full',
        'rounded-md border-0',
        'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
        'py-1.5 pl-4 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
        className,
      )}
      placeholder={placeholder}
      ref={inputRef ?? propsInput?.ref}
    />
  )
}

export default InputForm
