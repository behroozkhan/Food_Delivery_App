import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlices';
import cartReducer from "./reducers/CartSlice";

const rootReducer = combineReducers({
    user:userReducer,
    cart:cartReducer,
});

export default rootReducer;