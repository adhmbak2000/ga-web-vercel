import { Card, List, ListItem, Stack, Text } from "@mantine/core"


const HomeHeader = () => {
    return (
        <Card component="header" shadow="md" radius="lg">
            <Stack component="article">
                <Text
                    fw={700}
                    fz="h4"
                >
                    Developed By
                </Text>
                <List>
                    <ListItem>
                        Mohammed_117722
                    </ListItem>
                </List>
            </Stack>
        </Card>
    )
}

export default HomeHeader