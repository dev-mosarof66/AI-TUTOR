/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Playlist } from "../playlist/playlists";

interface PlanProps {
    title: string;
}

export interface UserProps {
    _id: string;
    email: string;
    github:string;
    school:string;
    name: string;
    fullname: string;
    avatar: string;
    currentPlan: string | null;
    enrolledCourses: Playlist[] | [];
    plans: PlanProps[] | [];
    createdAt: string;
    updatedAt: string;
    __v: number;
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
    fetched: false
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

//create async thunk for logging out user

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    "user/logoutUser",
    async (_, thunkAPI) => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
        } catch (error: any) {
            const message =
                error?.response?.data?.message || "Failed to logout user";
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
                if (action.payload?.includes("Login session expired")) {
                    state.fetched = true;
                    state.user = null;
                } else {
                    state.fetched = false;
                }
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.fetched = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Something went wrong";
            });
    },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
