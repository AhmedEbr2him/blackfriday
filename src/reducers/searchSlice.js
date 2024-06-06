/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  searchResult: [],
  searchLoading: false,
  searchError: false,
  searchErrorMsg: '',
};

export const getSearchResult = createAsyncThunk(
  'product/searchProducts',
  async (searchTerm, thunkAPI) => {
    //ERROR
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search/?q=${searchTerm}`
      );
      const data = await response.json();

      return data.products;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getSearchResult.pending, state => {
        (state.searchLoading = true), (state.searchError = false);
      })
      .addCase(getSearchResult.fulfilled, (state, action) => {
        (state.searchLoading = false),
          (state.searchError = false),
          state.searchResult.push(...action.payload);
      })
      .addCase(getSearchResult.rejected, (state, action) => {
        (state.searchLoading = false),
          (state.searchError = true),
          (state.searchErrorMsg = action.payload);
      });
  },
});

export default searchSlice.reducer;
