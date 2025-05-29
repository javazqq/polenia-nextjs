import { PRODUCTS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

// Define the Product type (or import it if declared elsewhere)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  countInStock: number;
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query<Product, number | string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    })
  }),

});



export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
