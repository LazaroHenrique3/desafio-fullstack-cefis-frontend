import { EnvironmentValues } from '@/environment'
import { api } from '../axiosConfig'

export interface IListResponse {
    id: number,
    idResponse: number,
    response_text: string
}

export interface IDetailResponse {
    id: number,
    idResponse: number,
    response_text: string
}

type IResponseTotalCount = {
    data: IListResponse[],
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

const listResponse = async (page = 1, idQuestion: number, orderBy = 'desc' ): Promise<IResponseTotalCount | Error> => {
    try {
        const { data, headers } = await api.get(`/responses/listResponseQuestion/${idQuestion}?page=${page}&limit=${EnvironmentValues.LINE_LIMIT}&orderBy=${orderBy}`)

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

const createResponse = async (idResponse: number, createData: Omit<IDetailResponse, 'id' >): Promise<IDetailResponse | Error> => {

    try {
        const { data } = await api.post(`/responses/createResponse/${idResponse}`, createData)

        if (data) {
            return data
        }

        return new Error('Erro ao criar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao criar registro.')

    }
}

export const ResponseService = {
    listResponse,
    createResponse
}