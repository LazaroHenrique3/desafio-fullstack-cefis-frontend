import * as yup from 'yup'

export interface IFormData {
    question_text: string
    idStudent: number
}

//Definindo o schema para validação de criação
export const formatValidationCreateSchema: yup.Schema<IFormData> = yup.object().shape({
    question_text: yup.string().transform(value => (value ? value.trim() : '')).min(3).max(100).required(),
    idStudent: yup.number().moreThan(0).integer().required()
})
