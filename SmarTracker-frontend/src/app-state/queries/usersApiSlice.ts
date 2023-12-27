import { setCredentials } from '../slices/loggedinUserSlice';
import RootApiSlice from './rootApiSlice';
import { Expense } from '@common/src/interfaces/expenses';

const UsersApiSlice = RootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<string, { email: string; password: string }>({
      query: (credentials) => {
        return {
          url: 'users/login',
          method: 'POST',
          body: {
            ...credentials
          }
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: accessToken } = await queryFulfilled;
        dispatch(setCredentials({ accessToken }));
      }
    })
  })
});

export const { useLazyLoginQuery } = UsersApiSlice;
