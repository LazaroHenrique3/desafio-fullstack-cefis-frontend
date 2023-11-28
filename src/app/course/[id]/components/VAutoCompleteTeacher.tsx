import { useEffect, useMemo, useState } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useField } from '@unform/core'
import { UserService } from '@/services/api/user/UserService'

type TVAutoCompleteTeacherOption = {
    id: number
    label: string
}

interface VAutoCompleteTeacherProps {
    isExternalLoading: boolean
}

export const VAutoCompleteTeacher: React.FC<VAutoCompleteTeacherProps> = ({ isExternalLoading = false }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField('teacherId')


    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)

    const [options, setOptions] = useState<TVAutoCompleteTeacherOption[]>([])
    const [isLoading, setIsLoading] = useState(false)

    //Conectando de fato com o formulário
    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
        })
    }, [registerField, fieldName, selectedId])

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async () => {
            const result = await UserService.listUser(1, '', 'desc', true, 'TEACHER')
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            setOptions(result.data.map(teacher => ({ id: teacher.id, label: teacher.name })))
        }

        fetchData()

    }, [])

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null

        const selectedOption = options.find(option => option.id === selectedId)
        if (!selectedOption) return null

        return selectedOption
    }, [selectedId, options])

    return (
        <Autocomplete
            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem opções'
            loadingText='Carregando...'

            disablePortal
            value={autoCompleteSelectedOption}

            loading={isLoading}
            disabled={isExternalLoading}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} color='secondary' /> : undefined}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); clearError() }}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}

                    label='Professor'
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    )
}