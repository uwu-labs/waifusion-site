import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ETH_GLOBALS, GlobalsData, Network } from "../../services/globals";
import { RootState } from "../index";

interface GlobalsState {
  data: GlobalsData;
}

const initialState: GlobalsState = {
  data: ETH_GLOBALS,
};

export const globalsSlice = createSlice({
  name: "globals",
  initialState,
  reducers: {
    setGlobals: (state, action: PayloadAction<GlobalsData>) => {
      state.data = action.payload;
    },
  },
});

export const { setGlobals } = globalsSlice.actions;

export const selectGlobalsData = (state: RootState): GlobalsData =>
  state.globals.data;
export const selectNetwork = (state: RootState): Network =>
  state.globals.data.network;
export const selectIsTest = (state: RootState): boolean =>
  state.globals.data.network === Network.TEST;
export const selectIsEth = (state: RootState): boolean =>
  state.globals.data.network === Network.ETH ||
  state.globals.data.network === Network.TEST;
export const selectIsBsc = (state: RootState): boolean =>
  state.globals.data.network === Network.BSC;
export const selectBuyPrice = (state: RootState): string =>
  state.globals.data.buyPrice;
export const selectImageApi = (state: RootState): string =>
  state.globals.data.imageApi;
export const selectWetTradeLink = (state: RootState): string =>
  state.globals.data.wetTradeLink;

export default globalsSlice.reducer;
