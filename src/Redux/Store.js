import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import TodoReducer from "../Redux/Todo/TodoReducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    TodoReducer,
});

const Store = legacy_createStore(rootReducer,applyMiddleware(thunk));

export default Store;
