import CounterReducer from "./counter";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    Counter: CounterReducer
})

export default allReducers;