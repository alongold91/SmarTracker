import { clearStorageIfNeeded } from '../../../utils/util-functions';
import { setCredentials, logout } from '../loggedinUserSlice';
import RootApiSlice from './rootApiSlice';

const UsersApiSlice = RootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string },
      { email: string; password: string; trustsDevice: boolean }
    >({
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
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ accessToken: data.accessToken }));
        } catch (error: any) {
          throw Error(error.error.data.message);
        }
      },
      invalidatesTags: ['Users']
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/users/logout',
        method: 'PATCH'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;

          if ((meta && meta.response && meta?.response.status) === 204) {
            dispatch(logout());
            dispatch(RootApiSlice.util.resetApiState());

            clearStorageIfNeeded();
            
          }
        } catch (error: any) {
          throw Error(error.error.data.message);
        }
      }
    }),
    forgotPassword: builder.mutation<void, string>({
      query: (email) => ({
        url: 'users/forgot-password',
        method: 'PUT',
        body: {
          email
        }
      })
      // We don't need to invalidate cache after this action, nothing in the database changes
    }),
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: 'users/refreshtoken',
        method: 'GET'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ accessToken: data.accessToken }));
        } catch (error: any) {
          throw Error(error.error.data.message);
        }
      }
    }),
    resetPassword: builder.mutation<
      void,
      { resetToken: string; newPassword: string }
    >({
      query: (args) => ({
        url: 'users/reset-password',
        method: 'PUT',
        body: {
          ...args
        }
      }),
      invalidatesTags: ['Users']
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation
} = UsersApiSlice;
