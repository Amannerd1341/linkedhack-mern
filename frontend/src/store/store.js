import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import hackathonReducer from './slices/hackathonSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hackathons: hackathonReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});