// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../Repo/Repository";
// If you need to import from analysisSlice, use the correct path:
// import { resetStep, clearAnalysisReport, clearUploadedData } from "./analysis/analysisSlice";

// Thunk to fetch user data
export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  const email = localStorage.getItem("email");
  try {
    const response = await axios.post(`${baseURL}/get-user`, { email });
    // Ensure the user data is properly formatted for one-time payments
    if (response.data?.plan === "starter") {
      response.data.subscription = {
        ...response.data.subscription,
        price: 10,
        type: "one-time"
      };
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Error fetching user"
    );
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    isLoggedIn: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      localStorage.removeItem("email");
      localStorage.removeItem("customerId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        if (action.payload?.customer_id) {
          localStorage.setItem("customerId", action.payload.customer_id);
        } else {
          localStorage.removeItem("customerId");
        }
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
