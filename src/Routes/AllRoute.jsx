import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Todo from "../Pages/Todo";
import NotFound from "../Components/NotFound";

const AllRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AllRoute;
