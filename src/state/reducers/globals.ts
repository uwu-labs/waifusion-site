import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETH_GLOBALS, GlobalsData, Network } from "../../services/globals";
import { RootState } from "../index";

interface GlobalsState {
  data: GlobalsData;
  buyPrice: string;
  wetBurnPrice: string;
  bnbBurnPrice: string;
}

const initialState: GlobalsState = {
  data: ETH_GLOBALS,
  buyPrice: "---",
  wetBurnPrice: "-----",
  bnbBurnPrice: "---",
};

export const globalsSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    setGlobals: (state, action: PayloadAction<GlobalsData>) => {
      state.data = action.payload;
    },
    setBuyPrice: (state, action: PayloadAction<string>) => {
      state.buyPrice = action.payload;
    },
    setWetBurnPrice: (state, action: PayloadAction<string>) => {
      state.wetBurnPrice = action.payload;
    },
    setBnbBurnPrice: (state, action: PayloadAction<string>) => {
      state.bnbBurnPrice = action.payload;
    },
  },
});

export const {
  setGlobals,
  setBuyPrice,
  setWetBurnPrice,
  setBnbBurnPrice,
} = globalsSlice.actions;

export const selectGlobalsData = (state: RootState): GlobalsData =>
  state.globals.data;
export const selectBuyPrice = (state: RootState): string =>
  state.globals.buyPrice;
export const selectWetBurnPrice = (state: RootState): string =>
  state.globals.wetBurnPrice;
export const selectBnbBurnPrice = (state: RootState): string =>
  state.globals.bnbBurnPrice;
export const selectNetwork = (state: RootState): Network =>
  state.globals.data.network;
export const selectIsTest = (state: RootState): boolean =>
  state.globals.data.network === Network.TEST;
export const selectIsEth = (state: RootState): boolean =>
  state.globals.data.network === Network.ETH ||
  state.globals.data.network === Network.TEST;
export const selectIsBsc = (state: RootState): boolean =>
  state.globals.data.network === Network.BSC;
export const selectImageApi = (state: RootState): string =>
  state.globals.data.imageApi;
export const selectWetTradeLink = (state: RootState): string =>
  state.globals.data.wetTradeLink;
export const selectWetLpLink = (state: RootState): string =>
  state.globals.data.wetLpLink;

export default globalsSlice.reducer;
