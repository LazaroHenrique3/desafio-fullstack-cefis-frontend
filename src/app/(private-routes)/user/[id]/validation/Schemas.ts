import * as yup from 'yup'

export interface IFormDataUpdate {
    name: string
    email: string
    password?: string
    confirmPassword?: string
}

//Definindo o schema para validação de atualização
export const formatValidationUpdateSchema: yup.Schema<IFormDataUpdate> = yup.object().shape({
    name: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
    email: yup.string().required().email().min(5).max(100),
    password: yup.string().min(6).max(256).optional(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').optional()
})