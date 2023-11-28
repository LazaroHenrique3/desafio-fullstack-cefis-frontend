'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//Material 
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TableFooter,
    Pagination,
    Button,
} from '@mui/material'
//Icons
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//Componentes estilizados
import {
    StyledTableCell,
    StyledTableRow
} from '@/components/styledComponents/styledListComponents'
//Services
import {
    IListUser,
    UserService
} from '@/services/api/user/UserService'
import { Loading } from '@/components/loading'
import { EnvironmentValues } from '@/environment'

import { UseHandleUser } from './hooks/customHooks'
import { BasePageLayout } from '../BasePageLayout'
import { AddCircleOutline } from '@mui/icons-material'
import { convertUserRole } from '@/utils/convertUserRole'

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
            title='Usuários'
            linkButton={
                <Button
                    variant="contained"
                    color='secondary'
                    sx={{ width: '100px' }}
                    startIcon={<AddCircleOutline />}
                    onClick={() => router.push('/user/new')}
                >
                    Novo
                </Button>
            }>

            {(isLoading) ? (
                <Loading />
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell size='small'>ID</StyledTableCell>
                                <StyledTableCell size='small' align="left">Nome</StyledTableCell>
                                <StyledTableCell size='small' align="left">Tipo</StyledTableCell>
                                <StyledTableCell size='small' align="left">Ações</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell size='small' component="th" scope="row">
                                        #{row.id}
                                    </StyledTableCell>
                                    <StyledTableCell size='small' align="left">{row.name}</StyledTableCell>
                                    <StyledTableCell size='small' align="left">{convertUserRole(row.role)}</StyledTableCell>
                                    <StyledTableCell size='small' align="left">
                                        <IconButton color='error' onClick={() => handleDelete(row.id, row.name)}>
                                            <DeleteIcon />
                                        </IconButton>

                                        <IconButton color='primary' onClick={() => router.push(`/user/${row.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            {(totalCount > 0 && totalCount > EnvironmentValues.LINE_LIMIT) && (
                                <TableRow>
                                    <StyledTableCell size='small' colSpan={11}>
                                        <Pagination
                                            page={page}
                                            count={Math.ceil(totalCount / EnvironmentValues.LINE_LIMIT)}
                                            onChange={(e, newPage) => setPage(newPage)}
                                        />
                                    </StyledTableCell>
                                </TableRow>
                            )}
                        </TableFooter>
                    </Table>
                </TableContainer>
            )}
        </BasePageLayout>
    )
}

export default Users

