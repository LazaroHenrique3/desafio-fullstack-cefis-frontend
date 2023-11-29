'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
//Material 
import {
    Button,
} from '@mui/material'
//Services
import {
    IListCourse,
    CourseService
} from '@/services/api/course/CourseService'
import { Loading } from '@/components/loading'

import { UseHandleCourse } from './hooks/customHooks'
import { BasePageLayout } from '../BasePageLayout'
import { AddCircleOutline } from '@mui/icons-material'
import { NoRegistersList } from '@/components/noRegistersList'
import { CourseTable } from './components/courseTable'

const Courses = () => {
    const [rows, setRows] = useState<IListCourse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const rowsData = await CourseService.listCourse(page)
            setIsLoading(false)

            if (rowsData instanceof Error) {
                return
            }

            setRows(rowsData.data)
            setTotalCount(rowsData.totalCount)
        }

        fetchData()
    }, [page])

    //hooks personalizados
    const { handleDelete } = UseHandleCourse({ setRows, rows })

    return (
        <BasePageLayout
            title="Cursos"
            linkButton={
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: '100px' }}
                    startIcon={<AddCircleOutline />}
                    onClick={() => router.push('/course/new')}
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
                <CourseTable
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

export default Courses

