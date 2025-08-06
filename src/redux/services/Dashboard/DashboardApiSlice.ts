import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieServies from "@/services/Cookie";
import type { IProduct } from "@/interfaces";
export const dashboardApiSlice = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["DashboardApi"],
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  }),

  endpoints: builder => ({
    getDashboardProducts: builder.query({
      query: arg => {
        const { page = 1, pageSize = 7 } = arg;
        return {
          url: `/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=thumbnail&populate=category`,
        };
      },
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }: IProduct) => ({
                type: "DashboardApi" as const,
                id,
              })),
              { type: "DashboardApi", id: "LIST" },
            ]
          : [{ type: "DashboardApi", id: "LIST" }],
    }),
    deleteDashboardProduct: builder.mutation({
      query: documentId => {
        return {
          url: `/products/${documentId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieServies.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "DashboardApi", id: "LIST" }],
    }),
    updateDashboardProduct: builder.mutation({
      async queryFn(productData, _queryApi, _extraOptions, fetchWithBQ) {
        const fileFormData = new FormData();
        fileFormData.append("files", productData.thumbnail);

        const uploadFileRes = await fetchWithBQ({
          url: "/upload",
          method: "POST",
          headers: {
            Authorization: `Bearer ${CookieServies.get("jwt")}`,
          },
          body: fileFormData,
        });

        if (uploadFileRes.error) {
          return {
            error:
              uploadFileRes.error as import("@reduxjs/toolkit/query").FetchBaseQueryError,
          };
        }

        const uploadedImageId = (uploadFileRes.data as { id: number }[])[0]?.id;

        const createRes = await fetchWithBQ({
          url: `/products/${productData.documentId}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${CookieServies.get("jwt")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              title: productData.title,
              description: productData.description,
              price: productData.price,
              stock: productData.stock,
              thumbnail: uploadedImageId,
            },
          }),
        });

        if (createRes.error) {
          return {
            error:
              createRes.error as import("@reduxjs/toolkit/query").FetchBaseQueryError,
          };
        }

        return { data: createRes.data };
      },
      invalidatesTags: [{ type: "DashboardApi", id: "LIST" }],
    }),

    createDashboardProduct: builder.mutation({
      async queryFn(productData, _queryApi, _extraOptions, fetchWithBQ) {
        const fileFormData = new FormData();
        fileFormData.append("files", productData.thumbnail);

        const uploadFileRes = await fetchWithBQ({
          url: "/upload",
          method: "POST",
          headers: {
            Authorization: `Bearer ${CookieServies.get("jwt")}`,
          },
          body: fileFormData,
        });

        if (uploadFileRes.error) {
          return {
            error:
              uploadFileRes.error as import("@reduxjs/toolkit/query").FetchBaseQueryError,
          };
        }

        const uploadedImageId = (uploadFileRes.data as { id: number }[])[0]?.id;

        const createRes = await fetchWithBQ({
          url: "/products",
          method: "POST",
          headers: {
            Authorization: `Bearer ${CookieServies.get("jwt")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              title: productData.title,
              description: productData.description,
              price: productData.price,
              stock: productData.stock,
              thumbnail: uploadedImageId,
            },
          }),
        });

        if (createRes.error) {
          return {
            error:
              createRes.error as import("@reduxjs/toolkit/query").FetchBaseQueryError,
          };
        }

        return { data: createRes.data };
      },
      invalidatesTags: [{ type: "DashboardApi", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useUpdateDashboardProductMutation,
  useDeleteDashboardProductMutation,
  useCreateDashboardProductMutation,
} = dashboardApiSlice;
