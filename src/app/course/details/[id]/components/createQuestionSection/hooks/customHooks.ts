import * as yup from 'yup'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IVFormErrors } from '@/components/forms'
import { FormHandles } from '@unform/core'
import { IFormData, formatValidationCreateSchema } from '../validation/Schema'
import { IDetailQuestion, QuestionService } from '@/services/api/question/QuestionService'

interface IUseHandleCourseProps {
    setIsLoading: (status: boolean) => void
    setQuestions: (questions: IDetailQuestion[]) => void
    questions: IDetailQuestion[]
    idCourse: number
    formRef: React.RefObject<FormHandles>
}

export const UseHandleQuestion = ({ setIsLoading, setQuestions, questions, idCourse, formRef}: IUseHandleCourseProps) => {

    const handleSave = async (data: IFormData) => {
        try {
            const validateData = await formatValidationCreateSchema.validate(data, { abortEarly: false })

            setIsLoading(true)

            //Irá retornar a pergunta criada
            const result = await QuestionService.createQuestion({idCourse, ...validateData})
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const updatedQuestions = [result, ...questions]

            toast.success('Pergunta salva com sucesso!')
            setQuestions(updatedQuestions)
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

