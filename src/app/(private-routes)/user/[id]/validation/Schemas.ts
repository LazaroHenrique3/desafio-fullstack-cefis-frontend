import * as yup from 'yup'

import { TUserRole } from '@/services/api/user/UserService'

export interface IFormData {
    name: string
    email: string
    role: TUserRole
    password: string
}

export interface IFormDataUpdate {
    name: string
    email: string
    password: string
}

//Definindo o schema para validação de criação
export const formatValidationCreateSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
    email: yup.string().required().email().min(5).max(100),
    role: yup.string().oneOf(['STUDENT', 'TEACHER']).required(),
    password: yup.string().required().min(6).max(256),
})

//Definindo o schema para validação de atualização
export const formatValidationUpdateSchema: yup.Schema<IFormDataUpdate> = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
    email: yup.string().required().email().min(5).max(100),
    password: yup.string().required().min(6).max(256),
})