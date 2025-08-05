/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export interface Module {
    title: string;
    topics: string[];
}

export interface Outline {
    _id: string;
    id?: string;
    title: string;
    modules: Module[];
}

interface OutlineState {
    outlines: Outline[];
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
}

const initialState: OutlineState = {
    outlines: [],
    loading: false,
    error: false,
    errorMessage: null,
};

// 1. Create outline
export const createOutline = createAsyncThunk<
    Outline,
    { prompt: string },
    { rejectValue: string }
>("outlines/createOutline", async ({ prompt }, thunkAPI) => {
    try {
        const response = await axios.post("/api/outline/generate", { prompt });
        return response.data as Outline;
    } catch (err: any) {
        const message =
            err.response?.data?.message ||
            err.message ||
            "Something went wrong while generating the outline.";
        return thunkAPI.rejectWithValue(message);
    }
});

// 2. Save outline
export const saveOutline = createAsyncThunk<
    Outline,
    Outline,
    { rejectValue: string }
>("outlines/saveOutline", async (outline, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/outline", outline);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to save outline");
    }
});

// 3. Get all outlines
export const getAllOutlines = createAsyncThunk<Outline[], void, { rejectValue: string }>(
    "outlines/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/api/outline");
            return response.data.outlines;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch outlines");
        }
    }
);

// 4. Delete outline
export const deleteOutlineById = createAsyncThunk<string, string, { rejectValue: string }>(
    "outlines/delete",
    async (id, thunkAPI) => {
        try {
            await axios.delete(`/api/outline/${id}`);
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete outline");
        }
    }
);

const outlineSlice = createSlice({
    name: "outlines",
    initialState,
    reducers: {
        clearOutlines(state) {
            state.outlines = [];
            state.error = false;
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createOutline.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;
                toast.dismiss();
            })
            .addCase(createOutline.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.errorMessage = null;
                state.outlines.push(action.payload)
                toast.dismiss();
                toast.success("Course outline created successfully.");
            })
            .addCase(createOutline.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? "Your internet connection is unstable";
                toast.dismiss();
                toast.error(state.errorMessage);
            })

            // Save
            .addCase(saveOutline.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;

            })
            .addCase(saveOutline.fulfilled, (state, action) => {
                state.outlines.push(action.payload);
                state.loading = false;
                state.error = false;
                state.errorMessage = null;
                toast.success("Course outline saved successfully.");
            })
            .addCase(saveOutline.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? "Your internet connection is unstable";

                toast.error(state.errorMessage);
            })

            // Get all
            .addCase(getAllOutlines.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;
            })
            .addCase(getAllOutlines.fulfilled, (state, action: PayloadAction<Outline[]>) => {
                state.loading = false;
                state.outlines = action.payload;
            })
            .addCase(getAllOutlines.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? "Error loading outlines";
                toast.error(state.errorMessage);
            })

            // Delete
            .addCase(deleteOutlineById.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;
                toast.loading("Deleting outline.");
            })
            .addCase(deleteOutlineById.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.outlines = state.outlines.filter(outline => outline._id !== action.payload);
                toast.dismiss();
                toast.success("Deleted outline successfully.");
            })
            .addCase(deleteOutlineById.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? "Failed to delete outline";
                toast.error(state.errorMessage);
            });
    },
});

export const { clearOutlines } = outlineSlice.actions;
export default outlineSlice.reducer;
