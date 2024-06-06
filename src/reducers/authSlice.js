import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFromLocalStorage, storeInLocalStorage } from '../utils/helpers';

const authFetchData = () => {
  let authData = fetchFromLocalStorage('authData');
  if (authData.length === 0) {
    return (authData = {
      isLoggedIn: true,
      info: {},
    });
  }
  return authData;
};

const initialState = {
  authLoading: 'false',
  authData: authFetchData(),
  authError: null,
  authErrorMsg: '',
};
export const makeAuthRequest = createAsyncThunk('auth/authRequset', async (loginData, thnkAPI) => {
  //ERROR
  const { rejectWithValue } = thnkAPI;
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
      //username: 'kminchelle',
      // password: '0lelplR',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    rejectWithValue((error.message = 'No server response!'));

    if (error.response?.status === 400) {
      rejectWithValue((error.message = 'Missing username or password!'));
    }

    if (error.response?.status === 401) {
      rejectWithValue((error.message = 'Unauthorized!'));
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      storeInLocalStorage({ isLoggedIn: false, info: {} }, 'authData');
      state.authData = {
        isLoggedIn: false,
        info: {},
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(makeAuthRequest.pending, state => {
        (state.authLoading = true), (state.authError = false);
      })
      .addCase(makeAuthRequest.fulfilled, (state, action) => {
        storeInLocalStorage({ isLoggedIn: true, info: action.payload }, 'authData'),
          (state.authLoading = false),
          (state.authData = {
            isLoggedIn: true,
            info: action.payload,
          });
      })
      .addCase(makeAuthRequest.rejected, (state, action) => {
        (state.authLoading = false),
          (state.authError = true),
          (state.authErrorMsg = action.payload);
      });
  },
});

export default authSlice.reducer;
export const { logOut } = authSlice.actions;
