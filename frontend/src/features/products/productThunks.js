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
  async (product, { rejectWithValue }) => {
    try {
      const res = await api.post(`/products`, product);
      return res.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ detail: "Server error" });
    }
  })

/* Fetch product detail */
export const fetchProductDetail = createAsyncThunk(
  "products/fetchProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "NOT FOUND"
      );
    }
  }
);

/* Add stock movement */
export const addStockMovement = createAsyncThunk(
  "products/addStockMovement",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/stock-movements", data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ detail: "Server error" });
    }
  }
);
/* Get stock movements */
export const getMovements = createAsyncThunk(
  "products/getMovements",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/movements/${productId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to load movements"
      );
    }
  }
);