import {
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps,
} from '@mui/material'

import { useField } from '@unform/core'
import { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

type TVTextFieldPassword = TextFieldProps & {
    name: string
    showPassword: boolean,
    handleClickShowPassword: (newShowPassword: boolean) => void
}

export const VTextFieldPassword: React.FC<TVTextFieldPassword> = ({ name, showPassword, handleClickShowPassword, ...rest }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name)
    const [value, setValue] = useState(defaultValue || '')

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue)
        })
    }, [registerField, fieldName, value])

    return (
        <TextField
            {...rest}

            error={!!error}
            helperText={error}
            defaultValue={defaultValue}

            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword(!showPassword)}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}

            type={showPassword ? 'text' : 'password'}

            value={value}
            onChange={e => { setValue(e.target.value); rest.onChange?.(e) }}

            onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e) }}
        />
    )
}