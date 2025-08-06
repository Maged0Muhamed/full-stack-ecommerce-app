import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../..";

interface IInitialState {
  isCartDrawerOpened: boolean;
}
const initialState: IInitialState = {
  isCartDrawerOpened: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    drawerTrigerAction: state => {
      state.isCartDrawerOpened = !state.isCartDrawerOpened;
    },
  },
});
export default globalSlice.reducer;
export const globalSelector = ({ global }: RootState) => global;
export const { drawerTrigerAction } = globalSlice.actions;
