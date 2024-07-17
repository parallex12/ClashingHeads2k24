import { createSlice } from '@reduxjs/toolkit';

const presenceSlice = createSlice({
  name: 'presence',
  initialState: {
    status: 'offline',
  },
  reducers: {
    setOnline: (state) => {
      state.status = 'online';
    },
    setOffline: (state) => {
      state.status = 'offline';
    },
  },
});

export const { setOnline, setOffline } = presenceSlice.actions;

export default presenceSlice.reducer;
