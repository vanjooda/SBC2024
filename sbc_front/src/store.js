import {configureStore} from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice";
import memberSlice from "./slice/memberSlice";

export default configureStore({
    reducer: {
        "loginSlice" : loginSlice,
        "memberSlice" : memberSlice,
    }
});