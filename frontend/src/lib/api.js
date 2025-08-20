import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE }),
  tagTypes: ['Property', 'Client', 'Viewing'],
  endpoints: (builder) => ({
    // Properties
    getProperties: builder.query({
      query: (params) => ({ url: '/properties', params }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Property', id: _id })),
              { type: 'Property', id: 'LIST' },
            ]
          : [{ type: 'Property', id: 'LIST' }],
    }),
    getProperty: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: 'Property', id }],
    }),
    createProperty: builder.mutation({
      query: (body) => ({ url: '/properties', method: 'POST', body }),
      invalidatesTags: [{ type: 'Property', id: 'LIST' }],
    }),
    updateProperty: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/properties/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Property', id }],
    }),
    archiveProperty: builder.mutation({
      query: (id) => ({ url: `/properties/${id}/archive`, method: 'POST' }),
      invalidatesTags: (r, e, id) => [{ type: 'Property', id }, { type: 'Property', id: 'LIST' }],
    }),
    unarchiveProperty: builder.mutation({
      query: (id) => ({ url: `/properties/${id}/unarchive`, method: 'POST' }),
      invalidatesTags: (r, e, id) => [{ type: 'Property', id }, { type: 'Property', id: 'LIST' }],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({ url: `/properties/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Property', id: 'LIST' }],
    }),

    // Clients
    createInquiry: builder.mutation({
      query: (body) => ({ url: '/clients', method: 'POST', body }),
      invalidatesTags: [{ type: 'Client', id: 'LIST' }],
    }),
    getClients: builder.query({
      query: (params) => ({ url: '/clients', params }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Client', id: _id })),
              { type: 'Client', id: 'LIST' },
            ]
          : [{ type: 'Client', id: 'LIST' }],
    }),
    updateClient: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/clients/${id}`, method: 'PUT', body }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Client', id }, { type: 'Client', id: 'LIST' }],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({ url: `/clients/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Client', id: 'LIST' }],
    }),

    // Viewings
    createViewing: builder.mutation({
      query: (body) => ({ url: '/viewings', method: 'POST', body }),
      invalidatesTags: [{ type: 'Viewing', id: 'LIST' }],
    }),
    getViewings: builder.query({
      query: (params) => ({ url: '/viewings', params }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Viewing', id: _id })),
              { type: 'Viewing', id: 'LIST' },
            ]
          : [{ type: 'Viewing', id: 'LIST' }],
    }),
    updateViewing: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/viewings/${id}`, method: 'PUT', body }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Viewing', id }, { type: 'Viewing', id: 'LIST' }],
    }),
    deleteViewing: builder.mutation({
      query: (id) => ({ url: `/viewings/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Viewing', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useArchivePropertyMutation,
  useUnarchivePropertyMutation,
  useDeletePropertyMutation,
  useCreateInquiryMutation,
  useGetClientsQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useCreateViewingMutation,
  useGetViewingsQuery,
  useUpdateViewingMutation,
  useDeleteViewingMutation
} = api;
