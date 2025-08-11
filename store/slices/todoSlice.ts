"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
    id: string;
    text: string;
    status: "pending" | "completed";
};

export type TodoState = {
    todos: Todo[];
    filter: "all" | "pending" | "completed";
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
};

const LOCAL_STORAGE_KEY = "todos";

function loadTodos(): Todo[] {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveTodos(todos: Todo[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

const initialState: TodoState = {
    todos: loadTodos(),
    filter: "all",
    searchTerm: "",
    currentPage: 1,
    itemsPerPage: 5,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<{ text: string }>) {
            const newTodo: Todo = {
                id: Date.now().toString(),
                text: action.payload.text,
                status: "pending",
            };
            state.todos.push(newTodo);
            saveTodos(state.todos);
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            saveTodos(state.todos);
        },
        toggleTodoStatus(state, action: PayloadAction<string>) {
            const todo = state.todos.find(t => t.id === action.payload);
            if (todo) {
                todo.status = todo.status === "pending" ? "completed" : "pending";
                saveTodos(state.todos);
            }
        },
        editTodo(state, action: PayloadAction<{ id: string; text: string }>) {
            const todo = state.todos.find(t => t.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
                saveTodos(state.todos);
            }
        },
        setFilter(state, action: PayloadAction<"all" | "pending" | "completed">) {
            state.filter = action.payload;
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setItemsPerPage(state, action: PayloadAction<number>) {
            state.itemsPerPage = action.payload;
        },
        loadFromLocalStorage(state) {
            state.todos = loadTodos();
        },
    },
});

export const {
    addTodo,
    removeTodo,
    toggleTodoStatus,
    editTodo,
    setFilter,
    setSearchTerm,
    setCurrentPage,
    setItemsPerPage,
    loadFromLocalStorage,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;