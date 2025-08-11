"use client";

import * as React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Tabs
            value={theme}
            onValueChange={(value) => setTheme(value)}
            className="w-fit"
        >
            <TabsList className="rounded-full p-1 h-fit">
                <TabsTrigger value="light" className="flex items-center gap-1 rounded-full p-1 h-fit">
                    <Sun className="h-3 w-3" />
                </TabsTrigger>
                <TabsTrigger value="dark" className="flex items-center gap-1 rounded-full p-1 h-fit">
                    <Moon className="h-3 w-3" />
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-1 rounded-full p-1 h-fit">
                    <Monitor className="h-3 w-3" />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
