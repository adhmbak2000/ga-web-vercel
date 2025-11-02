"use client";
import { GAData } from "@/app/server/api/generate/route";
import { Button, Card, CardSection, Center, FileInput, Flex, Group, Loader, NumberInput, Pagination, Popover, Select, Table, Text } from "@mantine/core";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import useBoolean from "../../../../lib/hooks/useBoolean";
import GAOptimizeDrawer from "./GAOptimizeDrawer";


const GeneticsAlgo = () => {
    const [pageSize, setPageSize] = useState(50);
    const [page, setPage] = useState(1);
    const [data, setData] = useState<GAData[]>([]);
    const [loading, setLoading] = useState(false);

    const isOptimized = useBoolean({ initialState: false });

    const [randomRowsCount, setRandomRowsCount] = useState(100);
    const [randomColsCount, setRandomColsCount] = useState(15);

    // ✅ Load default CSV on mount
    useEffect(() => {
        async function loadDefaultCSV() {
            const response = await fetch("/data/data.csv");
            const text = await response.text();
            const results = Papa.parse<GAData>(text, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            });
            setData(results.data);
        }

        loadDefaultCSV();
    }, []);

    // ✅ Generate data in background
    const handleGenerate = async (rows: number, cols: number) => {
        setLoading(true);
        try {
            const res = await fetch("/server/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rows, cols }),
            });
            const generated: GAData[] = await res.json();
            setData(generated);
            setPage(1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    // Inside GeneticsAlgo component, before return:

    // ✅ Handle CSV file upload
    const handleCSVUpload = (file: File | null) => {
        if (!file) return;
        setLoading(true);
        Papa.parse<GAData>(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
                setData(results.data);
                setPage(1);
                setLoading(false);
            },
            error: () => setLoading(false),
        });
    };

    const handleExportCSV = (data: GAData[]) => {
        if (!data.length) return;

        // Convert array of objects to CSV
        const csv = Papa.unparse(data);

        // Create a Blob and a download link
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    console.log(data);
    

    // ✅ Pagination logic
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageData = data.slice(start, end);
    const totalPages = Math.ceil(data.length / pageSize);
    const headers = data.length ? Object.keys(data[0]) : [];

    return (
        <>

            <Card radius="lg" shadow="md" p="lg">
                <Flex justify="space-around" align="center" gap={25} wrap="wrap" mb="md">
                    <Popover withArrow width={"fit-content"}>
                        <Popover.Target>
                            <Button color="gray">Generate Random CSV</Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Flex gap={10} wrap="wrap">
                                <NumberInput
                                    label="Rows"
                                    labelProps={{ fz: "xs" }}
                                    size="xs"
                                    min={1}
                                    max={10000}
                                    value={randomRowsCount}
                                    onChange={(v) => setRandomRowsCount(Number(v) || 0)}
                                />
                                <NumberInput
                                    label="Columns"
                                    labelProps={{ fz: "xs" }}
                                    size="xs"
                                    min={1}
                                    max={10}
                                    value={randomColsCount}
                                    onChange={(v) => setRandomColsCount(Number(v) || 0)}
                                />
                            </Flex>
                            <Button
                                color="green"
                                fullWidth
                                size="xs"
                                mt={10}
                                onClick={() => handleGenerate(randomRowsCount, randomColsCount)}
                            >
                                Confirm
                            </Button>
                        </Popover.Dropdown>
                    </Popover>

                    <Button color="red" variant="light" onClick={() => setData([])}>
                        Delete Data
                    </Button>

                    <Button
                        variant="filled"
                        onClick={isOptimized.onTrue}
                    >
                        GA Optimize
                    </Button>
                </Flex>
                <Flex justify="space-around" align="center" gap={25} wrap="wrap" mb="md">
                    <Button
                        color="blue"
                        variant="light"
                        onClick={() => handleExportCSV(data)}
                        disabled={data.length === 0}
                    >
                        Export CSV
                    </Button>
                    <FileInput
                        placeholder="Upload CSV file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                    />
                </Flex>
                <CardSection>
                    {loading ? (
                        <Center h="55dvh">
                            <Loader size="lg" type="bars" />
                        </Center>
                    ) : data.length === 0 ? (
                        <Center h="55dvh">
                            <Text>No data loaded.</Text>
                            <FileInput
                                placeholder="Upload CSV file"
                                accept=".csv"
                                onChange={handleCSVUpload}
                                withAsterisk
                                label="Select a CSV file"
                            />
                        </Center>
                    ) : (
                        <Table.ScrollContainer minWidth="100%" h="47dvh">
                            <Table striped highlightOnHover withColumnBorders >
                                <Table.Thead>
                                    <Table.Tr>
                                        {headers.map((header) => (
                                            <Table.Th key={header}>{header}</Table.Th>
                                        ))}
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {pageData.map((row, i) => (
                                        <Table.Tr key={i}>
                                            {headers.map((header) => (
                                                <Table.Td key={header}>{row[header]?.toString()}</Table.Td>
                                            ))}
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Table.ScrollContainer>
                    )}
                </CardSection>

                <Flex gap={15} wrap="wrap" align="center" mt={10}>
                    <Group>
                        <Text fw={600} fz="xs">{`Total Pages : ${totalPages}`}</Text>
                        <Text fw={600} fz="xs">{`Items : ${data.length * headers.length}`}</Text>
                    </Group>
                    {totalPages > 1 && (
                        <Flex justify="center" style={{ flexGrow: 1 }}>
                            <Pagination
                                total={totalPages}
                                value={page}
                                onChange={setPage}
                                siblings={1}
                                boundaries={1}
                            />
                        </Flex>
                    )}
                    <Select
                        w="fit-content"
                        data={[
                            { label: "10", value: "10" },
                            { label: "25", value: "25" },
                            { label: "50", value: "50" },
                            { label: "100", value: "100" },
                        ]}
                        value={pageSize.toString()}
                        onChange={(v) => setPageSize(Number(v || "10"))}
                    />
                </Flex>
            </Card>
            <GAOptimizeDrawer
                open={isOptimized}
                data={data}
            />
        </>
    );
};

export default GeneticsAlgo;
