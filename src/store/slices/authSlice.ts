import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import {
  ResetPasswordRequest,
  login,
  LoginRequest,
  signUp,
  SignUpRequest,
  resetPassword,
  verifySecurityCode,
  SecurityCodePayload,
  NewPasswordData,
  setNewPassword,
} from '@app/api/auth.api';
import { setUser } from '@app/store/slices/userSlice';
import { deleteToken, deleteUser, persistToken, readToken } from '@app/services/localStorage.service';
import { UserModel } from '@app/domain/UserModel';

export interface AuthSlice {
  // ress: string | null;
  refresh: string | null;
  access: string | null;
}

const initialState: AuthSlice = {
  access: readToken(),
  refresh: readToken()
};


export const doLogin = createAsyncThunk('auth/doLogin', async (loginPayload: LoginRequest, { dispatch }) =>
  login(loginPayload).then((res)=>{
    const decoded:UserModel = jwt_decode(JSON.stringify(res.access))
    const {user_id, email, first_name, last_name} = decoded
    persistToken(JSON.stringify(res.access));    
    dispatch(setUser({user_id, email, first_name, last_name}));
  return JSON.stringify(res.access);
  })
);
 

export const doSignUp = createAsyncThunk('auth/doSignUp', async (signUpPayload: SignUpRequest) =>{
   signUp(signUpPayload) 
});

export const doResetPassword = createAsyncThunk(
  'auth/doResetPassword',
  async (resetPassPayload: ResetPasswordRequest) => resetPassword(resetPassPayload),
);

export const doVerifySecurityCode = createAsyncThunk(
  'auth/doVerifySecurityCode',
  async (securityCodePayload: SecurityCodePayload) => verifySecurityCode(securityCodePayload),
);

export const doSetNewPassword = createAsyncThunk('auth/doSetNewPassword', async (newPasswordData: NewPasswordData) =>
  setNewPassword(newPasswordData),
);

export const doLogout = createAsyncThunk('auth/doLogout', (payload, { dispatch }) => {
  deleteToken();
  deleteUser();
  dispatch(setUser({}));
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.access = action.payload;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.access = '';
    });
  },
});

export default authSlice.reducer;
