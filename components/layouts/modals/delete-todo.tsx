"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { CircleX, Trash2, Loader2 } from "lucide-react";

type Todo = {
    id: string | number;
    text: string;
};

type TodoDeleteDialogProps = {
    todo: Todo | null;
    onConfirm: (id: string | number | null) => void;
};

export default function TodoDeleteDialog({ todo, onConfirm }: TodoDeleteDialogProps) {
    const [loading, setLoading] = useState(false);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (todo) {
            setLoading(false);
            setTimeout(() => cancelBtnRef.current?.focus(), 100);
        }
    }, [todo]);


    const handleDelete = async () => {
        if (!todo) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 500));
        onConfirm(todo.id);
        setLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !loading) {
            e.preventDefault();
            handleDelete();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            onConfirm(null);
        }
    };

    return (
        <AlertDialog
            open={!!todo}
            onOpenChange={(open) => {
                if (!open) onConfirm(null);
            }}
        >
            <AlertDialogContent
                onKeyDown={handleKeyDown}
                role="alertdialog"
                aria-labelledby="delete-todo-title"
                aria-describedby="delete-todo-desc"
            >
                <AlertDialogHeader>
                    <AlertDialogTitle id="delete-todo-title">Delete Todo?</AlertDialogTitle>
                    <VisuallyHidden>
                        <AlertDialogTitle>Delete Todo</AlertDialogTitle>
                    </VisuallyHidden>
                </AlertDialogHeader>
                <p id="delete-todo-desc">
                    Are you sure you want to delete &quot;{todo ? todo.text : ""}&quot;?
                </p>
                <AlertDialogFooter className="flex flex-row justify-end items-center gap-1">
                    <Button
                        ref={cancelBtnRef}
                        variant="secondary"
                        onClick={() => onConfirm(null)}
                        disabled={loading}
                        className="flex items-center gap-1"
                    >
                        <CircleX className="w-4 h-4" />
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center gap-1"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}