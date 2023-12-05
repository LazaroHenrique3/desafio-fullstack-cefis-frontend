import * as yup from 'yup'

export interface IFormData {
    question_text: string
}

//Definindo o schema para validação de criação
export const formatValidationCreateSchema: yup.Schema<IFormData> = yup.object().shape({
    question_text: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
})
