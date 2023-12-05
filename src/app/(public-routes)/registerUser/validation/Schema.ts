import * as yup from 'yup'

import { TUserRole } from '@/services/api/user/UserService'

export interface IFormData {
    name: string
    email: string
    role: TUserRole
    password: string
    confirmPassword: string
}

//Definindo o schema para validação
export const formatValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
    email: yup.string().required().email().min(5).max(100),
    role: yup.string().oneOf(['STUDENT', 'TEACHER']).required(),
    password: yup.string().required().min(6).max(256),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required()
})
