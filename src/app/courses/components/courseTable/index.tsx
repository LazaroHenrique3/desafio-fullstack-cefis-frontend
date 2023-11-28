import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { 
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { 
    StyledTableCell, 
    StyledTableRow 
} from '@/components/styledComponents/styledListComponents'

import { IListCourse } from '@/services/api/course/CourseService'
import { EnvironmentValues } from '@/environment'

interface ICourseTableProps {
    setPage: (newPage: number) => void
    page: number
    totalCount: number
    rows: IListCourse[]
    handleDelete: (id: number, title: string) => void
    router: AppRouterInstance
}

export const CourseTable: React.FC<ICourseTableProps>  = ({setPage, page, totalCount, rows, handleDelete, router}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell size="small">ID</StyledTableCell>
                        <StyledTableCell size="small" align="left">
                            Título
                        </StyledTableCell>
                        <StyledTableCell size="small" align="left">
                            Professor
                        </StyledTableCell>
                        <StyledTableCell size="small" align="left">
                            Duração (Hr)
                        </StyledTableCell>
                        <StyledTableCell size="small" align="left">
                            Ações
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
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell size="small" align="left">
                                {row.teacher.name}
                            </StyledTableCell>
                            <StyledTableCell size="small" align="left">
                                {row.duration}
                            </StyledTableCell>
                            <StyledTableCell size="small" align="left">
                                <IconButton color="error" onClick={() => handleDelete(row.id, row.title)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton color="primary" onClick={() => router.push(`/course/${row.id}`)}>
                                    <EditIcon />
                                </IconButton>
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

