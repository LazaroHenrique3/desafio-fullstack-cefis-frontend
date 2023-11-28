import { api } from '../axiosConfig'
import { IDetailCourse } from '../course/CourseService'
import { IDetailResponse } from '../response/ResponseService'

export interface IListQuestion {
    id: number
    idCourse: number,
    idStudent: number,
    question_text: string
    student: {
        name: string
    }
    Response: IDetailResponse[]
}

export interface IDetailQuestion {
    id: number
    idCourse: number,
    idStudent: number,
    question_text: string,
    student: {
        name: string
    }
    Response: IDetailResponse[]
}

interface ErrorResponse {
    response: {
        data?: {
            errors?: {
                default?: string
            }
        }
    }
}

const createQuestion = async (createData: Omit<IDetailCourse, 'id' | 'teacher'>): Promise<IDetailCourse | Error> => {

    try {
        const { data } = await api.post('/questions/createQuestion', createData)

        if (data) {
            return data
        }

        return new Error('Erro ao criar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao criar registro.')

    }
}

export const QuestionService = {
    createQuestion
}