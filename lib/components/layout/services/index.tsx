import { sidebarLinks } from '@/config-nav';
import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar, AppShellSection, Box, Flex, Stack } from '@mantine/core';
import { ReactNode } from 'react';
import ThemeToggle from '../../action/ThemeToggle';
import Logo from '../../identity/Logo';
import SidebarNavigation from '../../navigation/SidebarNavigation/SidebarNavigation';
import MyDrawer from '../drawers/MyDrawer';

type props = {
    children: ReactNode
}
const ServicesLayout = ({ children }: props) => {

    return (
        <AppShell
            header={{ height: 65 }}
            navbar={{
                width: { base: 250, lg: 300, xl: 325 },
                breakpoint: 'md',
                collapsed: { mobile: true },
            }}

            layout='alt'
            withBorder={false}
        >
            <AppShellHeader
                style={{
                    boxShadow: "var(--mantine-shadow-xl)",
                    borderBottomRightRadius: "var(--mantine-radius-lg)",
                    backdropFilter: "blur(5px)",          // <-- blur effect
                    WebkitBackdropFilter: "blur(5px)",    // <-- Safari support
                    backgroundColor: "color-mix(in srgb, var(--color-background-card) 80%, transparent)",

                }}
            >
                <Flex h={"100%"} align="center" justify="space-between" px={15}>
                    <Flex h={"100%"} align="center" justify="center" gap={15}>
                        <Box hiddenFrom='md'>
                            <MyDrawer>
                                <Stack gap={15} px={5}>
                                    <Logo />
                                    <SidebarNavigation
                                        links={sidebarLinks}

                                        navLinkProps={{
                                            style: {
                                                borderRadius: "var(--mantine-radius-sm)",
                                                textTransform: "uppercase",
                                                width: "100%",
                                                fontWeight: 600,
                                            },
                                            variant: "light",
                                        }}
                                    />
                                </Stack>
                            </MyDrawer>
                        </Box>
                        <Logo />
                    </Flex>
                    <Flex h={"100%"} align="center" justify="center" gap={15}>
                        <ThemeToggle />
                    </Flex>
                </Flex>
            </AppShellHeader>
            <AppShellNavbar
                style={{
                    overflow: "scroll",
                    boxShadow: "var(--mantine-shadow-xl)",
                }}
            >
                <AppShellSection p={{ base: 5, sm: 10 }}>
                    <Logo
                    />
                </AppShellSection>
                <AppShellSection grow px={"5%"} h={"100%"}>
                    <SidebarNavigation
                        links={sidebarLinks}

                        navLinkProps={{
                            style: {
                                borderRadius: "var(--mantine-radius-sm)",
                                textTransform: "uppercase",
                                width: "100%",
                                fontWeight: 600,
                            },
                            variant: "light",
                        }}
                    />
                </AppShellSection>
                <AppShellSection py={20} p={{ base: 1, sm: 20 }}>
                    <Flex justify={{ base: "center", sm: "normal" }}>
                        {/* <AuthenticatedDisplay
                            authenticatedElement={
                                <User
                                    size={45}
                                    breakpoint="sm"
                                    fz="xs"
                                />
                            }

                        /> */}
                    </Flex>
                </AppShellSection>
            </AppShellNavbar>
            <AppShellMain >
                {children}
            </AppShellMain>
        </AppShell >
    )
}

export default ServicesLayout