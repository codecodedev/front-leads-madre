import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import FormDashboard from '@/components/organisms/FormDashboard'
import React from 'react'
import { templateForm } from './templateForm'
import { registerUnit } from '@/actions/unit'
import { Course, ReturnLoadList, Segment, Unit } from '@/types/general'
import { getTokenFromCookieServer } from '@/utils/cookieServer'
import { api } from '@/data/api'

async function loadCourses(): Promise<ReturnLoadList<Course>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api(`/course/select`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 20,
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      return {
        error: { request: JSON.parse(errorMessage).message },
      }
    }
    const list = await response.json()
    return { response: list.courses }
  } catch (error) {
    return { error: { request: 'Error unknown' } }
  }
}

async function loadSegments(): Promise<ReturnLoadList<Segment>> {
  try {
    const token = getTokenFromCookieServer()
    const response = await api('/segment/select', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 20,
      },
    })

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

export default async function RegisterUnits() {
  const responseSegments = await loadSegments()
  templateForm.sections[1].boxes[0].fields[0].option = {
    ...templateForm.sections[1].boxes[0].fields[0].option,
    list: responseSegments?.response ?? [],
  }
  const responseCourses = await loadCourses()
  templateForm.sections[2].boxes[0].fields[0].option = {
    ...templateForm.sections[2].boxes[0].fields[0].option,
    list: responseCourses?.response ?? [],
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard<Unit | Course | Segment>
            templateForm={templateForm}
            action={registerUnit}
            schemaName="EditProfile"
            pathSuccess="dashboard/units"
          />
        </div>
      </div>
    </ContainerDashboard>
  )
}
