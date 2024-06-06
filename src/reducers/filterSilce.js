import { createSlice } from '@reduxjs/toolkit';
import { constants } from '../constants';
const initialState = {
  grid_view: true,
  products: [],
  filtered_products: [],
  sort_by: constants.BEST_MATCH,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setGridView: state => {
      state.grid_view = true;
    },
    setListView: state => {
      state.grid_view = false;
    },
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
    priceSort: (state, action) => {
      let tempProducts = JSON.parse(JSON.stringify(state.products));

      const type = action.payload; // payload is the type of sort

      switch (type) {
        case constants.BEST_MATCH:
          state.filtered_products = state.products;
          state.sort_by = action.payload; // SORT => BEST MATCH
          break;
        case constants.LOW_TO_HIGH:
          (state.filtered_products = tempProducts.sort(
            (productA, productB) => productA.price - productB.price
          )),
            (state.sort_by = action.payload); // SORT => LOW TO HIGH;
          break;
        case constants.HIGH_TO_LOW:
          (state.filtered_products = tempProducts.sort(
            (productA, productB) => productB.price - productA.price
          )),
            (state.sort_by = action.payload); // SORT => HIGH TO LOW
          break;
        default:
          return state;
      }
      // if (type) {
      //   if (constants.BEST_MATCH) {
      //     state.filtered_products = state.products;
      //     state.sort_by = action.payload; // SORT => BEST MATCH
      //   }
      //   ////
      //   if (constants.LOW_TO_HIGH) {
      //     (state.filtered_products = tempProducts.sort(
      //       (productA, productB) => productA.price - productB.price
      //     )),
      //       (state.sort_by = action.payload); // SORT => LOW TO HIGH
      //   }
      //   ////
      //   if (constants.HIGH_TO_LOW) {
      //     (state.filtered_products = tempProducts.sort(
      //       (productA, productB) => productB.price - productA.price
      //     )),
      //       (state.sort_by = action.payload); // SORT => HIGH TO LOW
      //   }
      //   ////
      //   else {
      //     return state;
      //   }
      // }
    },
  },
});

export const { setGridView, setListView, loadProducts, priceSort } = filterSlice.actions;
export default filterSlice.reducer;
