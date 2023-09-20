import { combineReducers } from "redux";
import authorizationReducer from "./authorizationReducer";


const reducers = combineReducers({
    authorization: authorizationReducer,
});

export default reducers;