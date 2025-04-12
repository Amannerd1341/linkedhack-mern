import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getCurrentUser } from '../../api/auth';

// Helper function to handle common async state changes
const handleAsyncAction = (builder, thunk, stateKey) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state[stateKey] = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Something went wrong';
    });
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.token);
      return response.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      return response.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    handleAsyncAction(builder, loginUser, 'user');
    handleAsyncAction(builder, registerUser, 'user');
    handleAsyncAction(builder, fetchCurrentUser, 'user');
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;