import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import filterSlice from './filterSilce';
import categorySlice from './categorySlice';
import basketSlice from './basketSlice';
import searchSlice from './searchSlice';
import authSlice from './authSlice';
export const store = configureStore({
  reducer: {
    productsReducer: productSlice,
    filterReducer: filterSlice,
    categoryReducer: categorySlice,
    basketReducer: basketSlice,
    searchReducer: searchSlice,
    authReducer: authSlice,
  },
});
