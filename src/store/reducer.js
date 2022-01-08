import { authReducer } from "./reducers/authReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
});