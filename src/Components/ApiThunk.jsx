// apiThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Staff Position Is Here
export const mangeStaff = createAsyncThunk('api/fetchStaff', async () => {
  const response = await axios.get('http://localhost:5000/ap4/v5/getManageStaff');
  return response.data;
});
//  Conterctore Dta is Here
export const fetchContractors = createAsyncThunk('api/fetchContractors', async () => {
  const response = await axios.get('http://localhost:5000/ap1/v1/getcontractors');
  return response.data;
});


// Staff Data is Here
export const fetchStaff = createAsyncThunk('api/fetchClients', async () => {
  const response = await axios.get('http://localhost:5000/ap2/v3/getStaff');
  return response.data;
});

// Client Data is Here
export const fetchClient = createAsyncThunk('api/fetchManageStaff', async () => {
  const response = await axios.get('http://localhost:5000/ap3/v4/getClient');
  return response.data;
});
// Site Data is Here
export const fetchSite = createAsyncThunk('api/fetchSite', async () => {
  const response = await axios.get('http://localhost:5000/ap5/v6/getSite');
  return response.data;
});

// Shift data is Here

export const fetchShift = createAsyncThunk('api/fetchShift', async () => {
    const response = await axios.get('http://localhost:5000/ap6/v7/Shift');
    return response.data;
  });
