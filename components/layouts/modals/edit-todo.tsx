"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { CircleCheck, CircleX, Loader2, PencilLine } from "lucide-react";

const MAX_LENGTH = 50;

function capitalizeFirstWord(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

type Todo = {
    id: string | number;
    text: string;
    status?: string;
};

type TodoEditModalProps = {
    open: boolean;
    onClose: () => void;
    todo: Todo | null;
    onSave: (id: string | number, newText: string) => void;
};

export default function TodoEditModal({
    open,
    onClose,
    todo,
    onSave,
}: TodoEditModalProps) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (todo) {
            setText(todo.text);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [todo]);

    if (!todo) return null;

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

    const handleSave = async () => {
        if (text.trim() === "") return;

        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));

        const formattedText = capitalizeFirstWord(text.trim());
        onSave(todo.id, formattedText);
        setLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !loading && text.trim() !== "") {
            e.preventDefault();
            handleSave();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        }
    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                </DialogHeader>
                <Separator />
                <Label htmlFor="todo-input" className="block mb-1 font-medium">
                    Edit your todo
                </Label>
                <Input
                    id="todo-input"
                    ref={inputRef}
                    placeholder="Enter todo..."
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    aria-describedby="char-count"
                    aria-label="Todo text"
                    maxLength={MAX_LENGTH}
                    autoFocus
                    leftIcon={<PencilLine className="text-muted-foreground pointer-events-none"
                        aria-hidden="true"
                        size={16}
                        strokeWidth={1} />}
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
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                        type="button"
                        className="flex items-center gap-1"
                    >
                        <CircleX className="w-4 h-4" />
                        Cancel
                    </Button>

                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                        onClick={handleSave}
                        disabled={loading || text.trim() === ""}
                        type="submit"
                    >
                        {loading ? (
                            <Loader2
                                className="h-4 w-4 animate-spin"
                                aria-hidden="true"
                            />
                        ) : (
                            <CircleCheck className="w-4 h-4" />
                        )}
                        Save
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
