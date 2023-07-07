import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Todo from "../Pages/Todo";
import Contact from "../Pages/Contact";
import NotFound from "../Components/NotFound";

const AllRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AllRoute;
