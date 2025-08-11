"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Loader2, CircleX, Check, CircleCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTodo } from "@/store/slices/todoSlice";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const MAX_LENGTH = 50;

function capitalizeFirstWord(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function TodoCreateModal() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = e.target.value;

        if (rawValue.length > MAX_LENGTH) {
            rawValue = rawValue.slice(0, MAX_LENGTH);
        }

        if (rawValue.length === 0) {
            setText("");
            return;
        }

        const capitalized = rawValue.charAt(0).toUpperCase() + rawValue.slice(1);
        setText(capitalized);
    };

    const onCreate = async () => {
        if (text.trim() === "") return;

        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));

        const formattedText = capitalizeFirstWord(text.trim());

        dispatch(addTodo({ text: formattedText }));
        setText("");
        setLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !loading && text.trim() !== "") {
            e.preventDefault();
            onCreate();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" className="rounded-full" aria-label="Create todo">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Todo</DialogTitle>
                </DialogHeader>
                <Separator />

                <Label htmlFor="todo-input" className="block mb-1 font-medium">
                    Crate a Todo
                </Label>

                <Input
                    id="todo-input"
                    ref={inputRef}
                    className=""
                    placeholder="Enter todo..."
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    aria-describedby="char-count"
                    aria-label="Todo text"
                    maxLength={MAX_LENGTH}
                    autoFocus
                    leftIcon={<Plus
                        className="text-muted-foreground pointer-events-none"
                        aria-hidden="true"
                        size={16}
                        strokeWidth={1}
                    />}
                />
                <p
                    id="char-count"
                    className="mt-1 text-xs text-muted-foreground select-none"
                    aria-live="polite"
                >
                    {text.length} / {MAX_LENGTH} characters
                </p>
                <DialogFooter className="space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => setText("")}
                        disabled={loading}
                        type="button"
                    >
                        <CircleX />
                        Cancel
                    </Button>
                    <Button
                        onClick={onCreate}
                        disabled={loading || text.trim() === ""}
                        type="submit"
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : <CircleCheck />}
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
