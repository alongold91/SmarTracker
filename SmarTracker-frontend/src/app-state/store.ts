import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import RootApiSlice from './queries/rootApiSlice';


export const store = configureStore({
  reducer: {
    [RootApiSlice.reducerPath]: RootApiSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RootApiSlice.middleware)
});

setupListeners(store.dispatch);
