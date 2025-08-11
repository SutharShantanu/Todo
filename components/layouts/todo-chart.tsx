"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "../ui/separator"

export type TodoAnalyticsProps = {
    completed: number
    pending: number
}

const chartConfig = {
    completed: {
        label: "Completed",
        color: "var(--chart-1)",
    },
    pending: {
        label: "Pending",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function TodoChart({ completed, pending }: TodoAnalyticsProps) {
    const [activeSlice, setActiveSlice] = React.useState<"completed" | "pending">("completed")

    const pieData = React.useMemo(
        () => [
            { name: "Completed", value: completed, fill: "var(--chart-1)", key: "completed" },
            { name: "Pending", value: pending, fill: "var(--chart-2)", key: "pending" },
        ],
        [completed, pending]
    )

    const total = completed + pending
    const activeIndex = pieData.findIndex((slice) => slice.key === activeSlice)

    const handleSliceClick = (_data: unknown, index: number) => {
        setActiveSlice(pieData[index].key as "completed" | "pending")
    }

    return (
        <Card className="flex flex-col">
            <ChartStyle id="todo-pie-chart" config={chartConfig} />
            <CardHeader className="flex flex-wrap items-center justify-between gap-2 pb-0">
                <div className="text-nowrap">
                    <CardTitle>Todo Status</CardTitle>
                    <CardDescription className="text-xs">Completed vs Pending</CardDescription>
                </div>
                <Select
                    value={activeSlice}
                    onValueChange={(value) => setActiveSlice(value as "completed" | "pending")}
                    aria-label="Select status to highlight"
                >
                    <SelectTrigger className="w-fit rounded-lg pl-2.5">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {Object.entries(chartConfig).map(([key, config]) => (
                            <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                                <div className="flex items-center gap-2 text-xs">
                                    <span
                                        className="flex h-3 w-3 shrink-0 rounded-xs"
                                        style={{ backgroundColor: config.color }}
                                    />
                                    {config.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id="todo-pie-chart"
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[400px]"
                >
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={(props: PieSectorDataItem) => {
                                const { outerRadius = 0 } = props
                                return (
                                    <g>
                                        <Sector {...props} outerRadius={outerRadius + 10} />
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 25}
                                            innerRadius={outerRadius + 12}
                                        />
                                    </g>
                                )
                            }}
                            onClick={handleSliceClick}
                            cursor="pointer"
                            isAnimationActive={true}
                            animationDuration={300}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {total}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Todos
                                                </tspan>
                                            </text>
                                        )
                                    }
                                    return null
                                }}
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="key" />}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
