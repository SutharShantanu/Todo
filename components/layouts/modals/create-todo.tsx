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
import { Plus, Loader2, CircleX, CircleCheck } from "lucide-react";
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
    const [open, setOpen] = useState(false); // control dialog
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = e.target.value;

        if (rawValue.length > MAX_LENGTH) {
            rawValue = rawValue.slice(0, MAX_LENGTH);
        }

        setText(rawValue.charAt(0).toUpperCase() + rawValue.slice(1));
    };

    const onCreate = async () => {
        if (text.trim() === "") return;

        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));

        const formattedText = capitalizeFirstWord(text.trim());
        dispatch(addTodo({ text: formattedText }));

        setText("");
        setLoading(false);
        setOpen(false);
    };

    const handleCancel = () => {
        setText("");
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !loading && text.trim() !== "") {
            e.preventDefault();
            onCreate();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            handleCancel();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full"
                    aria-label="Create todo"
                >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                </Button>
            </DialogTrigger>

            <DialogContent
                aria-label="Add a new todo"
                aria-describedby="todo-dialog-description"
                onOpenAutoFocus={() => inputRef.current?.focus()}
            >
                <DialogHeader>
                    <DialogTitle>Add Todo</DialogTitle>
                </DialogHeader>
                <Separator />

                <Label htmlFor="todo-input" className="block mb-1 font-medium">
                    Create a Todo
                </Label>

                <Input
                    id="todo-input"
                    ref={inputRef}
                    placeholder="Enter todo..."
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    aria-describedby="char-count"
                    aria-label="Todo text input"
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

                <DialogFooter className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={loading}
                        type="button"
                    >
                        <CircleX aria-hidden="true" />
                        Cancel
                    </Button>
                    <Button
                        className="flex items-center gap-1"
                        onClick={onCreate}
                        disabled={loading || text.trim() === ""}
                        type="submit"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : <CircleCheck aria-hidden="true" />}
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
