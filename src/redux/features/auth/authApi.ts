import { TRegisterUserData } from "../../../pages/register/Register";
import { baseApi } from "../../api/baseApi";

export interface TLoginInfo {
  email: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user: TRegisterUserData) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (loginInfo: TLoginInfo) => ({
        url: "auth/login",
        method: "POST",
        body: loginInfo,
      }),
      invalidatesTags: ["products", "sales-history"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
