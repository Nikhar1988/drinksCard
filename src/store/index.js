import { configureStore } from "@reduxjs/toolkit";
import drinkControlReducer from "./reducer";


export const store = configureStore({
    reducer: {
        drinks: drinkControlReducer
    }
})


