import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	productsLoading: false,
	productsError: null,
	productsErrorMsg: '',
	singleProduct: [],
	singleProductLoading: false,
	singleProductError: false,
	singleProductErrorMsg: '',
};
export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
	// ERROR
	const { rejectWithValue } = thunkAPI;
	try {
		const response = await fetch('https://dummyjson.com/products?limit=100');
		const data = await response.json();

		return data.products;
	} catch (error) {
		rejectWithValue(error.message);
	}
});

//SINGLE PRODUCT
export const getSingleProduct = createAsyncThunk('products/getSingleProduct', async (id, thunkAPI) => {
	// ERROR
	const { rejectWithValue } = thunkAPI;

	try {
		const response = await fetch(`https://dummyjson.com/product/${id}`);
		const data = response.json();
		return data;
	} catch (error) {
		rejectWithValue(error.message);
	}
});

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//GET ALL PRODUCTS
		builder.addCase(getProducts.pending, (state) => {
			(state.productsLoading = true), (state.productsError = null);
		});
		builder.addCase(getProducts.fulfilled, (state, action) => {
			(state.productsLoading = false), state.products.push(...action.payload);
			// state.product = action.payload => to trasnform array
		});
		builder.addCase(getProducts.rejected, (state, action) => {
			(state.productsLoading = false), (state.productsError = true);
			state.productsErrorMsg = action.payload;
		});

		// GET SINGLE PRODUCT
		builder.addCase(getSingleProduct.pending, (state) => {
			state.singleProductLoading = true;
			state.singleProductError = false;
		});
		builder.addCase(getSingleProduct.fulfilled, (state, action) => {
			state.singleProductLoading = false;
			state.singleProduct = action.payload;
		});
		builder.addCase(getSingleProduct.rejected, (state, action) => {
			state.singleProductLoading = false;
			state.singleProductError = true;
			state.singleProductErrorMsg = action.payload;
		});
	},
});

export default productSlice.reducer;
