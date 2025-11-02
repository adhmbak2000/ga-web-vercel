import { sidebarLinks } from '@/config-nav';
import { breakpoints } from '@/constants';
import { AppShell, AppShellAside, AppShellHeader, AppShellMain, AppShellNavbar, AppShellSection, Flex, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { BsTwitterX } from 'react-icons/bs';
import ThemeSelector from '../../action/ThemeSelector';
import SidebarNavigation from '../../navigation/SidebarNavigation/SidebarNavigation';

type props = {
    children: ReactNode
}
const XLayout = ({ children }: props) => {

    return (
        <AppShell
            header={{ height: 0 }}
            navbar={{
                width: { base: 50, sm: 225, xl: 400 },
                breakpoint: 'null',
            }}
            aside={{
                width: { base: 0, lg: 225, xl: 400 },
                breakpoint: 'xl',
                collapsed: { mobile: true },
            }}
            layout='alt'
            withBorder={true}
            styles={{
                header: { backgroundColor: "var(--color-background-primary)" },
                navbar: { backgroundColor: "var(--color-background-primary)" },
                footer: { backgroundColor: "var(--color-background-primary)" },
                aside: { backgroundColor: "var(--color-background-primary)" },
                main: { backgroundColor: "var(--color-background-primary)" },
            }}
        >
            <AppShellHeader display="none"></AppShellHeader>
            <AppShellNavbar ps={{ base: 0, xl: 150 }} style={{ overflow: "scroll" }}>
                <AppShellSection p={{ base: 5, sm: 10 }}>
                    <Text
                        component="h1"
                        fz={{ base: "h2", sm: "h1" }}
                        fw="bolder"
                    >
                        <BsTwitterX />
                    </Text>
                </AppShellSection>
                <AppShellSection grow px={"5%"} h={"100%"}>
                    <SidebarNavigation
                        links={sidebarLinks}

                        navLinkProps={{
                            style: {
                                borderRadius: " calc(infinity * 1px)",
                                textTransform: "uppercase",
                                width: "100%",
                                fontWeight: 600,
                                '@media (max-width: 640px)': {
                                    width: "fit-content",
                                    borderRadius: " calc(infinity * 1px)",
                                }
                            },
                            variant: "light",
                        }}
                        isIconOnlyProp={breakpoints.down.sm}
                    />
                    {/*   <SigninSwapAction
                        action={
                            <Center>
                                <Button fullWidth variant="filled" radius="lg" visibleFrom="sm">
                                    Post
                                </Button>
                                <ActionIcon variant="filled" radius="md" hiddenFrom="sm">
                                    <GiFeather /> +
                                </ActionIcon>
                            </Center>
                        }
                    /> */}
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
            <AppShellAside ps={20} py={20} pe={{ base: 0, xl: 150 }}>
                <AppShellSection>
                    <ThemeSelector />
                </AppShellSection>
            </AppShellAside >
            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell >
    )
}

export default XLayout