import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface IInitialState {
  isOnline: boolean;
}
const initialState: IInitialState = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "networkSlice",
  initialState,
  reducers: {
    networkModeAction: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});
export default networkSlice.reducer;
export const networkSelector = ({ network }: RootState) => network;
export const { networkModeAction } = networkSlice.actions;
