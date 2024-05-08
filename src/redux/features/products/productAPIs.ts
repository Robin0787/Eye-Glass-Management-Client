import { TSearchQuery } from "../../../pages/dashboard/sellProduct/SellProduct";
import { TAddProduct } from "../../../types/dashboard.types";
import { TSellProductPayload } from "../../Types/productAPIs.types";
import { baseApi } from "../../api/baseApi";

export const productAPIs = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (payload: TSearchQuery | undefined) => {
        const params = new URLSearchParams();
        if (payload?.field && payload?.value) {
          params.append(payload?.field, payload?.value);
        }
        return {
          url: "/glasses",
          method: "GET",
          params,
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/glasses/glass/${id}`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (data: TAddProduct) => ({
        url: "/glasses/add-glass",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, payload }: { id: string; payload: TAddProduct }) => ({
        url: `/glasses/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/glasses/delete-glass/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    deleteMultipleProduct: builder.mutation({
      query: (data) => ({
        url: "/glasses/delete-multiple-glass",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    sellProduct: builder.mutation({
      query: (payload: TSellProductPayload) => ({
        url: "/sales/sale-product",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products", "sales-history"],
    }),
    salesHistory: builder.query({
      query: () => ({
        url: "/sales/sales-history",
        method: "GET",
      }),
      providesTags: ["sales-history"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteMultipleProductMutation,
  useSellProductMutation,
  useSalesHistoryQuery,
} = productAPIs;
