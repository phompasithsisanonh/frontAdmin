import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    error: null,
    page: 1,
    limit: 5,
    query: "",
    queryCategory: "",
    price: "",
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setQueryCategory: (state, action) => {
      state.queryCategory = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  setQuery,
  setQueryCategory,
  setPrice,
  setPage,
} = productsSlice.actions;

export default productsSlice.reducer;
