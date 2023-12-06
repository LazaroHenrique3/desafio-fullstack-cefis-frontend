import * as yup from 'yup'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IVFormErrors } from '@/components/forms'
import { FormHandles } from '@unform/core'
import { IFormData, formatValidationCreateSchema } from '../validation/Schema'
import { IDetailResponse, ResponseService } from '@/services/api/response/ResponseService'

interface IUseHandleCourseProps {
    setIsLoading: (status: boolean) => void
    setResponses: (responses: IDetailResponse[]) => void
    responses: IDetailResponse[]
    idQuestion: number
    idUser: number
    formRef: React.RefObject<FormHandles>
}


export const UseHandleResponse = ({ setIsLoading, setResponses, responses, idQuestion, idUser, formRef }: IUseHandleCourseProps) => {

    const handleSave = async (data: IFormData) => {
        try {
            const validateData = await formatValidationCreateSchema.validate(data, { abortEarly: false })

            setIsLoading(true)

            //Irá retornar a resposta criada
            const result = await ResponseService.createResponse(idUser, { idQuestion, ...validateData })
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const updatedResponses = [result, ...responses]

            toast.success('Resposta salva com sucesso!')
            formRef.current?.setData({
                response_text: ''
            })
            setResponses(updatedResponses)
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

    const handleDelete = async (idResponse: number) => {
        if (confirm('Realmente deseja apagar esta resposta?')) {
            setIsLoading(true)
            
            const result = await ResponseService.deleteResponse(idResponse)
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const newResponses = responses.filter(response => response.id !== idResponse)

            setResponses(newResponses)
            toast.success('Registro apagado com sucesso!')
        }
    }

    return { handleSave, handleDelete }
}

