import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const RootApiSlice = createApi({
    reducerPath: 'rootApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
    endpoints: builder => ({ }),
    tagTypes: ['Users', 'Expenses']
  })

  export default RootApiSlice