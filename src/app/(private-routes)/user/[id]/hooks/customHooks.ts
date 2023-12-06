'use client'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IVFormErrors } from '@/components/forms'
import { FormHandles } from '@unform/core'

import {
    IFormDataUpdate,
    formatValidationUpdateSchema
} from '../validation/Schemas'
import { UserService } from '@/services/api/user/UserService'

interface IUseHandleUserProps {
    setIsLoading: (status: boolean) => void
    setIsAlterPassword: (isAlter: boolean) => void
    setName: (name: string) => void
    formRef: React.RefObject<FormHandles>
    id: number
}

export const UseHandleUser = ({ setIsLoading, setIsAlterPassword, setName, formRef, id }: IUseHandleUserProps) => {
    const router = useRouter()

    const handleSave = async (data: IFormDataUpdate) => {
        try {
            //Validando os dados recebidos do VForm
            const validateData = await formatValidationUpdateSchema.validate(data, { abortEarly: false })
            setIsLoading(true)

            //Chamando o service de user, para fazer a alteraão
            const result = await UserService.updateUser(Number(id), { id: Number(id), ...validateData })
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            //TODO: Atualizar o session

            setIsAlterPassword(false)
            setName(data.name)
            toast.success('Registro salvo com sucesso!')
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

    const handleDelete = async () => {

        if (confirm('Realmente deseja excluir sua conta?')) {
            const result = await UserService.deleteUser(id)

            if (result instanceof Error) {
                console.log('Veio no erro?')
                toast.error(result.message)
                return
            }

            //Ao apagar eu tenho que deslogar ele do sistema
            await signOut({
                redirect: false
            })

            router.replace('/')
            toast.success('Registro apagado com sucesso!')
        }
    }

    return { handleSave, handleDelete }
}

