import ListArchivedLeads from '@/components/template/ListArchivedLeads'
import { ParamsProp, SearchParams } from '@/types/general'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp
}) {
  const meta = await getTranslations({
    locale,
    namespace: 'metadata.dashboard.profile',
  })
  return {
    title: meta('title'),
    description: meta('description'),
  }
}

const page = ({ searchParams }: SearchParams) => {
  return <ListArchivedLeads searchParams={searchParams} />
}

export default page
