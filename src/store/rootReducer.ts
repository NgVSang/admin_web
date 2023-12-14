import appReducer from "@/reducer/app.reducer";
import authReducer from "@/reducer/auth.reducer";
import productReducer from "@/reducer/product.reducer";
import requestReducer from "@/reducer/request.reducer";
import workingReducer from "@/reducer/working.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    application: appReducer,
    working: workingReducer,
    request: requestReducer,
    product: productReducer
})

export default rootReducer