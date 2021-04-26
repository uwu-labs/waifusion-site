import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Waifu } from "../../types/waifusion";
import { RootState } from "../index";

interface UserState {
  address: string;
  waifuIndexes: number[];
  loadingWafius: boolean;
  wetApprovedForDungeon: boolean;
  waifusApprovedForDungeon: boolean;
  wetApprovedForWrapper: boolean;
  nftxApprovedForWrapper: boolean;
}

const initialState: UserState = {
  address: "",
  waifuIndexes: [],
  loadingWafius: false,
  wetApprovedForDungeon: false,
  waifusApprovedForDungeon: false,
  wetApprovedForWrapper: false,
  nftxApprovedForWrapper: false,
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
    loadWaifus: (state) => {
      state.loadingWafius = true;
    },
    completeLoadWaifus: (state) => {
      state.loadingWafius = false;
    },
    setWetApprovedForDungeon: (state, action: PayloadAction<boolean>) => {
      state.wetApprovedForDungeon = action.payload;
    },
    setWaifusApprovedForDungeon: (state, action: PayloadAction<boolean>) => {
      state.waifusApprovedForDungeon = action.payload;
    },
    setWetApprovedForWrapper: (state, action: PayloadAction<boolean>) => {
      state.wetApprovedForWrapper = action.payload;
    },
    setNftxApprovedForWrapper: (state, action: PayloadAction<boolean>) => {
      state.nftxApprovedForWrapper = action.payload;
    },
  },
});

export const {
  setAddress,
  setWaifuIndexes,
  loadWaifus,
  completeLoadWaifus,
  setWetApprovedForDungeon,
  setWaifusApprovedForDungeon,
  setWetApprovedForWrapper,
  setNftxApprovedForWrapper,
} = userSlice.actions;

export const selectLoadingWaifus = (state: RootState): boolean =>
  state.user.loadingWafius;
export const selectAddress = (state: RootState): string => state.user.address;
export const selectUserWaifuIds = (state: RootState): number[] =>
  state.user.waifuIndexes;
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
export const selectWetApprovedForDungeon = (state: RootState): boolean =>
  state.user.wetApprovedForDungeon;
export const selectWaifusApprovedForDungeon = (state: RootState): boolean =>
  state.user.waifusApprovedForDungeon;
export const selectWetApprovedForWrapper = (state: RootState): boolean =>
  state.user.wetApprovedForWrapper;
export const selectNftxApprovedForWrapper = (state: RootState): boolean =>
  state.user.nftxApprovedForWrapper;

export default userSlice.reducer;
