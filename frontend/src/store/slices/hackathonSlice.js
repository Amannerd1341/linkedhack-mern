import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHackathons, createHackathon, joinHackathon } from '../../api/hackathons';

export const fetchHackathons = createAsyncThunk(
  'hackathons/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const hackathons = await getAllHackathons();
      return hackathons;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addHackathon = createAsyncThunk(
  'hackathons/create',
  async (hackathonData, { rejectWithValue }) => {
    try {
      const newHackathon = await createHackathon(hackathonData);
      return newHackathon;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const participateInHackathon = createAsyncThunk(
  'hackathons/join',
  async (hackathonId, { rejectWithValue }) => {
    try {
      const updatedHackathon = await joinHackathon(hackathonId);
      return updatedHackathon;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const hackathonSlice = createSlice({
  name: 'hackathons',
  initialState: {
    hackathons: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHackathons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHackathons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hackathons = action.payload;
      })
      .addCase(fetchHackathons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addHackathon.fulfilled, (state, action) => {
        state.hackathons.push(action.payload);
      })
      .addCase(participateInHackathon.fulfilled, (state, action) => {
        const index = state.hackathons.findIndex(h => h._id === action.payload._id);
        if (index !== -1) {
          state.hackathons[index] = action.payload;
        }
      });
  }
});

export default hackathonSlice.reducer;