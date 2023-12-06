import { 
    Pagination,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow
} from '@mui/material'

import { 
    StyledTableCell, 
    StyledTableRow 
} from '@/components/styledComponents/styledListComponents'

import { IListUser } from '@/services/api/user/UserService'
import { EnvironmentValues } from '@/environment'
import { convertUserRole } from '@/utils/convertUserRole'

interface IUserTableProps {
    setPage: (newPage: number) => void
    page: number
    totalCount: number
    rows: IListUser[]
}

export const UserTable: React.FC<IUserTableProps>  = ({setPage, page, totalCount, rows}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell size="small" sx={{ width: 30 }}>ID</StyledTableCell>
                        <StyledTableCell size="small" align="left">
                            Nome
                        </StyledTableCell>
                        <StyledTableCell size="small" align="left">
                            E-mail
                        </StyledTableCell>
                        <StyledTableCell size="small" align="left">
                            Tipo
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell size="small" component="th" scope="row">
                                #{row.id}
                            </StyledTableCell>
                            <StyledTableCell size="small" align="left">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell size="small" align="left">
                                {row.email}
                            </StyledTableCell>
                            <StyledTableCell size="small" align="left">
                                {convertUserRole(row.role)}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {totalCount > 0 && totalCount > EnvironmentValues.LINE_LIMIT && (
                        <TableRow>
                            <StyledTableCell size="small" colSpan={11}>
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
    )
}

