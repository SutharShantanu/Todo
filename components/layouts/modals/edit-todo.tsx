"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
        }
    }, [todo]);

    useLayoutEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    if (!todo) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.slice(0, MAX_LENGTH);
        if (!rawValue) {
            setText("");
            return;
        }
        setText(rawValue.charAt(0).toUpperCase() + rawValue.slice(1));
    };

    const handleSave = async () => {
        if (!text.trim()) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        onSave(todo.id, capitalizeFirstWord(text.trim()));
        setLoading(false);
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !loading && text.trim()) {
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
            <DialogContent
                aria-labelledby="edit-todo-title"
                aria-describedby="edit-todo-desc"
            >
                <DialogHeader>
                    <DialogTitle id="edit-todo-title">Edit Todo</DialogTitle>
                    <VisuallyHidden>
                        <DialogTitle>Edit Todo</DialogTitle>
                    </VisuallyHidden>
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
                    leftIcon={
                        <PencilLine
                            className="text-muted-foreground pointer-events-none"
                            aria-hidden="true"
                            size={16}
                            strokeWidth={1}
                        />
                    }
                />
                <p
                    id="char-count"
                    className="text-xs text-muted-foreground select-none"
                    aria-live="polite"
                >
                    {text.length} / {MAX_LENGTH} characters
                </p>
                <DialogFooter className="flex flex-row justify-end items-center gap-1">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                        type="button"
                        className="flex items-center gap-1 w-fit"
                    >
                        <CircleX className="w-4 h-4" />
                        Cancel
                    </Button>

                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1 w-fit"
                        onClick={handleSave}
                        disabled={loading || !text.trim()}
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
