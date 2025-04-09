import { createSlice } from "@reduxjs/toolkit";

/* const initialCart = [
  {
    id: 1,
    name: "Travel Foam Mattress 1 Plaza",
    sku: "SKU001",
    price: 590,
    quantity: 1,
    category: "Mattresses and Box Springs",
    image:
      "https://f.fcdn.app/imgs/13dd1a/www.viasono.com.uy/viasuy/d923/webp/catalogo/B206010316_206010092_1/460x460/silla-lester-gris.jpg",
    slug: "travel-foam-mattress-1-plaza",
  },
  {
    id: 2,
    name: "Chill Spring Mattress 2 Plazas",
    sku: "SKU002",
    price: 890,
    quantity: 1,
    category: "Mattresses and Box Springs",
    image:
      "https://f.fcdn.app/imgs/13dd1a/www.viasono.com.uy/viasuy/d923/webp/catalogo/B206010316_206010092_1/460x460/silla-lester-gris.jpg",
    slug: "chill-spring-mattress-2-plazas",
  },
]; */

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
      console.log("Clear cart");
      return [];
    },
  },
});

const { reducer, actions } = shoppingCartSlice;

export const { addToCart, setQty, removeFromcart, incrementQty, decrementQty, clearCart } = actions;

export default reducer;
