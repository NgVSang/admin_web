import appReducer from "@/reducer/app.reducer";
import {combineReducers} from "redux";
import authReducer from "@/reducer/auth.reducer";
import workingReducer from "@/reducer/working.reducer";
import requestReducer from "@/reducer/request.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    application: appReducer,
    working: workingReducer,
    request: requestReducer
})

export default rootReducer