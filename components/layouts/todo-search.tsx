"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Command, Search } from "lucide-react";

type TodoSearchProps = {
    onSearch: (term: string) => void;
};

export default function TodoSearch({ onSearch }: TodoSearchProps) {
    const [term, setTerm] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(term);
        }, 500);
        return () => clearTimeout(handler);
    }, [term, onSearch]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            inputRef.current?.focus();
        }
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <div className="relative w-full z-10">
            <Search
                size={16}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                aria-hidden="true"
            />

            <Input
                ref={inputRef}
                placeholder="Search here"
                aria-label="Search todos"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="bg-primary-foreground pl-8 pr-14"
            />

            <kbd
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-muted text-muted-foreground pointer-events-none inline-flex items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none"
                aria-hidden="true"
            >
                <Command strokeWidth={1.5} size={12} /> K
            </kbd>
        </div>
    );
}
