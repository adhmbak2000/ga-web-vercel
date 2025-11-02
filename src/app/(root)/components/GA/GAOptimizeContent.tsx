"use client";

import { GAData } from "@/app/server/api/generate/route";
import { Card, Loader, Stack, Text, useComputedColorScheme } from "@mantine/core";
import dynamic from "next/dynamic";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import useBoolean from "../../../../../lib/hooks/useBoolean";
import BestFitness from "./BestFitness";
import GensStats from "./GensStats";

type Props = {
    data: GAData[];
};

export interface GenerationsStats {
    avg: number;
    std: number;
    min: number;
    max: number;
}



// Dynamically import ApexCharts (for Next.js SSR compatibility)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GAOptimizeContent = ({ data }: Props) => {
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const isLoading = useBoolean({ initialState: true });
    const [bestGenes, setBestGenes] = useState<number[] | null>(null);
    const [bestFitness, setBestFitness] = useState<number | null>(null);
    const [generationsStats, setGenerationsStats] = useState<GenerationsStats[]>([]);

    const handleGAOptimize = async () => {
        isLoading.onTrue();
        try {
            const csv = Papa.unparse(data);
            const res = await fetch("/server/api/ga", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ csvData: csv }),
            });
            const result = await res.json();

            if (result.error) {
                console.error("GA Error:", result.error);
                return;
            }

            setBestGenes(result.bestGenes);
            setBestFitness(result.bestFitness);
            setGenerationsStats(result.generationsStats)
        } catch (err) {
            console.error("Request failed:", err);
        } finally {
            isLoading.onFalse();
        }
    };

    useEffect(() => {
        handleGAOptimize();
    }, []);
    
    if (isLoading.value) {
        return (
            <Stack
                justify="center"
                align="center"
                h={"75vh"}
            >
                <Text
                    variant='gradient'
                    gradient={{
                        from: "var(--mantine-color-green-4)",
                        to: "var(--mantine-primary-color-5)"
                    }}
                    fz="h1"
                    component='h1'
                    fw={900}
                >
                    OPTIMIZING PLEASE BE PATIENT
                </Text>
                <Text
                    variant='gradient'
                    gradient={{
                        from: "var(--mantine-primary-color-5)",
                        to: "var(--mantine-color-green-5)"
                    }}
                    fz="h2"
                    component='h2'
                    fw={700}
                >
                    it may take several minutes depends on the data set size
                </Text>
                <Loader type="dots" size={150} />
            </Stack>
        )
    }
    return (
        <Stack>
            {bestFitness !== null && bestGenes && (
                <>
                    <BestFitness
                        bestFitness={bestFitness}
                    />
                    <GensStats
                        gens={generationsStats}
                    />
                    <Card
                        shadow="lg"
                        radius="lg"
                        w={"100%"}
                    >

                        <Chart
                            type="radar"
                            // width={500}
                            height={400}
                            series={[
                                {
                                    name: "Best Feature ",
                                    data: bestGenes,
                                },
                            ]}
                            options={{
                                theme: {
                                    mode: computedColorScheme
                                },
                                chart: {
                                    id: "best-Chromosome-radar",
                                    background: "transparent"
                                },
                                title: { text: "Best Chromosome Radar Chart", align: "center" },
                                xaxis: { categories: bestGenes.map((_, i) => `F${i + 1}`) },
                                yaxis: { min: 0, max: 1 },
                                markers: { size: 4 },
                                tooltip: { enabled: true },
                            }}
                        />
                    </Card>
                    {/* Line Chart */}
                    <Card
                        shadow="lg"
                        radius="lg"
                        w={"100%"}

                    >

                        <Chart
                            type="area"
                            height={300}
                            series={[
                                {
                                    name: "Feature Value",
                                    data: bestGenes,
                                },
                            ]}
                            options={{
                                theme: {
                                    mode: computedColorScheme
                                },
                                chart: {
                                    id: "best-Chromosome-line",
                                    zoom: { enabled: false },
                                    background: "transparent"
                                },
                                xaxis: {
                                    categories: bestGenes.map((_, i) => `F${i + 1}`),
                                    title: { text: "Feature Index" },
                                },
                                yaxis: { min: 0, max: 1, title: { text: "Feature Value" } },
                                title: { text: "Best Chromosome Line Chart", align: "center" },
                                markers: { size: 4 },
                                tooltip: { enabled: true },

                            }}
                        />
                    </Card>
                </>
            )}
        </Stack>
    );
};

export default GAOptimizeContent;
