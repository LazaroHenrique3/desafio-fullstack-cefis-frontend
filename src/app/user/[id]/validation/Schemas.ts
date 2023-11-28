import * as yup from 'yup'

import { TUserRole } from '@/services/api/user/UserService'

export interface IFormData {
    name: string
    role: TUserRole
}

export interface IFormDataUpdate {
    name: string
}

//Definindo o schema para validação de criação
export const formatValidationCreateSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
    role: yup.string().oneOf(['STUDENT', 'TEACHER']).required(),
})

//Definindo o schema para validação de atualização
export const formatValidationUpdateSchema: yup.Schema<IFormDataUpdate> = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
})