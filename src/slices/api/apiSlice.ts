import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  //baseUrl: 'https://amaterasu-production.up.railway.app/',

  //   credentials: "include",
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
  console.log({ args, api, extraOptions });
  const result = await baseQuery(args, api, extraOptions);

  //Manejar 403 para token y 401 para paginas que no tienes permiso como un cliente que ponga un branches/:id
  //Que no entre en sus permitted_branches

  if (result?.error?.status === 403) {
    // api.dispatch(logoutUser());
    // // send refresh token to get new access token
    // const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    // const { token } = refreshResult?.data as ExtraOptionsWithToken;
    // console.log({ refreshResult, token });
    // if (token) {
    //   console.log('Hay token');
    //   api.dispatch(refreshToken({ token }));
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   console.log('No hubo token');
    // }
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
  tagTypes: ["Companies", "CompanySizes", "Industries"],
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
    getCompaniesAdminPage: builder.query<any, void>({
      query: params => "/companies/adminPage",
      providesTags: ["Companies", "CompanySizes", "Industries"],
    }),
    getCompanySizesAdminPage: builder.query<any, void>({
      query: params => "/company-sizes/adminPage",
      providesTags: ["CompanySizes"],
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
    postCompany: builder.mutation({
      query: body => ({
        url: "/companies/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Companies"],
      //   transformResponse: (response: ResChartsData) => response
    }),
    postCompanySize: builder.mutation({
      query: body => ({
        url: "/company-sizes/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CompanySizes"],
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
    putCompanySize: builder.mutation({
      query: body => ({
        url: `/company-sizes/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CompanySizes"],
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
    deleteCompanySize: builder.mutation({
      query: body => ({
        url: `/company-sizes/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanySizes"],
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
  useGetCompaniesAdminPageQuery,
  useGetCompanySizesAdminPageQuery,
  useGetIndustriesAdminPageQuery,

  /////////////////////////////////////////------------------ POST ------------------/////////////////////////////////////////

  usePostCompanyMutation,
  usePostCompanySizeMutation,
  usePostIndustryMutation,

  /////////////////////////////////////////------------------ PUT ------------------/////////////////////////////////////////

  usePutCompanyMutation,
  usePutCompanySizeMutation,
  usePutIndustryMutation,

  /////////////////////////////////////////------------------ DELETE ------------------/////////////////////////////////////////

  useDeleteCompanyMutation,
  useDeleteCompanySizeMutation,
  useDeleteIndustryMutation,
} = apiSlice;
