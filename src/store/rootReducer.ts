import appReducer from "@/reducer/app.reducer";
import authReducer from "@/reducer/auth.reducer";
import orderReducer from "@/reducer/order.reducer";
import productReducer from "@/reducer/product.reducer";
import requestReducer from "@/reducer/request.reducer";
import roleReducer from "@/reducer/role.reducer";
import workingReducer from "@/reducer/working.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    application: appReducer,
    working: workingReducer,
    request: requestReducer,
    product: productReducer,
    order: orderReducer,
    role: roleReducer
})

export default rootReducer