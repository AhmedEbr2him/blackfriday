import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';

const initialState = {
  categoryLoading: false,
  categoreis: [],
  categoryError: null,
  categoryProductLoading: false,
  categoryProducts: [],
  categoryProductError: null,
  categoryErrorMsg: '',
};

export const getCategoriesList = createAsyncThunk(
  'product/getCategories',
  async (_, thunkAPI) => {
    // ERROR
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await fetch(`https://dummyjson.com/products/categories`);
      const data = await response.json();

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getCategoryProducts = createAsyncThunk(
  'product/getCategory',
  async (categoryKey, thunkAPI) => {
    // ERROR
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${categoryKey}`
      );
      const data = await response.json();
      return data.products;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // CATEGORIES
    builder.addCase(getCategoriesList.pending, state => {
      (state.categoryLoading = true), (state.categoryError = false);
    });
    builder.addCase(getCategoriesList.fulfilled, (state, action) => {
      (state.categoryLoading = false), (state.categoreis = action.payload);
    });
    builder.addCase(getCategoriesList.rejected, (state, action) => {
      (state.categoryLoading = false),
        (state.categoryError = true),
        (state.categoryErrorMsg = action.payload);
    });
    // CATEGORY
    builder.addCase(getCategoryProducts.pending, state => {
      (state.categoryProductLoading = true), (state.categoryProductError = false);
    });
    builder.addCase(getCategoryProducts.fulfilled, (state, action) => {
      (state.categoryProductLoading = false), (state.categoryProducts = action.payload);
    });
    builder.addCase(getCategoryProducts.rejected, (state, action) => {
      (state.categoryProductLoading = false),
        (state.categoryProductError = true),
        (state.categoryProductError = action.payload);
    });
  },
});

export default categorySlice.reducer;
