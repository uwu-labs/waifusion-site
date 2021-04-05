import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Waifu } from "../../types/waifusion";
import { RootState } from "../index";

interface WaifusState {
  waifus: Waifu[];
}

const initialState: WaifusState = {
  waifus: [],
};

export const waifusSlice = createSlice({
  name: "waifus",
  initialState,
  reducers: {
    addWaifu: (state, action: PayloadAction<Waifu>) => {
      state.waifus.push(action.payload);
    },
    setWaifus: (state, action: PayloadAction<Waifu[]>) => {
      state.waifus = action.payload;
    },
  },
});

export const { addWaifu, setWaifus } = waifusSlice.actions;

export const selectWaifus = (state: RootState): Waifu[] => state.waifus.waifus;

export default waifusSlice.reducer;
