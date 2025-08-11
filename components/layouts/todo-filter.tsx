"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterValue = "all" | "pending" | "completed";

type TodoFilterTabsProps = {
    value: FilterValue;
    onChange: (value: FilterValue) => void;
};

export default function TodoFilterTabs({ value, onChange }: TodoFilterTabsProps) {
    function handleChange(val: string) {
        if (val === "all" || val === "pending" || val === "completed") {
            onChange(val);
        }
    }

    return (
        <Tabs value={value} onValueChange={handleChange} className="w-full">
            <TabsList className="w-full md:w-fit">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
