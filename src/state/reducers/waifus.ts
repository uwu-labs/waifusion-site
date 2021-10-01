import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Waifu } from "../../types/waifusion";
import { RootState } from "../index";

interface WaifusState {
  waifus: Waifu[];
  dungeonRemaining: number;
}

const initialState: WaifusState = {
  waifus: [],
  dungeonRemaining: 0,
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
    setDungeonRemaining: (state, action: PayloadAction<number>) => {
      state.dungeonRemaining = action.payload;
    },
  },
});

export const { addWaifu, setWaifus, setDungeonRemaining } = waifusSlice.actions;

export const selectWaifus = (state: RootState): Waifu[] => state.waifus.waifus;

export const selectDungeonRemaining = (state: RootState): number =>
  state.waifus.dungeonRemaining;

export default waifusSlice.reducer;
