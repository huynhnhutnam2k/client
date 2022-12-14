import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promotion: null,
    isSuccess: false,
    isLoading: false,
    msg: "",
    isError: false,
  },
  reducers: {
    resetPromtion: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.msg = "";
      state.isSuccess = false;
      state.promotion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.promotion = action.payload;
      })
      .addCase(getPromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      });
  },
});

export const getPromotion = createAsyncThunk("promotion/get", async (code) => {
  try {
    const res = await axios.post(
      "https://gearstorev2.onrender.com/promotion/code",
      {
        code: code,
      }
    );
    return res?.data;
  } catch (error) {
    console.log(error.response.data);
  }
});
export const { resetPromtion } = promotionSlice.actions;
export default promotionSlice.reducer;
