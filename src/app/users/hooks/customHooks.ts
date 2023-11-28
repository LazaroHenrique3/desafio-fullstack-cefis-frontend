import { IListUser, UserService } from '@/services/api/user/UserService'

interface IUseHandleProduct {
    setRows: (users: IListUser[]) => void
    rows:  IListUser[]
}

export const UseHandleUser = ({ setRows, rows}: IUseHandleProduct) => {

    const handleDelete = async (idCourse: number, name: string) => {
        if (confirm(`Realmente deseja apagar "${name}"?`)) {
            const result = await UserService.deleteUser(idCourse)

            if (result instanceof Error) {
                //toast.error(result.message)
                return
            }

            const newRows = rows.filter(row => row.id !== idCourse)

            setRows(newRows)
            //toast.success('Registro apagado com sucesso!')
        }
    }
    
    return { handleDelete }
}

