import axiosInstance from "@/config/axios.config";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../..";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "@/interfaces";
import type { IFormInput as IUserCredtials } from "@/pages/Login";
import { toaster } from "@/components/ui/toaster";
import CookieService from "../../../services/Cookie";

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: IUserCredtials, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axiosInstance.post("/auth/local", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
interface ILoginData {
  jwt: string;
  user: { username: string; email: string };
}
interface IInitialState {
  loading: boolean;
  data: ILoginData | null;
  error: AxiosError<IErrorResponse> | null;
}
const initialState: IInitialState = {
  data: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userLogin.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      userLogin.fulfilled,
      (state, action: PayloadAction<ILoginData>) => {
        state.loading = false;
        state.data = action.payload;
        const data = new Date();
        const IN_DAYS = 3;
        const EXPIRES_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
        data.setTime(data.getTime() + EXPIRES_IN_DAYS);
        const options = {
          path: "/",
          expires: data,
        };
        CookieService.set("jwt", action.payload.jwt, options);
        toaster.create({
          description: "logged successfully",
          type: "success",
        });
        window.location.reload();
        // localStorage.setItem("loggedInUser", JSON.stringify(state.data));
        // setTimeout(() => {
        //   location.replace("/");
        // }, 2000);
      }
    );
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload as AxiosError<IErrorResponse>;
      toaster.create({
        description: `${state.error.response?.data.error.message}`,
        type: "error",
        closable: true,
        duration: 1500,
      });
    });
  },
});
export default loginSlice.reducer;
export const loginSelector = ({ login }: RootState) => login;
