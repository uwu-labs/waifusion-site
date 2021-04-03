import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Waifu } from "../../types/waifusion";
import { RootState } from "../index";

interface UserState {
  address: string;
  waifuIndexes: number[];
}

const initialState: UserState = {
  address: "",
  waifuIndexes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setWaifuIndexes: (state, action: PayloadAction<number[]>) => {
      state.waifuIndexes = action.payload;
    },
  },
});

export const { setAddress, setWaifuIndexes } = userSlice.actions;

export const selectAddress = (state: RootState): string => state.user.address;
export const selectUsersWaifus = (state: RootState): Waifu[] => {
  return state.waifus.waifus.filter(
    (waifu: Waifu) => state.user.waifuIndexes.indexOf(waifu.id) > -1
  );
};
export const selectTotalAccumulated = (state: RootState): number => {
  return state.waifus.waifus
    .filter((waifu: Waifu) => state.user.waifuIndexes.indexOf(waifu.id) > -1)
    .reduce((a: number, b: Waifu) => a + (b.accumulatedWet || 0), 0);
};

export default userSlice.reducer;
