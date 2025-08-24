/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    loading: boolean;
    isError: boolean;
    errorMessage: string | null;
    fetched: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false,
    isError: false,
    errorMessage: null,
    fetched:false
};

export const fetchUserData = createAsyncThunk<UserProps, void, { rejectValue: string }>(
    "user/fetchUserData",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/api/auth", { withCredentials: true });
            return response.data.data as UserProps;
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                (error?.response?.status === 401
                    ? "Login session expired. Please login again."
                    : "Failed to fetch user data");
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<UserProps>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.fetched = true;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Something went wrong";
                state.user = null;
                state.fetched = true;
            });
    },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
