'use client'
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
import { UserService } from '@/services/api/user/UserService'

interface IUseHandleUserProps {
    setIsLoading: (status: boolean) => void
    setName: (name: string) => void
    formRef: React.RefObject<FormHandles>
    id: string
    router: AppRouterInstance
}

export const UseHandleUser = ({ setIsLoading, setName, formRef, id, router }: IUseHandleUserProps) => {

    const handleSave = async (data: IFormData) => {
        try {
            let validateData: IFormData | IFormDataUpdate

            if(id === 'new'){
                validateData = await formatValidationCreateSchema.validate(data, { abortEarly: false })
            } else {
                validateData = await formatValidationUpdateSchema.validate(data, { abortEarly: false })
            }

            setIsLoading(true)

            //Significa que é alteração
            if (id === 'new') {
                const result = await UserService.createUser(validateData as IFormData)
                setIsLoading(false)

                if (result instanceof Error) {
                    toast.error(result.message)
                } else {
                    toast.success('Registro salvo com sucesso!')
                    router.push('/users')
                }
            } else {
                const result = await UserService.updateUser(Number(id), { id: Number(id), ...validateData })
                setIsLoading(false)

                if (result instanceof Error) {
                    toast.error(result.message)
                    return
                }

                toast.success('Registro salvo com sucesso!')
                setName(data.name)
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

