import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await axios.post(
      "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product",
      {
        page: "1",
        pageSize: "10",
        sort: { creationDateSortOption: "DESC" },
      }
    );

    const { data } = response || {};
    return data?.products?.map((product) => ({
      ...product,
      quantity: 0, // Initialize quantity to 0
    })) || [];
  } catch (error) {
    console.error("API error", error);
    throw error;
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [], // Separate cart state
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) product.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch products";
      });
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = productsSlice.actions;
export default productsSlice.reducer;
