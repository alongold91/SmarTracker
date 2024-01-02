import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).loggedinUser.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const RootApiSlice = createApi({
  reducerPath: 'rootApi',
  baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ['Users', 'Expenses']
});

export default RootApiSlice;
