import { ADD_TODO, DELETE_TODO, GET_TODO, UPDATE_TODO } from "./ActionTypes";

const initialState = {
    todo: [],
};

const todoReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_TODO: {
            return { ...state, todo: payload };
        }
        case ADD_TODO:
        case UPDATE_TODO:
        case DELETE_TODO: {
            return state;
        }
        default:
            return state;
    }
};

export default todoReducer;
