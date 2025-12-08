import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { AppUser } from '../../types/user';
import {
  checkAuthAction,
  loginAction,
  logoutAction
} from '../api-actions';

export type UserProcess = {
  authStatus: AuthStatus;
  appUser: AppUser | null;
};

const initialState: UserProcess = {
  authStatus: AuthStatus.Unknown,
  appUser: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.appUser = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.appUser = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.appUser = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.appUser = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.appUser = null;
      });
  },
});
