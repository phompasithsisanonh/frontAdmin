import {configureStore} from "@reduxjs/toolkit"
import productsReducer from './listProducts';
export const store = configureStore({
    reducer:{
        products: productsReducer,
    },
})