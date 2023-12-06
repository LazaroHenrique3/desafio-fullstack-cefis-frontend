'use client'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
//Services
import {
    IListUser,
    TUserRole,
    UserService
} from '@/services/api/user/UserService'
import { Loading } from '@/components/loading'

import { BasePageLayout } from '../BasePageLayout'
import { NoRegistersList } from '@/components/noRegistersList'
import { UserTable } from './components/userTable'
import { EnvironmentValues } from '@/environment'

const Users = () => {
    const [rows, setRows] = useState<IListUser[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    //Tipo do user logado
    const [typeUser, setTypeUser] = useState<TUserRole | ''>('')

    useEffect(() => {
        const fetchData = async () => {
            //Para pegar as informações da sessão
            const session = await getSession()

            let typeUserForListing: TUserRole | '' = ''

            //Pegando o type do user logado
            if (session?.user.typeUser) {
                //Adicionando ao state para ser usado psoteriormente
                setTypeUser(session?.user.typeUser)

                //Em resumo eu quero que se o usuário logado for aluno liste professores, caso seja professor liste alunos
                typeUserForListing = (session.user.typeUser === 'STUDENT') ? 'TEACHER' : 'STUDENT'
            }

            const rowsData = await UserService.listUser(page, '', 'desc', false, typeUserForListing)
            setIsLoading(false)

            if (rowsData instanceof Error) {
                return
            }

            setRows(rowsData.data)
            setTotalCount(rowsData.totalCount)
        }

        fetchData()
    }, [page])

    return (
        <BasePageLayout title={(typeUser === 'STUDENT') ? 'Professores' : 'Alunos'}>

            {isLoading ? (
                <Loading />
            ) : totalCount === 0 ? (
                <NoRegistersList />
            ) : (
                <>
                    {totalCount}
                    {`LIMIT: ${EnvironmentValues.LINE_LIMIT}`}
                    <UserTable
                        setPage={setPage}
                        page={page}
                        totalCount={totalCount}
                        rows={rows}
                    />
                </>
            )}
        </BasePageLayout>
    )
}

export default Users

