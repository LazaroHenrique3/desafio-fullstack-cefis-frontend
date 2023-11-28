/* 'use client'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import * as yup from 'yup'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IVFormErrors } from '@/components/forms'
import { FormHandles } from '@unform/core'

import {
    IFormData,
    IFormDataUpdate,
    formatValidationCreateSchema,
    formatValidationUpdateSchema
} from '../validation/Schemas'
import { QuestionService } from '@/services/api/question/QuestionService'

interface IUseHandleCourseProps {
    setIsLoading: (status: boolean) => void
    setName: (name: string) => void
    formRef: React.RefObject<FormHandles>
}

export const UseHandleQuestionAndResponse = ({ setIsLoading, setName, formRef}: IUseHandleCourseProps) => {

    const handleSave = async (data: IFormData) => {
        try {
            const validateData = await formatValidationCreateSchema.validate(data, { abortEarly: false })

            setIsLoading(true)

            const result = await QuestionService.createQuestion(validateData)
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            toast.success('Registro salvo com sucesso!')
            setName(data.title)
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

 */