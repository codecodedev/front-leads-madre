import { mockServer } from '@/components/config/mockServer'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { api } from '@/data/api'
import { InfoList, ReturnLoadList, User } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import React from 'react'

async function loadIndicators(): Promise<ReturnLoadList<User>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/indicators', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const { users } = await response.json()
    return { response: users }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

export default async function ListRequestIndicators() {
  const infoList: InfoList<User> = {
    itemsHeader: ['N', 'NOME', 'E-MAIL', ''],
    itemsList: ['name', '', '', 'email', ''],
  }

  const response = await loadIndicators()
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
            infoList={infoList}
            list={list}
            listActions={mockServer.listActionsIndicators}
            hrefButton="dashboard/indicators/register"
            textButton=""
            title="Solicitação para indicadores"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
