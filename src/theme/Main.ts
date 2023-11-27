import { createTheme } from '@mui/material'

export const MainTheme = createTheme({
    palette: {
        primary: {
            main: '#3d3d3d',
            dark: '#000000',
            light: '#545454',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#14809E',
            dark: '#2C4953',
            light: '#33B8DD',
            contrastText: '#ffffff',
        },
        background: {
            default: '#ffffff',
            paper: '#F2F7F8'
        }
    },
    typography: {
        button: {
            fontWeight: 700,
        }
    }
})

