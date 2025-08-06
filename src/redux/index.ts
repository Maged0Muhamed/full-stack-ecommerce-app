import { configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./services/Products/productsApiSlice";
import loginSlice from "./features/login/loginSlice";
import { useDispatch } from "react-redux";
import cartSlice from "./features/cart/cartSlice";
import globalSlice from "./features/global/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { dashboardApiSlice } from "./services/Dashboard/DashboardApiSlice";
import networkSlice from "./internetConnectionSlice";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistConfig, cartSlice);
export const store = configureStore({
  reducer: {
    network: networkSlice,
    global: globalSlice,
    cart: persistedCart,
    login: loginSlice,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      productApiSlice.middleware,
      dashboardApiSlice.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch: () => AppDispatch = useDispatch;
export const persistor = persistStore(store);
