import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  token: string | null;
}

const initialState: InitialState = {
    token: null
}

export const loggedinUserSlice = createSlice({
  name: 'loggedinUser',
  initialState,
  reducers: {
   setCredentials: (state, action: PayloadAction<{accessToken: string}>) => {
    const {accessToken} = action.payload;
    state.token = accessToken;
   },
   logout: (state) => {
    state.token = null;
   }
  },
})

export const { setCredentials, logout } = loggedinUserSlice.actions

export default loggedinUserSlice.reducer