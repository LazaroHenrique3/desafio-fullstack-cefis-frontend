'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//Material 
import {
    Button,
} from '@mui/material'
//Services
import {
    IListUser,
    UserService
} from '@/services/api/user/UserService'
import { Loading } from '@/components/loading'

import { UseHandleUser } from './hooks/customHooks'
import { BasePageLayout } from '../BasePageLayout'
import { AddCircleOutline } from '@mui/icons-material'
import { NoRegistersList } from '@/components/noRegistersList'
import { UserTable } from './components/userTable'

const Users = () => {
    const [rows, setRows] = useState<IListUser[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const rowsData = await UserService.listUser(page)
            setIsLoading(false)

            if (rowsData instanceof Error) {
                toast.error(rowsData.message)
                return
            }

            setRows(rowsData.data)
            setTotalCount(rowsData.totalCount)
        }

        fetchData()
    }, [page])

    //hooks personalizados
    const { handleDelete } = UseHandleUser({ setRows, rows })

    return (
        <BasePageLayout
            title="Usuários"
            linkButton={
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: '100px' }}
                    startIcon={<AddCircleOutline />}
                    onClick={() => router.push('/user/new')}
                >
                    Novo
                </Button>
            }
        >
            {isLoading ? (
                <Loading />
            ) : totalCount === 0 ? (
                <NoRegistersList />
            ) : (
                <UserTable
                    setPage={setPage}
                    page={page}
                    totalCount={totalCount}
                    rows={rows}
                    handleDelete={handleDelete}
                    router={router}
                />
            )}
        </BasePageLayout>
    )
}

export default Users

