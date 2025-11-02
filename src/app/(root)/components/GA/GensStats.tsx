import { Card, Flex, Grid, GridCol, Pagination, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { BiStats } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { MdBarChart } from "react-icons/md";
import InfoIcon from "../../../../../lib/components/view/InfoIcon";
import { GenerationsStats } from "./GAOptimizeContent";

type Props = {
    gens: GenerationsStats[]
}

export function splitArrayIntoChunks(array: Array<unknown>, chunkSize: number) {
    const result = [];
    if (array && array.length) {

        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }
    }
    return result;
}

const GensStats = ({ gens }: Props) => {
    const data = splitArrayIntoChunks(gens, 3) as Array<GenerationsStats[]>;
    const [page, setPage] = useState(1);

    return (
        <Stack>
            <Text
                variant='gradient'
                gradient={{
                    from: "var(--mantine-color-green-4)",
                    to: "var(--mantine-primary-color-5)"
                }}
                ms={20}
                fz="h3"
                component='h1'
                fw={900}
            >
                Generations Stats
            </Text>
            <Grid>
                {
                    data[page - 1].map((generationsStats, index) => {

                        return (
                            <GridCol
                                span={{ base: 12, sm: 6, lg: 4 }}
                                key={(index + 1) + (3 * (page - 1))}
                            >
                                <Card
                                    shadow="lg"
                                    radius="lg"
                                >
                                    <Stack>
                                        <Text
                                            c="indigo"
                                            fz="h5"
                                            component='h1'
                                            fw={900}
                                        >
                                            {`Generation ${(index + 1) + (3 * (page - 1))}`}
                                        </Text>
                                        <InfoIcon
                                            icon={<AiOutlineLineChart />}
                                            // row
                                            withDivider
                                            color="green"
                                            label="Generation AVG"
                                        >
                                            {generationsStats.avg}
                                        </InfoIcon>
                                        <InfoIcon
                                            icon={<MdBarChart />}
                                            // row
                                            withDivider
                                            color="indigo"
                                            label="Generation STD"
                                        >
                                            {generationsStats.std}
                                        </InfoIcon>
                                        <InfoIcon
                                            icon={<FiTrendingUp />}
                                            // row
                                            withDivider
                                            color="red"
                                            label="Generation MIN"
                                        >
                                            {generationsStats.min}
                                        </InfoIcon>
                                        <InfoIcon
                                            icon={<BiStats />}
                                            // row
                                            withDivider
                                            color="blue"
                                            label="Generation MAX"
                                        >
                                            {generationsStats.max}
                                        </InfoIcon>
                                    </Stack>
                                </Card>
                            </GridCol>
                        )
                    })
                }
            </Grid>
            <Flex justify="center" style={{ flexGrow: 1 }}>
                <Pagination
                    total={data.length}
                    value={page}
                    onChange={setPage}
                    siblings={1}
                    boundaries={1}
                />
            </Flex>
        </Stack>
    )
}

export default GensStats