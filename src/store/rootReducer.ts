import appReducer from "@/reducer/app.reducer";
import {combineReducers} from "redux";
import authReducer from "@/reducer/auth.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    application: appReducer,
})

export default rootReducer