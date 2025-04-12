import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getConnections,
  getUserProfile,
  searchUsers as apiSearchUsers  // Renamed import to avoid conflict
} from '../../api/users';

export const fetchConnections = createAsyncThunk(
  'users/fetchConnections',
  async (_, { rejectWithValue }) => {
    try {
      return await getConnections();
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Fixed: Added 'const' and used renamed import
export const searchUsers = createAsyncThunk(
  'users/search',
  async (query, { rejectWithValue }) => {
    try {
      return await apiSearchUsers(query);
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'users/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserProfile(userId);
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    connections: [],
    searchResults: [],
    currentProfile: null,
    loading: false,
    error: null
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Connections
      .addCase(fetchConnections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.loading = false;
        state.connections = action.payload;
      })
      .addCase(fetchConnections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Search Users
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearUserError, clearSearchResults } = userSlice.actions;
export default userSlice.reducer;