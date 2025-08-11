"use client";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { CircleX, Trash2 } from "lucide-react";

type Todo = {
    id: string | number;
    text: string;
};

type TodoDeleteDialogProps = {
    todo: Todo | null;
    onConfirm: (id: string | number | null) => void;
};

export default function TodoDeleteDialog({ todo, onConfirm }: TodoDeleteDialogProps) {
    if (!todo) return null;

    return (
        <AlertDialog open={!!todo} onOpenChange={() => { }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Todo?</AlertDialogTitle>
                </AlertDialogHeader>
                <p>Are you sure you want to delete &quot;{todo.text}&quot;?</p>
                <AlertDialogFooter>
                    <Button variant="outline" onClick={() => onConfirm(null)}>
                        <CircleX />
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => onConfirm(todo.id)}>
                        Delete <Trash2 />
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
