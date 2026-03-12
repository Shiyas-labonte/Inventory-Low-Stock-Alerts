import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* Fetch all products */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await api.get("/products");
    return response.data;
  }
);

/* Create product */
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data) => {
    const response = await api.post("/products", data);
    return response.data;
  }
);

/* Fetch product detail */
export const fetchProductDetail = createAsyncThunk(
  "products/fetchProductDetail",
  async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
);

/* Add stock movement */
export const addStockMovement = createAsyncThunk(
  "products/addStockMovement",
  async (data) => {
    const response = await api.post("/stock-movements", data);
    return response.data;
  }
);
/* Get stock movements */
export const getMovements = createAsyncThunk(
  "products/getMovements",
  async (productId) => {

    const res = await api.get(`/movements/${productId}`);

    return res.data;
  }
);