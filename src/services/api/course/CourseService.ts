import { EnvironmentValues } from '../../../environment'
import { api } from '../axiosConfig'

export interface IListCourse {
    id: number
    title: string
    duration: number
    teacherId: number
}

export interface IDetailCourse {
    id: number
    title: string
    duration: number
    teacherId: number
}

type ICourseTotalCount = {
    data: IListCourse[],
    totalCount: number
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

const listCourse = async (page = 1, filter = '', orderBy = 'asc' ): Promise<ICourseTotalCount | Error> => {
    try {
        const { data, headers } = await api.get(`/courses/listCourse?page=${page}&limit=${EnvironmentValues.LINE_LIMIT}&filter=${filter}&orderBy=${orderBy}`)

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || EnvironmentValues.LINE_LIMIT)
            }
        }

        return new Error('Erro ao listar registros.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao listar registros.')
    }
}

const getCourseById = async (id: number): Promise<IDetailCourse | Error> => {

    try {
        const { data } = await api.get(`/courses/listCourse/${id}`)

        if (data) {
            return data
        }

        return new Error('Erro ao consultar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao consultar registro.')
    }

}

const createCourse = async (createData: Omit<IDetailCourse, 'id'>): Promise<IDetailCourse | Error> => {

    try {
        const { data } = await api.post('/courses/createCourse', createData)

        if (data) {
            return data
        }

        return new Error('Erro ao criar registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao criar registro.')

    }
}

const updateCourse = async (id: number, updateData: Omit<IDetailCourse, 'teacherId'>): Promise<IDetailCourse | Error> => {

    try {
        const { data } = await api.put(`/courses/updateCourse/${id}`, updateData)

        if (data) {
            return data
        }

        return new Error('Erro ao excluir registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao atualizar registro.')

    }
}

const deleteCourse = async (id: number): Promise<void | Error> => {

    try {
        await api.delete(`/courses/deleteCourse/${id}`)
    } catch (error) {
        console.error(error)
        return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao deletar registro.')
    }

}

export const CourseService = {
    listCourse,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
}