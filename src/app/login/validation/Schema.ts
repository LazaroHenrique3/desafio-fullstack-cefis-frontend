import * as yup from 'yup'

export interface IFormData {
    email: string
    password: string
}

//Definindo o schema para validação
export const formatValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    email: yup.string().required().email().min(5).max(100),
    password: yup.string().required().min(6).max(256),
})
