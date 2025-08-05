/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface Module {
    _id: string;
    title: string;
    video: string;
    createdAt: string;
    updatedAt: string;
    links: string;
    duration: number;
    __v: number;
}

interface State {
    modules: Module[];
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
}

export interface AddModuleArgs {
    playlistId: string | undefined;
    title: string;
    durationSeconds: number;
    comments: string;
    videoFile: File;
}

const initialState: State = {
    modules: [],
    loading: false,
    error: false,
    errorMessage: null,
};

export const addModule = createAsyncThunk<Module, AddModuleArgs, { rejectValue: string }>(
    "modules/add",
    async ({ playlistId, title, durationSeconds, comments, videoFile }, thunkAPI) => {
        const form = new FormData();
        form.append("title", title.trim());
        form.append("duration", durationSeconds.toString());
        form.append("comments", comments.trim());
        form.append("video", videoFile);

        try {
            const res = await axios.post(`/api/playlists/${playlistId}/modules/create`, form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const mdule: Module = res.data?.data;
            if (!mdule) {
                return thunkAPI.rejectWithValue("Invalid response from server");
            }

            return mdule;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Failed to add module";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateModule = createAsyncThunk<Module, { moduleId: string; updates: FormData; playlistId: string }, { rejectValue: string }>(
    "modules/update",
    async ({ moduleId, updates, playlistId }, thunkAPI) => {
        try {
            const res = await axios.put(`/api/playlists/${playlistId}/modules/update/${moduleId}`, updates, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const updated: Module = res.data?.data;
            if (!updated) {
                return thunkAPI.rejectWithValue("Invalid response from server when updating module");
            }
            return updated;
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Unknown error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllModules = createAsyncThunk<Module[], string, { rejectValue: string }>(
    "modules/getAll",
    async (playlistId, thunkAPI) => {
        try {
            const res = await axios.get(`/api/playlists/${playlistId}/modules`);
            const modules: Module[] = res.data?.data ?? [];
            return modules;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || "Unknown error");
        }
    }
);

export const deleteModule = createAsyncThunk<string, { moduleId: string; playlistId: string }, { rejectValue: string }>(
    "modules/delete",
    async ({ moduleId, playlistId }, thunkAPI) => {
        try {
            const res = await axios.delete(`/api/playlists/${playlistId}/modules/delete/${moduleId}`);
            const deletedId = res.data?.data;
            if (!deletedId || typeof deletedId !== "string") {
                return thunkAPI.rejectWithValue("Unexpected response from server when deleting module");
            }
            return deletedId;
        } catch (err: any) {
            const serverMsg = err.response?.data?.message || err.response?.data?.error || null;
            const message = serverMsg || err.message || "Unknown error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getAllModules
            .addCase(getAllModules.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;
            })
            .addCase(getAllModules.fulfilled, (state, action: PayloadAction<Module[]>) => {
                state.loading = false;
                state.modules = action.payload;
            })
            .addCase(getAllModules.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? action.error.message ?? "Failed to load modules";
                toast.error("Your internet connection is unstable.")
            })

            // updateModule
            .addCase(updateModule.pending, (state) => {
                state.error = false;
                state.loading = true;
                state.errorMessage = null;
                toast.loading("Updating module...", { id: "updateModule" });
            })
            .addCase(updateModule.fulfilled, (state, action: PayloadAction<Module>) => {
                state.loading = false;
                const idx = state.modules.findIndex((m) => m._id === action.payload._id);
                if (idx !== -1) {
                    state.modules[idx] = action.payload;
                } else {
                    state.modules.push(action.payload);
                }
                toast.success("Module updated successfully.", { id: "updateModule" });
            })
            .addCase(updateModule.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? action.error.message ?? "Failed to update module";
                toast.error(state.errorMessage || "Failed to update module.", { id: "updateModule" });
            })

            // addModule
            .addCase(addModule.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;
                toast.loading("Adding module...", { id: "addModule" });
            })
            .addCase(addModule.fulfilled, (state, action: PayloadAction<Module>) => {
                state.loading = false;
                state.modules.push(action.payload);
                toast.success("Module added successfully.", { id: "addModule" });
            })
            .addCase(addModule.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? action.error.message ?? "Failed to add module";
                toast.error(state.errorMessage || "Failed to add module.", { id: "addModule" });
            })

            // deleteModule
            .addCase(deleteModule.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;
                toast.loading("Deleting module...", { id: "deleteModule" });
            })
            .addCase(deleteModule.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.modules = state.modules.filter((m) => m._id !== action.payload);
                toast.success("Module deleted successfully.", { id: "deleteModule" });
            })
            .addCase(deleteModule.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? action.error.message ?? "Failed to delete module";
                toast.error(state.errorMessage || "Failed to delete module.", { id: "deleteModule" });
            });
    },
});

export default modulesSlice.reducer;
