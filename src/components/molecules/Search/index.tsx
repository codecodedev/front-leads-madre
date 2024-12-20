'use client'

import { InputForm, Text } from '@/components/atoms'
import { SearchType } from '@/types/general'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { SubmitHandler } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

let timeout: NodeJS.Timeout | null

const Search = ({
  errorRequest,
  paramsName = 'q',
  placeholder = 'Buscar...',
}: {
  errorRequest: string | null
  paramsName?: keyof SearchType
  placeholder?: string
}) => {
  const paths = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get(paramsName)

  const handleSearch: SubmitHandler<SearchType> = (data: SearchType) => {
    const query = data[paramsName]
    const lastQuery = searchParams.toString()
    if (lastQuery.includes(paramsName)) {
      const regex = new RegExp(`${paramsName}=([^&]*)`, 'g')
      const nweQueryString = lastQuery.replace(regex, `${paramsName}=${query}`)
      router.push(`${paths}?${nweQueryString}`)
    } else {
      router.push(`${paths}?${paramsName}=${query}&${searchParams.toString()}`)
    }
  }

  const onChangeDebounce = (event: React.ChangeEvent<HTMLInputElement>) => {
    timeout && clearTimeout(timeout)
    const target = event.target
    timeout = setTimeout(
      () => handleSearch({ [paramsName]: target.value }),
      500,
    )
  }

  return (
    <div className="flex flex-col">
      <div className="w-[90vw] md:w-full flex flex-col md:flex-row justify-start items-center">
        <div className="w-[90vw] md:w-full flex flex-row justify-start items-center">
          <InputForm
            defaultValue={query ?? ''}
            type="text"
            id="q"
            onChange={onChangeDebounce}
            className={twMerge(
              'block w-full md:w-56 rounded-full border-2 border-primary-100 h-10 ring-blue',
            )}
            placeholder={placeholder}
          />
        </div>
      </div>
      {errorRequest && (
        <Text
          role="alert"
          className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {errorRequest}
        </Text>
      )}
    </div>
  )
}

export default Search
