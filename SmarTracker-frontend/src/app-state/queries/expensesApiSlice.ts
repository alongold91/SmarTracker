import RootApiSlice from './rootApiSlice';
import { Expense } from '@common/src/interfaces/expenses';

const ExpenseApiSlice = RootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpensesByUserId: builder.query<Expense[], string>({
      query: (userId: string) => {
        return {
          url: `expenses/user/${userId}`,
          method: 'GET'
        };
      },
      providesTags: ['Expenses']
    })
  })
});

export const { useGetExpensesByUserIdQuery } = ExpenseApiSlice;
