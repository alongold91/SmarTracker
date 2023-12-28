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
        try {
          const { data: accessToken } = await queryFulfilled;
          dispatch(setCredentials({ accessToken }));
        } catch (error: any) {
          throw Error(error.error.data.message);
        }
      }
    })
  })
});

export const { useLazyLoginQuery } = UsersApiSlice;
