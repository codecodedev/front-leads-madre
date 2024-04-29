import { Button, InputForm, LabelForm, Text } from '@/components/atoms'
import SelectForm from '@/components/atoms/SelectForm'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import {
  Option,
  OptionGeneric,
  OptionKey,
  VariantOption,
} from '@/types/general'
import { CatalogIcons, handleIcons } from '@/utils/handleIcons'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props<T> {
  options: OptionGeneric<T>[]
  onChange?: (value: string) => void
  onDelete?: (value: string) => void
  optionKeyLabel?: OptionKey<T>
  optionKeyValue?: OptionKey<T>
  error: string
  props: UseFormRegisterReturn<string>
  label?: string
  setFormDataExtra: Dispatch<SetStateAction<FormData>>
  variant: VariantOption
  values?: string[]
  placeholder?: string
  light?: boolean
  iconDeleteName?: keyof CatalogIcons
  classNameInput?: string
  classNameItem?: string
}

export function SelectFormWithSearch<T>({
  options,
  onChange,
  onDelete,
  optionKeyLabel,
  optionKeyValue,
  error,
  props,
  label,
  variant,
  setFormDataExtra,
  values,
  placeholder,
  light,
  iconDeleteName = 'Trash',
  classNameInput,
  classNameItem,
}: Props<T>) {
  const { getItemValue } = useItemListTransform()
  const getOptionLabel = (option: OptionGeneric<T>, key: OptionKey<T>) =>
    String(getItemValue(option, key))
  const getOptionValue = (option: OptionGeneric<T>, key: OptionKey<T>) =>
    String(getItemValue(option, key))
  const selectRef = useRef<HTMLSelectElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const IconDelete = handleIcons(iconDeleteName)
  const OrderOptions: Option[] = options.map((option) => {
    return {
      label: optionKeyLabel ? getOptionLabel(option, optionKeyLabel) : '',
      value: optionKeyValue ? getOptionValue(option, optionKeyValue) : '',
    }
  })

  const returnExistingValues = (state: FormData) => {
    const newState = new FormData()
    const extraDataKeys = Array.from(state.keys()).filter(
      (key) => key !== props.name,
    )
    extraDataKeys.forEach((key) => {
      const valueString = String(state.get(key)) ?? '[]'
      if (key !== props.name) {
        newState.append(key, valueString)
      }
    })
    return newState
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Option[]>(
    values ? setInitialValue() : [],
  )

  function setInitialValue() {
    let initialSelectedItems = []
    const optionsOrder = OrderOptions
    initialSelectedItems = values
      ? values.map((value) => {
          const itemInOption = optionsOrder.find(
            (option) => option.value === value,
          )
          if (itemInOption) {
            return {
              value: itemInOption.value,
              label: itemInOption.label,
            }
          }
          return {
            value: '',
            label: 'Not Found',
          }
        })
      : []

    return initialSelectedItems
  }

  useEffect(() => {
    // TODO: pegar o initialValue direto do lead
    if (variant === 'multiple') {
      setFormDataExtra((state) => {
        const newState = returnExistingValues(state)
        const extraDataJson = selectedItems.map((item) => item.value)
        const newValue = [...extraDataJson]
        const newValueString = JSON.stringify(newValue)
        newState.append(props.name, newValueString)
        return newState
      })
    }
    if (variant === 'single') {
      setFormDataExtra((state) => {
        const newState = returnExistingValues(state)
        const extraDataJson = selectedItems.map((item) => item.value)

        const newValue2 = extraDataJson[0]
          ? JSON.stringify(extraDataJson[0])
          : ''

        newState.append(props.name, newValue2)
        return newState
      })
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredOptions: Option[] = OrderOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const parseCurrentValueFormDataToJson = (state: FormData): string[] => {
    const extraData = state.get(props.name)
    return JSON.parse(String(extraData ?? '[]'))
  }

  const verifyExistsItem = (value: string) => {
    return optionKeyValue
      ? selectedItems.filter((item) => item.value === value)
      : []
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsFocused(false)

    const itemExists = verifyExistsItem(event.target.value)

    if (itemExists.length === 0) {
      if (onChange) {
        onChange(event.target.value)
      }
      if (variant === 'multiple') {
        setFormDataExtra((state) => {
          const newState = returnExistingValues(state)
          const extraDataJson = parseCurrentValueFormDataToJson(state)
          const newValue = [...extraDataJson, event.target.value]
          const newValueString = JSON.stringify(newValue)
          newState.append(props.name, newValueString)
          return newState
        })
        const itemSelected = filteredOptions.filter(
          (option) => option.value === event.target.value,
        )
        setSelectedItems((state) => [...state, itemSelected[0]])
      } else {
        setFormDataExtra((state) => {
          const newState = returnExistingValues(state)
          newState.append(props.name, event.target.value)
          return newState
        })
        const itemSelected = filteredOptions.filter(
          (option) => option.value === event.target.value,
        )
        setSelectedItems([itemSelected[0]])
      }
      setSearchTerm('')
    }
  }

  const removeItem = (id: string) => {
    const itemExists = verifyExistsItem(id)
    if (itemExists) {
      if (onDelete) {
        onDelete(id)
      }
      if (variant === 'multiple') {
        setFormDataExtra((state) => {
          const newState = returnExistingValues(state)
          const extraDataJson = parseCurrentValueFormDataToJson(state)
          const itemsFormDataFilter = extraDataJson.filter(
            (item) => item !== id,
          )
          const newValue = [...itemsFormDataFilter]
          const newValueString = JSON.stringify(newValue)
          newState.append(props.name, newValueString)
          return newState
        })
        const itemsFilter = selectedItems.filter((item) => item.value !== id)
        setSelectedItems([...itemsFilter])
      } else {
        setFormDataExtra((state) => {
          const newState = returnExistingValues(state)
          newState.append(props.name, '')
          return newState
        })
        const itemsFilter = selectedItems.filter((item) => item.value !== id)
        setSelectedItems([...itemsFilter])
      }
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      !selectRef.current?.contains(event.target as Node) &&
      !inputRef.current?.contains(event.target as Node)
    ) {
      setIsFocused(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <div className="w-full">
      {label && <LabelForm htmlFor={props.name} label={label} />}
      <div className={twMerge(!light && 'mt-2')}>
        <InputForm
          inputRef={inputRef}
          onChange={handleSearchChange}
          onFocus={() => {
            setIsFocused(true)
          }}
          value={searchTerm}
          id="searchSelectMult"
          type={'text'}
          placeholder={placeholder ?? 'Search...'}
          className={twMerge(
            'rounded-full border-0',
            'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
            'py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
            `bg-white ${error && 'ring-red-500 focus:ring-red-500'}`,
            classNameInput,
          )}
        />
        {isFocused && (
          <div className=" relative">
            <SelectForm
              selectRef={selectRef}
              classNameOptions="py-2 px-4 mb-2 block w-full text-left bg-white hover:bg-gray-100 border rounded-full border-gray-300"
              options={filteredOptions}
              onChange={handleChange}
              size={4}
              onBlur={() => setIsFocused(false)}
              className={twMerge(
                'rounded-2xl border-0 absolute top-full shadow-gray-500',
                'ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100',
                'py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6',
              )}
            />
          </div>
        )}

        <div
          className={twMerge(
            variant === 'multiple'
              ? 'bg-gray-300 p-4 rounded-lg min-h-24'
              : 'rounded-md',
            !light && 'mt-4',
          )}
        >
          <ul>
            {selectedItems?.map((item, idx) => (
              <div
                key={idx}
                className={twMerge(
                  'bg-slate-50 mt-4 px-8 w-full flex flex-row items-center justify-between rounded-full',
                  !light && 'mb-4',
                  classNameItem,
                )}
              >
                <li className="min-w-20 flex justify-center">{item.label}</li>
                <Button
                  className={twMerge(light && 'p-2')}
                  type="button"
                  onClick={() => removeItem(item.value)}
                >
                  <IconDelete color="red" />
                </Button>
              </div>
            ))}
          </ul>
        </div>

        {error && (
          <Text
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {error}
          </Text>
        )}
      </div>
    </div>
  )
}

export default SelectFormWithSearch
