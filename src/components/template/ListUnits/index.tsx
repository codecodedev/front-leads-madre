import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { api } from '@/data/api'
import { InfoList, ReturnLoadList, SearchParams, Unit } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import React from 'react'

async function loadUnits(
  q: string,
  page: string,
): Promise<ReturnLoadList<Unit>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/units',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['units'], revalidate: 60 * 4 },
      },
      page,
      q,
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const list = await response.json()
    return { response: list.units }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function ListUnits({ searchParams }: SearchParams) {
  const infoList: InfoList<Unit> = {
    itemsHeader: ['N', 'NOME', 'QUANT. SEGUIMENTOS', ' QUANT. CURSOS', ''],
    itemsList: ['name', '', '_count.segments', '_count.courses', ''],
  }

  const response = await loadUnits(
    searchParams?.q ?? '',
    searchParams?.page ?? '',
  )
  const list = response?.response ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4 mb-6">
        <div className="w-full">
          <Breadcrumb />
        </div>

        <div className="w-full mt-6">
          <Search errorRequest={errorRequest} />
        </div>

        <div className="w-full mt-6 lg:mt-8">
          <Listing
            infoList={infoList}
            list={list}
            listActions={mockServer.listActionsUnits}
            hrefButton="dashboard/units/register"
            textButton="Nova Unidade"
            title="Unidades"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
