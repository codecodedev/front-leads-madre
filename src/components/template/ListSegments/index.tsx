import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { api } from '@/data/api'
import {
  InfoList,
  Segment,
  ReturnLoadList,
  SearchParams,
} from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import React from 'react'

async function loadSegments(
  q?: string,
  page?: string,
): Promise<ReturnLoadList<Segment>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(
      '/segments',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['segments'], revalidate: 60 * 4 },
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
    return { response: list.segments }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function ListSegments({ searchParams }: SearchParams) {
  const infoList: InfoList<Segment> = {
    itemsHeader: ['N', 'Nome', ''],
    itemsList: ['name', '', '', '', ''],
  }

  const response = await loadSegments(
    searchParams?.q ?? '',
    searchParams?.page ?? '',
  )
  const list = response?.response ?? null
  const errorRequest = response.error?.request ?? null

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search errorRequest={errorRequest} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            list={list}
            infoList={infoList}
            listActions={mockServer.listActionsSegments}
            hrefButton="dashboard/segments/register"
            textButton="Novo Seguimento"
            title="Seguimentos"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
