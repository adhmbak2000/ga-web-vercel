import { ReactNode } from 'react'
import AppMantineProvider from './mantine/AppMantineProvider'

type Props = {
    children: ReactNode
}

const AppProvider = ({ children }: Props) => {
    return (
        <>
            <AppMantineProvider>
                {children}
            </AppMantineProvider>
        </>
    )
}

export default AppProvider