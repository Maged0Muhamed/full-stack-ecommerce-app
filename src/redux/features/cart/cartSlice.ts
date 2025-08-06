import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import type { IProduct } from "@/interfaces";
import { addItemToShoppingCart } from "@/utils";
import { toaster } from "@/components/ui/toaster";

interface IInitialState {
  cartProducts: IProduct[];
}
const initialState: IInitialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocartAction: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = addItemToShoppingCart(
        state.cartProducts,
        action.payload
      );
    },
    removeFromCartAction: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = state.cartProducts.filter(
        item => item.id !== action.payload.id
      );
      toaster.create({
        title: "Removed From Your Cart",
        type: "success",
        duration: 2000,
        closable: true,
      });
    },
    clearCartAction: state => {
      state.cartProducts = [];
      toaster.create({
        title: "Your Cart is empty now",
        type: "success",
        duration: 2000,
        closable: true,
      });
    },
  },
});
export default cartSlice.reducer;
export const cartSelector = ({ cart }: RootState) => cart;
export const { addTocartAction, removeFromCartAction, clearCartAction } =
  cartSlice.actions;
