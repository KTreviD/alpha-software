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
  tagTypes: ["Companies", "Industries", "Auth", "Session", "S3Files"],
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
    getFoldersAndFiles: builder.query<
      any,
      { module: string; parentId: string | null; deleted: boolean }
    >({
      query: params => {
        const { module, parentId, deleted } = params;
        return `/s3Files/foldersAndFiles?module=${module}&parentId=${parentId}&deleted=${deleted}`;
      },
      providesTags: ["S3Files"],
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
    postFolder: builder.mutation({
      query: body => ({
        url: "/s3Files/createfolder",
        method: "POST",
        body,
      }),
      invalidatesTags: ["S3Files"],
      //   transformResponse: (response: ResChartsData) => response
    }),
    postGetPresignedUrl: builder.mutation<
      { url: string },
      { fileName: string; fileType: string }
    >({
      query: ({ fileName, fileType }) => ({
        url: "/s3Files/upload-url", // la API que genera el presigned URL
        method: "POST",
        body: { fileName, fileType },
      }),
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
    putFolder: builder.mutation({
      query: body => ({
        url: `/s3Files/renamefolder`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["S3Files"],
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
    deleteFolder: builder.mutation({
      query: body => ({
        url: `/s3Files/deleteFolder`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["S3Files"],
    }),
  }),
});

export const {
  /////////////////////////////////////////------------------ GET ------------------/////////////////////////////////////////
  useGetIsVerificationCodeValidQuery,
  useGetAllSessionsQuery,
  useGetCompaniesAdminPageQuery,
  useGetIndustriesAdminPageQuery,
  useGetFoldersAndFilesQuery,

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
  usePostFolderMutation,
  usePostGetPresignedUrlMutation,

  /////////////////////////////////////////------------------ PUT ------------------/////////////////////////////////////////

  usePutCompanyMutation,
  usePutIndustryMutation,
  usePutFolderMutation,

  /////////////////////////////////////////------------------ DELETE ------------------/////////////////////////////////////////

  useDeleteCompanyMutation,
  useDeleteIndustryMutation,
  useDeleteFolderMutation,
} = apiSlice;
