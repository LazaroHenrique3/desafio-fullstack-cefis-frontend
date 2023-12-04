import { Box, Typography } from '@mui/material'

interface IBasePageLayoutProps {
    children: React.ReactNode,
    title: string,
    linkButton?: React.ReactNode | undefined,
}

export const BasePageLayout = ({ children, title, linkButton }: IBasePageLayoutProps) => {

    return (
        <Box height='100%' padding={5}>
            <Box display='flex' flexDirection='column' gap={2} marginBottom={2}>
                {/* Texto principal da tela */}
                <Typography variant='h3' marginBottom={3}>
                    {title}
                </Typography>

                {/* Link Button que pode ser passado opcionalmente via prop */}
                {linkButton && (
                    <Box>
                        {linkButton}
                    </Box>
                )}
            </Box>

            {children}
        </Box>
    )
}


