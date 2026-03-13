import { createSlice } from "@reduxjs/toolkit";
import {fetchProducts,createProduct,fetchProductDetail,addStockMovement,getMovements} from "./productThunks";

const initialState = {
  list: [],
  movements: [],
  detail: null,
  status: "idle",
  loading: false,
  error: null,
  search: "",
  lowStockOnly: false
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    setSearch(state, action) {
      state.search = action.payload;
    },

    toggleLowStock(state) {
      state.lowStockOnly = !state.lowStockOnly;
    }

  },

  extraReducers: (builder) => {

    builder

      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      .addCase(fetchProductDetail.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addStockMovement.fulfilled, (state, action) => {
        if (state.detail) {
          state.detail.current_stock = action.payload.current_stock;
        }
      })
      .addCase(getMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.movements = action.payload;
      })
      .addCase(getMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export const { setSearch, toggleLowStock } = productSlice.actions;

export default productSlice.reducer;