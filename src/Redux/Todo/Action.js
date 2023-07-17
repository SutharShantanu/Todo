import {
    ADD_TODO,
    DELETE_TODO,
    GET_TODO,
    UPDATE_TODO,
    UPDATE_TODO_STATUS,
} from "./ActionTypes";

export const getTodo = () => async (dispatch) => {
    try {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        dispatch({ type: GET_TODO, payload: storedTodos });
    } catch (error) {
        console.log(error.message);
    }
};

export const addTodo = (data) => async (dispatch) => {
    try {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const updatedTodos = [...storedTodos, data];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        dispatch({ type: ADD_TODO });
        dispatch(getTodo());
    } catch (error) {
        console.log(error.message);
    }
};

export const updateTodos = (data, id) => async (dispatch) => {
    try {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const updatedTodos = storedTodos.map((ele) =>
            ele.id === id ? { ...ele, title: data } : ele
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        dispatch({ type: UPDATE_TODO });
        dispatch(getTodo());
    } catch (error) {
        console.log(error.message);
    }
};
export const updateTodosStatus = (id) => async (dispatch) => {
    try {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const updatedTodos = storedTodos.map((ele) =>
            ele.id === id ? { ...ele, status: `completed` } : ele
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        dispatch({ type: UPDATE_TODO_STATUS });
        dispatch(getTodo());
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteTodos = (id) => async (dispatch) => {
    try {
        const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const updatedTodos = storedTodos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        dispatch({ type: DELETE_TODO });
        dispatch(getTodo());
    } catch (error) {
        console.log(error.message);
    }
};
