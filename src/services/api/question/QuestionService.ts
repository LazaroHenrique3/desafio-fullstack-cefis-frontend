import { EnvironmentValues } from '@/environment'
import { api } from '../axiosConfig'
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

type IQuestionTotalCount = {
    data: IListQuestion[],
    totalCount: number
}

interface ErrorResponse {
    response: {
        data?: {
            errors?: {
                default?: string
            }
        },
        status?: number
    }
}

const listQuestion = async (idCourse: number, page = 1, orderBy = 'desc' ): Promise<IQuestionTotalCount | Error> => {
    try {
        const { data, headers } = await api.get(`/questions/listQuestionCourse/${idCourse}?page=${page}&limit=${EnvironmentValues.LINE_LIMIT}&orderBy=${orderBy}`)

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || EnvironmentValues.LINE_LIMIT)
            }
        }

        return new Error('Erro ao listar registros.')

    } catch (error) {
        console.error(error)

        //Tratando respostas 404, para pode lidar melhor no front
        if((error as ErrorResponse).response?.status){
            return {
                data: [],
                totalCount: 0
            }
        }

        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao listar registros.')
    }
}

const createQuestion = async (createData: Omit<IDetailQuestion, 'id' | 'student' | 'Response'>): Promise<IDetailQuestion | Error> => {

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
    listQuestion,
    createQuestion
}