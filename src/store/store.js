import { configureStore } from "@reduxjs/toolkit";
import recordSlice from "./RecourdSlice/recordSlice";


export default configureStore({
    reducer : {
        recourd : recordSlice
    }
})