import * as yup from 'yup'
import { FormHandles } from '@unform/core'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    IFormData,
    formatValidationSchema,
} from '../validation/Schema'

import { IVFormErrors } from '@/components/forms'

interface IUseLoginAdmin {
    setIsLoading: (status: boolean) => void
    formRef: React.RefObject<FormHandles>
}

export const UseHandleLogin = ({ setIsLoading, formRef }: IUseLoginAdmin) => {
    const router = useRouter()

    const handleLogin = async (data: IFormData) => {
        try {
            const validateData = await formatValidationSchema.validate(data, { abortEarly: false })

            setIsLoading(true)

            //Chamando o sign in que eu configurei com as credentials
            const result = await signIn('credentials', {
                email: validateData.email,
                password: validateData.password,
                redirect: false
            })

            setIsLoading(false)

            if (result?.error) {
                toast.error(result.error)
                return
            }

            router.replace('/home')

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

    return { handleLogin }

}