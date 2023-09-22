import { combineReducers } from "redux";
import authorizationReducer from "./authorizationReducer";
import vacationReducer from "./vacationsReducer"

const reducers = combineReducers({
    authorization: authorizationReducer,
    vacations: vacationReducer
});

export default reducers;