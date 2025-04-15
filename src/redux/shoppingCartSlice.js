import { createSlice } from "@reduxjs/toolkit";

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const productInCart = state.find((item) => item.id === product.id);

      if (!productInCart) {
        state.push({ ...product, quantity: 1 });
      } else {
        productInCart.quantity += 1;
      }
    },

    removeFromcart(state, action) {
      return state.filter((product) => product.id !== action.payload);
    },

    incrementQty(state, action) {
      const selectedProduct = state.find((item) => item.id === action.payload);
      selectedProduct.quantity += 1;
    },

    decrementQty(state, action) {
      const selectedProduct = state.find((item) => item.id === action.payload);
      if (selectedProduct.quantity > 1) {
        selectedProduct.quantity -= 1;
      }
    },

    setQty(state, action) {
      const selectedProduct = state.find((item) => item.id === action.payload.id);
      selectedProduct.quantity = action.payload.qty;
    },

    clearCart(state, action) {
      return [];
    },
  },
});

const { reducer, actions } = shoppingCartSlice;

export const { addToCart, setQty, removeFromcart, incrementQty, decrementQty, clearCart } = actions;

export default reducer;
