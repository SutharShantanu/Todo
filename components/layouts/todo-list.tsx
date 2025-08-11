"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SortTodo from "@/components/layouts/sort-todo";
import TodoDeleteDialog from "./modals/delete-todo";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";

import { CircleCheck, PencilLine, Timer, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { editTodo, removeTodo, toggleTodoStatus, } from "@/store/slices/todoSlice";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import TodoEditModal from "./modals/edit-todo";

type Todo = {
    id: string | number;
    text: string;
    status: "completed" | "pending" | string;
};

type TodoListProps = {
    todos: Todo[];
};

const rowVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function TodoList({ todos }: TodoListProps) {
    const dispatch = useDispatch();

    const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

    useEffect(() => {
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, [todos]);

    const handleDeleteConfirm = (id: string | number | null) => {
        if (id) {
            dispatch(removeTodo(String(id)));
        }
        setTodoToDelete(null);
    };

    function handleEditClick(todo: Todo) {
        setTodoToEdit(todo);
        setIsEditModalOpen(true);
    }

    function handleEditSave(id: string | number, newText: string) {
        dispatch(editTodo({ id: String(id), text: newText }));
        setIsEditModalOpen(false);
        setTodoToEdit(null);
    }

    function handleEditClose() {
        setIsEditModalOpen(false);
        setTodoToEdit(null);
    }


    const columns: ColumnDef<Todo>[] = [
        {
            accessorFn: (row) => row.id,
            id: "serialNumber",
            header: () => "Sr. No.",
            cell: ({ row, table }) =>
                row.index + 1 + table.getState().pagination.pageIndex * table.getState().pagination.pageSize,
            enableSorting: false,
        },
        {
            accessorKey: "text",
            header: "Task",
            cell: ({ row }) => <span>{row.original.text}</span>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <FormattedStatus status={row.original.status} />,
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={row.original.status === "completed"}
                                onClick={() => {
                                    if (row.original.status !== "completed") {
                                        dispatch(toggleTodoStatus(String(row.original.id)));
                                    }
                                }}
                            >
                                <CircleCheck />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Mark as completed</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Edit Button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleEditClick(row.original)}
                            >
                                <PencilLine />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit todo</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="destructive" size="sm" onClick={() => setTodoToDelete(row.original)}>
                                <Trash />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete todo</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            ),
        }

    ];

    function FormattedStatus({ status }: { status: string }) {
        const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

        const statusColorClass =
            status === "completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : status === "pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";

        return (
            <Badge className={`select-none ${statusColorClass} flex items-center gap-1`}>
                {status === "pending" ? <Timer className="w-4 h-4" /> : <CircleCheck className="w-4 h-4" />}
                {formattedStatus}
            </Badge>
        );
    }

    const table = useReactTable({
        data: todos,
        columns,
        state: { sorting, pagination },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <motion.div
            key={`${sorting.length}-${pagination.pageIndex}-${pagination.pageSize}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInOut}
        >
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>My Todo List</CardTitle>
                    <SortTodo sorting={sorting} setSorting={setSorting} />
                </CardHeader>
                <Separator />
                <CardContent>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="bg-primary-foreground">
                                    {headerGroup.headers.map((header, index) => {
                                        const isFirst = index === 0;
                                        const isLast = index === headerGroup.headers.length - 1;

                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={`${isFirst ? "rounded-tl-xl" : ""} ${isLast ? "rounded-tr-xl" : ""}`}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence>
                                {table.getRowModel().rows.length > 0 ? (
                                    table.getRowModel().rows.map((row) => (
                                        <motion.tr
                                            key={row.id}
                                            layout
                                            variants={rowVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.25 }}
                                            className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </motion.tr>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="text-center py-6 text-muted-foreground">
                                            No todos found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-between items-center">
                    <motion.div
                        key={pagination.pageSize}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-sm">Rows per page:</span>
                        <Select
                            value={String(table.getState().pagination.pageSize)}
                            onValueChange={(value) => table.setPageSize(Number(value))}
                        >
                            <SelectTrigger className="w-fit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 20, 50].map((size) => (
                                    <SelectItem key={size} value={String(size)}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </motion.div>

                    <motion.div
                        key={pagination.pageIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4"
                    >
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            table.previousPage();
                                        }}
                                        className={table.getCanPreviousPage() ? "" : "pointer-events-none opacity-50"}
                                    />
                                </PaginationItem>
                                {Array.from({ length: table.getPageCount() }).map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            href="#"
                                            isActive={table.getState().pagination.pageIndex === i}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                table.setPageIndex(i);
                                            }}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {table.getPageCount() > 3 &&
                                    table.getState().pagination.pageIndex < table.getPageCount() - 2 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            table.nextPage();
                                        }}
                                        className={table.getCanNextPage() ? "" : "pointer-events-none opacity-50"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </motion.div>
                </CardFooter>
            </Card>
            <TodoEditModal
                open={isEditModalOpen}
                onClose={handleEditClose}
                todo={todoToEdit}
                onSave={handleEditSave}
            />
            <TodoDeleteDialog todo={todoToDelete} onConfirm={handleDeleteConfirm} />
        </motion.div>
    );
}
