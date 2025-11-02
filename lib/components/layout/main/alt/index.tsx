import { sidebarLinks } from '@/config-nav';
import { AppShell, AppShellHeader, AppShellMain, Flex } from '@mantine/core';
import { ReactNode } from 'react';
import ThemeToggle from '../../../action/ThemeToggle';
import Logo from '../../../identity/Logo';
import AppNavigation from '../../../navigation/AppNavigation/AppNavigation';

type props = {
    children: ReactNode
}
const AltMainLayout = ({ children }: props) => {

    return (
        <AppShell
            header={{ height: 65 }}
            layout='alt'
            padding={0}
            withBorder={true}
        >
            <AppShellHeader
                style={{
                    boxShadow: "var(--mantine-shadow-xl)",
                    borderRadius: "var(--mantine-radius-lg)",
                    backdropFilter: "blur(5px)",          // <-- blur effect
                    WebkitBackdropFilter: "blur(5px)",    // <-- Safari support
                    backgroundColor: "color-mix(in srgb, var(--color-background-card) 80%, transparent)",

                }}
                mx={10}
                my={5}
            >
                <Flex justify="space-between" align="center" h="100%" px="lg">
                    <Logo />
                    <AppNavigation
                        links={sidebarLinks}
                        navLinkProps={{
                            styles: {
                                root: {
                                    transition: 'background-color 150ms ease',
                                    '&:hover': {
                                        backgroundColor: '#e6e6ff !important',
                                    },
                                    '&[data-hovered]': {
                                        backgroundColor: '#e6e6ff',
                                    },
                                },
                            }


                        }}
                    />
                    <ThemeToggle />
                </Flex>
            </AppShellHeader>
            <AppShellMain mt={5}>
                {children}
            </AppShellMain>
        </AppShell >
    )
}

export default AltMainLayout