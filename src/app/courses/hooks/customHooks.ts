//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IListCourse, CourseService } from '@/services/api/course/CourseService'

interface IUseHandleProduct {
    setRows: (courses: IListCourse[]) => void
    rows: IListCourse[]
}

export const UseHandleCourse = ({ setRows, rows }: IUseHandleProduct) => {

    const handleDelete = async (idCourse: number, name: string) => {
        if (confirm(`Realmente deseja apagar "${name}"?`)) {
            const result = await CourseService.deleteCourse(idCourse)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const newRows = rows.filter(row => row.id !== idCourse)

            setRows(newRows)
            toast.success('Registro apagado com sucesso!')
        }
    }


    return { handleDelete }
}

