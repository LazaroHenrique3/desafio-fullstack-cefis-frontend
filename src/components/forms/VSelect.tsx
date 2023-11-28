import { InputLabel, SelectProps, Select, MenuItem, FormHelperText, FormControl } from '@mui/material'
import { useField } from '@unform/core'
import { useEffect, useState } from 'react'

interface SelectOptionType {
    label: string;
    value: string | number;
    disabled?: boolean
}

type TVSelect = SelectProps & {
    name: string
    options: Array<SelectOptionType>
    changeExternalState?: (status: string) => void;
}

export const VSelect: React.FC<TVSelect> = ({ name, options, changeExternalState, ...rest }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name)
    const [value, setValue] = useState(defaultValue || '' || [])

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => {
                if (rest.multiple) {
                    return value
                }
                return value ? value : ''
            },
            setValue: (_, newValue) => setValue(newValue)
        })
    }, [registerField, fieldName, value])

    return (
        <FormControl fullWidth error={!!error}>
            <InputLabel id={`${name}-select-helper-label`}>{rest.label}</InputLabel>
            <Select
                {...rest}

                error={!!error}
                defaultValue={defaultValue}

                value={value}
                onChange={e => {
                    setValue(e.target.value)
                    error && clearError()
                    if (changeExternalState) {
                        changeExternalState(e.target.value)
                    }
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} disabled={option?.disabled}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {!!error && (
                <FormHelperText error >{error}</FormHelperText>
            )}
        </FormControl>
    )
}