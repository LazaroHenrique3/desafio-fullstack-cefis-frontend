import { api } from '../axiosConfig'

export interface IListResponse {
    id: number,
    idQuestion: number,
    response_text: string
}

export interface IDetailResponse {
    id: number,
    idQuestion: number,
    response_text: string
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

const createResponse = async (idQuestion: number, createData: Omit<IDetailResponse, 'id' >): Promise<IDetailResponse | Error> => {

    try {
        const { data } = await api.post(`/responses/createResponse/${idQuestion}`, createData)

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
    createResponse
}