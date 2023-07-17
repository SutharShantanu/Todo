import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "../Pages/Todo";
import NotFound from "../Components/NotFound";

const AllRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AllRoute;
