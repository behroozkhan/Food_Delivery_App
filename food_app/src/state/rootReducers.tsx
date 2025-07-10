import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlices';

const rootReducer = combineReducers({
    user:userReducer,
});

export default rootReducer;