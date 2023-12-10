// apiSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { mangeStaff, fetchContractors, fetchStaff, fetchClient, fetchSite,fetchShift } from './ApiThunk';

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    position: null,
    contractors: null,                    
    staff: null,
    clients: null,
    site: null,
    shift:null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mangeStaff.fulfilled, (state, action) => {
        state.position = action.payload;
      })
      .addCase(fetchContractors.fulfilled, (state, action) => {
        state.contractors = action.payload;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.staff = action.payload;
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.clients = action.payload;
      })
      .addCase(fetchSite.fulfilled, (state, action) => {
        state.site = action.payload;
      })
      .addCase(fetchShift.fulfilled, (state, action) => {
        state.shift = action.payload;
      });
  },
});

export default apiSlice.reducer;
// Staff Positions
// Contrector
// Manage Staff
// Manage Clinet
// Manage Site
// Manage Shift