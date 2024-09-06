import {configureStore} from "@reduxjs/toolkit"

import productsReducer from './listProducts';
import dataReducer from './reducer';
export const store = configureStore({
    reducer:{
        products: productsReducer,
        dataA :dataReducer

    },
})