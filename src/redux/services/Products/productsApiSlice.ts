import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApiSlice = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  }),
  endpoints: builder => ({
    getProductsList: builder.query({
      query: () => {
        return {
          url: `/products?populate=thumbnail&populate=category&fields=title,description,price`,
        };
      },
    }),

    getProduct: builder.query({
      query: ({ id }) => {
        return {
          url: `/products/${id}?populate=thumbnail&populate=category`,
        };
      },
    }),
  }),
});

export const { useGetProductsListQuery, useGetProductQuery } = productApiSlice;
