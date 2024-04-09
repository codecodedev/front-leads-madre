'use client'

import { Text } from '@/components/atoms'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { useHandlerMockServer } from '@/hooks/use-handler-mock-server'
import { Form, InfoList, ItemListType, Unit } from '@/types/general'
import React, { useState } from 'react'
import { templates } from './templates'
import DetailDefault from '@/components/organisms/DetailDefault'
import { useItemListTransform } from '@/hooks/use-item-list-transform'
import { loginUser } from '@/actions/auth'
import { formSchemaSignIn } from '../SingIn/schema'

const DetailUnits = ({ id }: { id: string }) => {
  const { listTransform } = useItemListTransform()
  const { getUnitForId } = useHandlerMockServer()
  const [loading, setLoading] = useState(false)
  const [lists, setLists] = useState<InfoList[]>([
    templates.infoListSegments,
    templates.infoListCourses,
  ])

  function getUnit(): Promise<Unit> {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = getUnitForId(id)[0]
        const listSegments: ItemListType[] = listTransform(
          response?.segments,
          lists[0].itemsList,
        )
        const listCourses: ItemListType[] = listTransform(
          response?.courses,
          lists[1].itemsList,
        )
        lists[0].list = listSegments
        lists[1].list = listCourses
        setLists([...lists])
        setLoading(false)
        resolve(response)
      }, 2000)
    })
  }

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>
  }

  function handleRegister(data: Unit) {
    console.log('data FormDashboard: ', data)
  }

  const forms: Form[] = [
    {
      template: templates.templateForm,
      handlerForm: handleRegister,
      getDefaultValues: getUnit,
      loading,
      action: loginUser,
      schema: formSchemaSignIn,
      pathSuccess: '/',
    },
  ]

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <DetailDefault
          renderAvatar={renderAvatar}
          forms={forms}
          lists={lists}
        />
      </div>
    </ContainerDashboard>
  )
}

export default DetailUnits
