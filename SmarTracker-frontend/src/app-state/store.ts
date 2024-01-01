import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import RootApiSlice from './slices/rtk-query-slices/rootApiSlice';
import loggedinUserSlice from './slices/loggedinUserSlice';


export const store = configureStore({
  reducer: {
    loggedinUser: loggedinUserSlice,
    [RootApiSlice.reducerPath]: RootApiSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RootApiSlice.middleware)
});

setupListeners(store.dispatch);
