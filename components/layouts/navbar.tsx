"use client";

import * as React from "react";
import Image from "next/image";
import DarkLogo from "@/public/Dark.png";
import LightLogo from "@/public/Light.png";
import { ThemeSwitcher } from "../theme-switcher";
import { useTheme } from "next-themes";

export default function Navbar() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <header className="w-[95%] max-w-7xl mx-auto border px-4 shadow-xs bg-transparent backdrop-blur-sm fixed left-0 right-0 top-2 rounded-2xl z-50">
            <div className="flex h-16 items-center gap-8 justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={currentTheme === "light" ? LightLogo : DarkLogo}
                        alt="TODO Logo"
                        width={40}
                        height={40}
                        className="h-8 w-8"
                    />
                </div>

                <h1
                    className="text-lg font-bold md:text-4xl font-title"
                    aria-label="TODO Application Title"
                >
                    TODO
                </h1>

                <ThemeSwitcher />
            </div>
        </header>
    );
}
