'use client'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IVFormErrors } from '@/components/forms'
import { FormHandles } from '@unform/core'

import { 
    IFormData, 
    formatValidationSchema,
} from '../validation/Schemas'
import { CourseService } from '@/services/api/course/CourseService'

interface IUseHandleCourseProps {
    setIsLoading: (status: boolean) => void
    setName: (name: string) => void
    formRef: React.RefObject<FormHandles>
    id: string
    idUser: number
}

export const UseHandleCourse = ({ setIsLoading, setName, formRef, id, idUser }: IUseHandleCourseProps) => {
    const router = useRouter()

    const handleSave = async (data: IFormData) => {
        try {
            const validateData = await formatValidationSchema.validate(data, { abortEarly: false })
    
            setIsLoading(true)

            //Significa que é alteração
            if (id === 'new') {
                const result = await CourseService.createCourse({teacherId: idUser, ...validateData})
                setIsLoading(false)

                if (result instanceof Error) {
                    toast.error(result.message)
                } else {
                    toast.success('Registro salvo com sucesso!')
                    router.push('/courses')
                }
            } else {
                const result = await CourseService.updateCourse(Number(id), { id: Number(id), ...validateData })
                setIsLoading(false)

                if (result instanceof Error) {
                    toast.error(result.message)
                    return
                }

                toast.success('Registro salvo com sucesso!')
                setName(data.title)
            }
        } catch (errors) {

            const errorsYup: yup.ValidationError = errors as yup.ValidationError

            const validationErrors: IVFormErrors = {}

            errorsYup.inner.forEach(error => {
                if (!error.path) return

                validationErrors[error.path] = error.message
                formRef.current?.setErrors(validationErrors)
            })
        }
    }

    return { handleSave }
}

