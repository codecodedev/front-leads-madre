import { listSelectSegments } from '@/actions/segments'
import { Course, Segment, TemplateForm, Unit } from '@/types/general'
import { useState } from 'react'

export default function useRegisterUnit(
  template: TemplateForm<Unit | Course | Segment>,
) {
  const [templateForm, setTemplateForm] =
    useState<TemplateForm<Unit | Course | Segment>>(template)

  function addCourse(segment?: Segment) {
    if (segment) {
      const courses = templateForm.sections[2].boxes[0].fields[0].option
        ?.list as Course[]
      const idsCourses = courses?.map((course) => course.id)
      const coursesSegment = segment?.courses
        ?.map((course) => course.course)
        .filter((course) => !idsCourses.includes(course.id))
      if (coursesSegment && courses) {
        templateForm.sections[2].boxes[0].fields[0].option = {
          ...templateForm.sections[2].boxes[0].fields[0].option,
          list: [...courses, ...coursesSegment],
        }
        setTemplateForm({ ...templateForm })
      }
    }
  }
  // TODO: refatorar para selecionar um segmento por vez e seus cursos
  async function listSegment(unit?: Unit) {
    const resp = await listSelectSegments()
    if (resp.response) {
      const segments = resp.response
      if (unit && unit.segments) {
        for (let i = 0; i < unit.segments.length; i++) {
          const segment = unit.segments[i].segment
          addCourse(segment)
        }
      }
      templateForm.sections[1].boxes[0].fields[0].option = {
        ...templateForm.sections[1].boxes[0].fields[0].option,
        list: segments,
        values: unit?.segments?.map((segment) => segment.segment.id),
        onChange: (id?: string) => {
          const segment = segments.find((segment) => segment.id === id)
          addCourse(segment)
        },
        onDelete: (id: string, formDataExtra: FormData) => {
          const coursesInit = JSON.parse(
            String(formDataExtra.get('courses')) ?? '[]',
          ) as string[]
          const segmentsInit = JSON.parse(
            String(formDataExtra.get('segments')) ?? '[]',
          ) as string[]
          const segment = segments.find((segment) => segment.id === id)
          if (segment) {
            let coursesSegment = segment?.courses?.map(
              (course) => course.course.id,
            )
            coursesSegment = coursesSegment?.filter((item) => {
              const verify = segmentsInit.filter((seg) => {
                if (seg !== segment.id) {
                  const coursesIdSegment = segments
                    .find((segment) => segment.id === seg)
                    ?.courses?.map((course) => course.course.id)
                  const exist = coursesIdSegment?.includes(item)
                  return exist
                } else {
                  return false
                }
              })
              return verify.length === 0
            })
            for (let i = 0; i < segmentsInit.length; i++) {
              const coursesIdSegment = segments
                .find((segment) => segment.id === id)
                ?.courses?.map((course) => course.course.id)
              const exist = coursesSegment?.filter((item) =>
                coursesIdSegment?.includes(item),
              )
            }
            if (coursesSegment) {
              let courses = templateForm.sections[2].boxes[0].fields[0].option
                ?.list as Course[]
              if (courses) {
                courses = courses.filter(
                  (course) => !coursesSegment.includes(course.id),
                )
                templateForm.sections[2].boxes[0].fields[0].option = {
                  ...templateForm.sections[2].boxes[0].fields[0].option,
                  list: [...courses],
                  values: [
                    ...coursesInit.filter(
                      (course) => !coursesSegment.includes(course),
                    ),
                  ],
                }
                setTemplateForm({ ...templateForm })
              }
            }
          }
        },
      }
      if (unit?.courses && unit?.courses?.length > 0) {
        templateForm.sections[2].boxes[0].fields[0].option = {
          ...templateForm.sections[2].boxes[0].fields[0].option,
          values: unit?.courses?.map((course) => course.course.id),
        }
      }
      setTemplateForm({ ...templateForm })
    }
  }

  return { templateForm, listSegment }
}
