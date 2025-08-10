/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PlanProps {
    title: string;
}

interface UserProps {
    email: string;
    currentPlan: string | null;
    plans: PlanProps[];
}

interface UserState {
    user: UserProps | null;
    loading: boolean,
    isError: boolean,
    errorMessage: string | null
}

const initialState: UserState = {
    user: null,
    loading: false,
    isError: false,
    errorMessage: null
};

export const checkUserAuth = createAsyncThunk<UserProps, void, { rejectValue: string }>("user/checkUserAuth",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("/api/auth");

            if (res.status >= 300) {
                return thunkAPI.rejectWithValue(`Network error. Check your internet connection`);
            }

            const user: UserProps = res?.data.data ?? [];

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Unknown error");
        }
    });

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkUserAuth.pending, (state) => {
                state.isError = false;
                state.errorMessage = null;
                state.loading = true;
            })
            .addCase(checkUserAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(checkUserAuth.rejected, (state) => {
                state.user = null;
            });
    },
});

export default userSlice.reducer;
