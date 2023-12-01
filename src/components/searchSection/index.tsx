'use client'
import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Search, Refresh } from '@mui/icons-material'

import { EnvironmentValues } from '@/environment'

interface ISearchSectionProps {
    isExternalLoading: boolean,
    setExternalSearchText: (textSearch: string) => void
}

const SearchSection: React.FC<ISearchSectionProps> = ({ isExternalLoading, setExternalSearchText }) => {
    const [inputText, setInputText] = useState<string>('')

    return (
        <Box display='flex' gap={1} justifyContent='center' flexWrap='wrap'>
            <TextField
                disabled={isExternalLoading}
                value={inputText}
                size='small'
                placeholder={EnvironmentValues.SEARCH_INPUT}
                onChange={(e) => setInputText(e.target.value)} />

            <Box display='flex' gap={1}>
                {/* Seta o valor que foi armazenado pelo input e provavelmente altera um state externo vinculado a um useEffect que realizará a pesquisa */}
                <Button
                    sx={{ height: '100%', minWidth: '20px' }}
                    type='submit'
                    variant='contained'
                    disabled={isExternalLoading}
                    onClick={() => setExternalSearchText(inputText)}>
                    <Search />
                </Button>

                {/* Seta uma pesquisa com string vazia, o que resulta no retorno dos dados iniciais antes da pesquisa */}
                <Button
                    sx={{ height: '100%', minWidth: '20px' }}
                    type='submit'
                    variant='outlined'
                    disabled={isExternalLoading}
                    onClick={() => setExternalSearchText('')}>
                    <Refresh />
                </Button>
            </Box>
        </Box>
    )
}

export default SearchSection