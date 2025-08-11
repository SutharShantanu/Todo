"use client";
import dynamic from "next/dynamic";
const TodoList = dynamic(() => import("@/components/layouts/todo-list"), { ssr: false });

import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setFilter,
} from "@/store/slices/todoSlice";
import { motion } from "framer-motion"
import TodoFilter from "@/components/layouts/todo-filter";
import TodoSearch from "@/components/layouts/todo-search";

import { RootState } from "@/store/store";
import TodoCreateModal from "@/components/layouts/modals/create-todo";
import { TodoChart } from "@/components/layouts/todo-chart";
import { useMemo } from "react";


export default function Home() {

  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todo.todos);
  const filter = useSelector((state: RootState) => state.todo.filter);
  const searchTerm = useSelector((state: RootState) => state.todo.searchTerm);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => filter === "all" || todo.status === filter)
      .filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [todos, filter, searchTerm]);

  const completedCount = useMemo(() => todos.filter(t => t.status === "completed").length, [todos]);
  const pendingCount = useMemo(() => todos.filter(t => t.status === "pending").length, [todos]);

  return (
    <div className="flex justify-center items-center w-full max-w-7xl min-h-[calc(100vh-60px)] m-auto px-2 pt-[90px] pb-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col lg:flex-row gap-4 md:gap-2 justify-between m-auto w-full rounded-2xl"
      >
        <motion.div className="flex flex-col w-full lg:w-3/5 gap-4 md:gap-2">
          <motion.div className="flex flex-col md:flex-row gap-4 md:gap-2 items-center">
            <TodoSearch onSearch={(term) => dispatch(setSearchTerm(term))} />
            <motion.div className="flex gap-4 md:gap-2 items-center w-full md:w-fit justify-between">
              <TodoFilter value={filter} onChange={(value) => dispatch(setFilter(value))} />
              <TodoCreateModal />
            </motion.div>
          </motion.div>
          <motion.div className="flex flex-col gap-4 md:gap-2">
            <TodoList todos={filteredTodos} />
          </motion.div>
        </motion.div>
        <motion.div className="w-full lg:w-2/5 mx-auto">
          <TodoChart completed={completedCount} pending={pendingCount} />
        </motion.div>
      </motion.div>
    </div>
  );
}