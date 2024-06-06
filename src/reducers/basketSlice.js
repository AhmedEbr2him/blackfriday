import { createSlice } from '@reduxjs/toolkit';
import { fetchFromLocalStorage, storeInLocalStorage } from '../utils/helpers';

const initialState = {
  basket: fetchFromLocalStorage('basket'),
  itemsCount: 0,
  totalAmount: 0,
  checkOutCount: 0,
  checkOutTotal: 0,
  checkOutAll: false,
  basketMsgStatus: false,
};
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      //GET EXIST ITEM FROM LOCAL STORAGE
      // only if the item already exist
      const existItem = state.basket.find((item) => item.id === action.payload.id);

      // Conditon here to set if the product already on local storage just increase quantity and price
      if (existItem) {
        let tempBasket = state.basket.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity;
            item.totalPrice = (item.quantity * item.price).toFixed(2);
          }

          return item;
        });
        // SET ON LOCAL STORAGE
        storeInLocalStorage(tempBasket, 'basket');
        // return {
        //   ...state,
        //   basket: tempBasket,
        // };
        state.basket = tempBasket;
      }
      //
      else {
        let tempBasket = [...state.basket, action.payload];
        storeInLocalStorage(tempBasket, 'basket');
        // return {
        //   ...state,
        //   basket: tempBasket,
        // };
        state.basket = tempBasket;
      }
    },

    addQtyItem: (state, action) => {
      const tempBasket = state.basket.map((item) => {
        if (item.id === action.payload) {
          let tempQty = item.quantity + 1;
          if (tempQty >= item.stock) tempQty = item.stock;
          let tempTotalPrice = (tempQty * item.discountedPrice).toFixed(2);

          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });

      // SET ON LOCAL STORAGE
      storeInLocalStorage(tempBasket, 'basket');
      return {
        ...state,
        basket: tempBasket,
      };
      // state.basket = tempBasket;
    },

    minusQtyItem: (state, action) => {
      const tempBasket = state.basket.map((item) => {
        if (item.id === action.payload) {
          let tempQty = item.quantity - 1;
          if (tempQty < 1) tempQty = 1;
          let tempTotalPrice = (tempQty * item.discountedPrice).toFixed(2);

          //copy item and update state
          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });

      // SET ON LOCAL STORAGE
      storeInLocalStorage(tempBasket, 'basket');
      return {
        ...state,
        basket: tempBasket,
      };
      // state.basket = tempBasket;
    },

    clearBasket: (state) => {
      // SET ON LOCAL STORAGE
      storeInLocalStorage([], 'basket');

      state.basket = [];
    },

    removeFromBasket: (state, action) => {
      const tempBasket = state.basket.filter((item) => item.id !== action.payload);
      state.basket = tempBasket;
      storeInLocalStorage(state.basket, 'basket');
      // SET ON LOCAL STORAGE
    },

    setBasketMsgOn: (state) => {
      return {
        ...state,
        basketMsgStatus: true,
      };
      // state.basketMsgStatus = true;
    },
    setBasketMsgOff: (state) => {
      return {
        ...state,
        basketMsgStatus: false,
      };
      // state.basketMsgStatus = false;
    },

    getBasketTotal: (state) => {
      let tempTotal = state.basket
        .reduce((basketTotal, basketItem) => {
          return (basketTotal += Number(basketItem.totalPrice));
        }, 0)
        .toFixed(2);

      return {
        ...state,
        totalAmount: tempTotal,
        itemsCount: state.basket.length,
      };
      // state.totalAmount = tempTotal;
      // state.itemsCount = state.basket.length;
    },

    addCheckOutItem: (state, action) => {
      const tempBasket = state.basket.map((item) => {
        if (item.id === action.payload) {
          return { ...item, checkOutStatus: true || '' };
        }
        return item;
      });

      const unCheckedCount = tempBasket.filter((item) => item.checkOutStatus === false).length;
      storeInLocalStorage(tempBasket, 'basket');
      // state.basket = tempBasket;

      return {
        ...state,
        basket: tempBasket,
        checkOutAll: unCheckedCount === 0 ? true : false,
      };
      // (state.basket = tempBasket), (state.checkOutAll = unCheckedCount === 0 ? true : false);
    },

    removeCheckOutItem: (state, action) => {
      const tempBasket = state.basket.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            checkOutStatus: false,
          };
        }
        return item;
      });

      storeInLocalStorage(tempBasket, 'basket');

      return {
        ...state,
        basket: tempBasket,
        checkOutAll: false,
      };
      // state.basket = tempBasket;
      // state.checkOutAll = false;
    },

    getCheckOutAll: (state) => {
      let tempTotal = state.basket
        .reduce((checkOutTotal, basketItem) => {
          return (checkOutTotal += Number(basketItem.checkOutStatus ? Number(basketItem.totalPrice) : 0));
        }, 0)
        .toFixed(2);

      let tempCount = state.basket.filter((basketItem) => basketItem.checkOutStatus === true).length;

      return {
        ...state,
        checkOutTotal: tempTotal,
        checkOutCount: tempCount,
        checkOutAll: tempCount === state.basket.length ? true : false,
      };
      // (state.checkOutTotal = tempTotal),
      //   (state.checkOutCount = tempCount),
      //   (state.checkOutAll = tempCount === state.basket.length ? true : false);
    },

    setCheckOutAll: (state) => {
      const setAllBasket = state.basket.map((item) => {
        return {
          ...item,
          checkOutStatus: true,
        };
      });

      storeInLocalStorage(setAllBasket, 'basket');

      return {
        ...state,
        checkOutAll: true,
        basket: setAllBasket,
      };
      // (state.checkOutAll = true), (state.basket = setAllBasket);
    },

    unSetCheckOutAll: (state) => {
      const tempBasket = state.basket.map((item) => {
        return {
          ...item,
          checkOutStatus: false,
        };
      });
      storeInLocalStorage(tempBasket, 'basket');

      return {
        ...state,
        checkOutAll: false,
        basket: tempBasket,
      };
      // (state.checkOutAll = false), (state.basket = tempBasket);
    },

    checkCheckOutAll: (state) => {
      let tempStatus =
        state.basket.filter((item) => {
          item.checkOutStatus === false;
        }).length === 0
          ? true
          : false;

      state.checkOutAll = tempStatus;
    },
  },
});

export default basketSlice.reducer;
export const {
  addToBasket,
  addQtyItem,
  minusQtyItem,
  clearBasket,
  removeFromBasket,
  setBasketMsgOff,
  setBasketMsgOn,
  getBasketTotal,
  addCheckOutItem,
  removeCheckOutItem,
  getCheckOutAll,
  setCheckOutAll,
  unSetCheckOutAll,
  checkCheckOutAll,
} = basketSlice.actions;
