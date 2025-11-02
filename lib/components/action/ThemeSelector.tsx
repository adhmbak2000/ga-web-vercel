"use client"
import { Button, Menu, MenuDropdown, MenuItem, MenuLabel, MenuTarget, useMantineColorScheme } from "@mantine/core";
import { FaCloudMoon, FaCloudSun } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";

const ThemeMods = {
    auto: {
        icon: <GrSystem />,
        color: "var(--mantine-primary-color-5)",
        label: "System Preference",
        shotLabel: "Auto",
    },
    dark: {
        icon: <FaCloudMoon />,
        color: "indigo",
        label: "Dark Mode",
        shotLabel: "Dark",
    },
    light: {
        icon: <FaCloudSun />,
        color: "orange",
        label: "Light Mode",
        shotLabel: "light",
    }
}
const ThemeSelector = () => {
    const { setColorScheme, colorScheme } = useMantineColorScheme();

    return (
        <Menu position="bottom">
            <MenuTarget>
                <Button
                    variant="light"
                    style={{
                        textTransform: "capitalize"
                    }}
                    color={ThemeMods[colorScheme].color}
                    leftSection={ThemeMods[colorScheme].icon}
                    radius="md"
                >
                    {ThemeMods[colorScheme].shotLabel}
                </Button>
            </MenuTarget>
            <MenuDropdown >
                <MenuLabel>Select theme mode</MenuLabel>
                <MenuItem
                    leftSection={<FaCloudSun />}
                    color="orange"
                    onClick={() => setColorScheme("light")}
                >
                    Light Mode
                </MenuItem>
                <MenuItem
                    leftSection={<FaCloudMoon />}
                    color="indigo"
                    onClick={() => setColorScheme("dark")}
                >
                    Dark Mode
                </MenuItem>
                <MenuItem
                    leftSection={<GrSystem />}
                    color="var(--mantine-primary-color-5)"
                    onClick={() => setColorScheme("auto")}
                >
                    System Preference
                </MenuItem>
            </MenuDropdown>
        </Menu>
    )
}

export default ThemeSelector