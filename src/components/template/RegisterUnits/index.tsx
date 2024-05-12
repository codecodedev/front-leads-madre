'use client'

import { registerUnit } from '@/actions/unit'
import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import useRegisterUnit from '@/hooks/use-register-unit'
import { Course, Segment, Unit } from '@/types/general'
import { templateForm as templateFormInit } from './templateForm'
import { useEffect } from 'react'

export default function RegisterUnits() {
  const { templateForm, listSegment } = useRegisterUnit(templateFormInit)

  useEffect(() => {
    listSegment()
  }, [])

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<Unit | Course | Omit<Segment, 'courses'>>
            templateForm={templateForm}
            action={registerUnit}
            pathSuccess="dashboard/units"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
