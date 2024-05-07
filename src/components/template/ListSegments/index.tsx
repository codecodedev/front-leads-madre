import { listSegments } from '@/actions/segments'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import Search from '@/components/molecules/Search'
import Listing from '@/components/organisms/Listing'
import { SearchParams } from '@/types/general'
import { infoList } from './templates'

infoList.listActions = [
  {
    id: 1,
    icon: 'Trash',
    onclick: async (id) => {
      'use server'
      console.log('deletar: ', id)
    },
    name: 'Deletar',
  },
  ...(infoList.listActions ?? []),
]

export default async function ListSegments({ searchParams }: SearchParams) {
  const response = await listSegments(
    searchParams?.q ?? '',
    searchParams?.page ?? '',
  )
  const list = response?.response ?? null
  const count = response?.count ?? null
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
            listActions={infoList.listActions}
            hrefButton="dashboard/segments/register"
            textButton="Novo Seguimento"
            title="Seguimentos"
            count={count}
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
