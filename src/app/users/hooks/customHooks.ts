//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IListUser, UserService } from '@/services/api/user/UserService'

interface IUseHandleProduct {
    setRows: (users: IListUser[]) => void
    rows: IListUser[]
    setTotalCount: (count: number) => void
    totalCount: number
}

export const UseHandleUser = ({ setRows, rows, setTotalCount, totalCount }: IUseHandleProduct) => {

    const handleDelete = async (idCourse: number, name: string) => {
        if (confirm(`Realmente deseja apagar "${name}"?`)) {
            const result = await UserService.deleteUser(idCourse)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const newRows = rows.filter(row => row.id !== idCourse)

            setRows(newRows)
            setTotalCount(totalCount - 1)
            toast.success('Registro apagado com sucesso!')
        }
    }


    return { handleDelete }
}

