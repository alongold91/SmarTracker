import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../loggedinUserSlice';
import { clearStorageIfNeeded } from '../../../utils/util-functions';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).loggedinUser.token; //TODO: add redux types and remove this
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log('sending refresh token');

    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      '/users/refreshtoken',
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      console.log(refreshResult.data);
      const accessToken = { ...refreshResult.data } as { accessToken: string };
      // store the new token
      api.dispatch(setCredentials(accessToken));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        (refreshResult.error.data as any).message = 'Your login has expired. ';
        clearStorageIfNeeded();
      }
      return refreshResult;
    }
  }

  return result;
};

export const RootApiSlice = createApi({
  reducerPath: 'rootApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ['Users', 'Expenses']
});

export default RootApiSlice;
