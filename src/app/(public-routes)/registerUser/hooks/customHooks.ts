import * as yup from 'yup'
import { FormHandles } from '@unform/core'
import { useRouter } from 'next/navigation'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    IFormData,
    formatValidationSchema,
} from '../validation/Schema'

import { IVFormErrors } from '@/components/forms'
import { UserService } from '@/services/api/user/UserService'

interface IUseLoginAdmin {
    setIsLoading: (status: boolean) => void
    formRef: React.RefObject<FormHandles>
}

export const UseHandleUserRegister = ({ setIsLoading, formRef }: IUseLoginAdmin) => {
    const router = useRouter()

    const handleRegister = async (data: IFormData) => {
        try {
            const validateData = await formatValidationSchema.validate(data, { abortEarly: false })

            setIsLoading(true)

            const result = await UserService.createUser(validateData as IFormData)
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
            } else {
                toast.success('Registro salvo com sucesso!')
                router.push(`/?email=${data.email}`)
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

    return { handleRegister }

}