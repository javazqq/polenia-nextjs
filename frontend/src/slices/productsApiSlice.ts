import { PRODUCTS_URL } from "@/constants";
import { apiSlice } from "./apiSlice";

// Define the Product type (or import it if declared elsewhere)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),

});



export const { useGetProductsQuery } = productsApiSlice;
