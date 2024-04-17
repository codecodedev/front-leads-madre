import { registerUserProfile } from '@/actions/user'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import { OptionGeneric, Profile, Roles, User } from '@/types/general'
import React from 'react'
import { templateForm } from './templateForm'
import roles from '@/constants/roles.json'

export default async function RegisterUser() {
  let options: OptionGeneric<User | Profile>[] = [
    {
      label: 'Selecione',
      value: '',
    },
  ]
  const rolesSystem: Roles = roles
  for (const key in rolesSystem) {
    options = [
      ...options,
      {
        label: rolesSystem[key as keyof Roles] as string,
        value: rolesSystem[key as keyof Roles] as string,
      },
    ]
  }
  templateForm.sections[1].boxes[0].fields[0].option = {
    ...templateForm.sections[1].boxes[0].fields[0].option,
    list: options,
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            schemaName="EditProfile"
            action={registerUserProfile}
            templateForm={templateForm}
            pathSuccess="dashboard/users"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
