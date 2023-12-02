import { EnvironmentValues } from '../../../environment'
import { api } from '../axiosConfig'

export type TUserRole = 'STUDENT' | 'TEACHER';

export interface IListUser {
    id: number
    name: string
    role: TUserRole
}

export interface IDetailUser {
    id: number
    name: string
    role: TUserRole
}

type IUserTotalCount = {
    data: IListUser[],
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

const listUser = async (page = 1, filter = '', orderBy = 'desc', noLimit = false, typeUser = ''): Promise<IUserTotalCount | Error> => {
    try {
        //Solução temporária para garantir que traga "Todos"
        const limit = noLimit ? 500 : EnvironmentValues.LINE_LIMIT

        const { data, headers } = await api.get(`/users/listUser?page=${page}&limit=${limit}&filter=${filter}&orderBy=${orderBy}&typeUser=${typeUser}`)

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
        if ((error as ErrorResponse).response?.status) {
            return {
                data: [],
                totalCount: 0
            }
        }

        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao listar registros.')
    }
}

const getUserById = async (id: number): Promise<IDetailUser | Error> => {

    try {
        const { data } = await api.get(`/users/listUser/${id}`)

        if (data) {
            return data
        }

        return new Error('Erro ao consultar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao consultar registro.')
    }

}

const createUser = async (createData: Omit<IDetailUser, 'id'>): Promise<IDetailUser | Error> => {

    try {
        const { data } = await api.post('/users/createUser', createData)

        if (data) {
            return data
        }

        return new Error('Erro ao criar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao criar registro.')

    }
}

const updateUser = async (id: number, updateData: Omit<IDetailUser, 'role'>): Promise<IDetailUser | Error> => {

    try {
        const { data } = await api.put(`/users/updateUser/${id}`, updateData)

        if (data) {
            return data
        }

        return new Error('Erro ao excluir registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao atualizar registro.')

    }
}

const deleteUser = async (id: number): Promise<void | Error> => {

    try {
        await api.delete(`/users/deleteUser/${id}`)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao deletar registro.')
    }

}

export const UserService = {
    listUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}