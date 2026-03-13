import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CreateProductModal from "../components/CreateProductModal";
import productReducer from "../features/products/productSlice";
import "@testing-library/jest-dom";

jest.mock("../services/api",()=>({
  get: jest.fn(),
  post: jest.fn(),
}));

test("renders CreateProductModal dialog", () => {

  const preloadedState = {
    products: {
      loading: false,
      error: null
    }
  };

  const store = configureStore({
    reducer: { products: productReducer },
    preloadedState
  });

  render(
    <Provider store={store}>
      <CreateProductModal />
    </Provider>
  );

  expect(screen.getByRole("dialog")).toBeInTheDocument();

});