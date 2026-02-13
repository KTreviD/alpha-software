import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  //baseUrl: 'https://amaterasu-production.up.railway.app/',

  credentials: "include",
  //   prepareHeaders: (headers, { getState }) => {
  //     const state = getState() as RootState;
  //     const token = state.user.token;
  //     if (token) headers.set("authorization", `Bearer ${token}`);

  //     return headers;
  //   },
});

export const handleApiResponse = (res: any) => {
  if (res.error) {
    // toast.error(res.error.data.message, { duration: 4500 });
  }
  if (res.data) {
    // toast.success(res.data.message, { duration: 4500 });
  }
};

const baseQueryWithReAuth = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  //403 es permisos 401 es no autenticado

  if (result?.error?.status === 401) {
    // Intentar refresh (usa refreshToken en cookie)
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "GET" },
      api,
      extraOptions
    );

    if (!refreshResult.error) {
      // Backend ya seteo nuevas cookies
      // Reintenta la request original
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh falló → sesión muerta
      window.location.href = "/auth/logout";
    }
  }

  if (
    api.type === "mutation" &&
    !args.url.includes("login") &&
    !args.url.includes("logout") &&
    (args.extraOptions?.showNotificaction == undefined ||
      args.extraOptions?.showNotificaction != false)
  ) {
    handleApiResponse(result);
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Companies", "Industries", "Auth", "Session"],
  endpoints: builder => ({
    /////////////////////////////////////////------------------ GET ------------------/////////////////////////////////////////

    // getCandidates: builder.query<
    //   GetDashboardAssetManagementFiltersReturnPropsT,
    //   GetDashboardAssetManagementFiltersQueryPropsT | void
    // >({
    // getCandidates: builder.query({
    //   query: params => {
    //     if (!params) return "/companies/getAllCompanies";
    //     const { clientsScope, batchScope } = params;
    //     return `/assetManagement/dashboardFilters?clientsScope=${clientsScope}&batchScope=${batchScope}`;
    //   },
    //   providesTags: ["Candidates"],
    // }),
    getIsVerificationCodeValid: builder.query<
      any,
      { code: string; type: string }
    >({
      query: params => {
        const { code, type } = params;
        return `/auth/verify/isEmailVerificationCodeValid?code=${code}&type=${type}`;
      },
    }),
    getAllSessions: builder.query<any, void>({
      query: params => "/session/all",
      providesTags: ["Session"],
    }),
    getCompaniesAdminPage: builder.query<any, void>({
      query: params => "/companies/adminPage",
      providesTags: ["Companies", "Industries"],
    }),
    getIndustriesAdminPage: builder.query<any, void>({
      query: params => "/industries/adminPage",
      providesTags: ["Industries"],
    }),
    /////////////////////////////////////////----------------- POST -----------------/////////////////////////////////////////

    // postCandidate: builder.mutation<
    //   ResChartsData,
    //   PostDashboardAMChartsPropsT
    // >({
    postRegister: builder.mutation({
      query: body => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postLogin: builder.mutation({
      query: body => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postVerifyEmail: builder.mutation({
      query: body => ({
        url: "/auth/verify/email",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postResendVerificationEmail: builder.mutation({
      query: body => ({
        url: "/auth/verify/resendVerificationEmail",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postVerifyTwoFactorCode: builder.mutation({
      query: body => ({
        url: "/mfa/verify-login",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postResendTwoFactorCode: builder.mutation({
      query: body => ({
        url: "/mfa/resend-two-factor-code",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postForgotPassword: builder.mutation({
      query: body => ({
        url: "/auth/password/forgot",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postResetPassword: builder.mutation({
      query: body => ({
        url: "/auth/password/reset",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postLogout: builder.mutation<void, void>({
      query: body => ({
        url: "/auth/logout",
        method: "POST",
        body,
      }),
      //   transformResponse: (response: ResChartsData) => response
    }),
    postCompany: builder.mutation({
      query: body => ({
        url: "/companies/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Companies"],
      //   transformResponse: (response: ResChartsData) => response
    }),
    postIndustry: builder.mutation({
      query: body => ({
        url: "/industries/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Industries"],
      //   transformResponse: (response: ResChartsData) => response
    }),

    /////////////////////////////////////////------------------ PUT ------------------/////////////////////////////////////////

    putCompany: builder.mutation({
      query: body => ({
        url: `/companies/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Companies"],
    }),
    putIndustry: builder.mutation({
      query: body => ({
        url: `/industries/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Industries"],
    }),

    /////////////////////////////////////////------------------ DELETE ------------------/////////////////////////////////////////

    deleteCompany: builder.mutation({
      query: body => ({
        url: `/companies/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Companies"],
    }),
    deleteIndustry: builder.mutation({
      query: body => ({
        url: `/industries/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Industries"],
    }),
  }),
});

export const {
  /////////////////////////////////////////------------------ GET ------------------/////////////////////////////////////////
  useGetIsVerificationCodeValidQuery,
  useGetAllSessionsQuery,
  useGetCompaniesAdminPageQuery,
  useGetIndustriesAdminPageQuery,

  /////////////////////////////////////////------------------ POST ------------------/////////////////////////////////////////

  usePostLoginMutation,
  usePostRegisterMutation,
  usePostVerifyEmailMutation,
  usePostResendVerificationEmailMutation,
  usePostVerifyTwoFactorCodeMutation,
  usePostResendTwoFactorCodeMutation,
  usePostForgotPasswordMutation,
  usePostResetPasswordMutation,
  usePostLogoutMutation,
  usePostCompanyMutation,
  usePostIndustryMutation,

  /////////////////////////////////////////------------------ PUT ------------------/////////////////////////////////////////

  usePutCompanyMutation,
  usePutIndustryMutation,

  /////////////////////////////////////////------------------ DELETE ------------------/////////////////////////////////////////

  useDeleteCompanyMutation,
  useDeleteIndustryMutation,
} = apiSlice;
