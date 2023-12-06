import * as yup from 'yup'

export interface IFormData {
    title: string
    duration: number
}

//Definindo o schema para validação de criação
export const formatValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    title: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
    duration: yup.number().moreThan(0).integer().required(),
})

