/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import toast from 'react-hot-toast';

interface ModuleType {
    title: string;
    comments: string[];
    videos: string[];
}

export interface Playlist {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
    duration: number | null;
    level: string | null;
    modules: ModuleType[];
    popular: boolean;
    __v: number;
}

interface CreatePlaylistArgs {
    title: string;
    description: string;
    thumbnail: File;
    category: string;
}

interface State {
    playlists: Playlist[];
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
}

const initialState: State = {
    playlists: [],
    loading: false,
    error: false,
    errorMessage: null,
};

export const getAllPlaylist = createAsyncThunk<Playlist[], void, { rejectValue: string }>(
    "playlists/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get("/api/playlists");
            if (res.status >= 300) {
                return thunkAPI.rejectWithValue(`Network error. Check your internet connection`);
            }
            const playlists: Playlist[] = res?.data.data ?? [];
            return playlists;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || "Unknown error");
        }
    }
);

export const createPlaylist = createAsyncThunk<
    Playlist,
    CreatePlaylistArgs,
    { rejectValue: string }
>(
    'playlists/create',
    async ({ title, description, thumbnail, category }, thunkAPI) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        formData.append('category', category);

        try {
            const res = await axios.post('/api/playlists/create-playlist', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.status >= 400) {
                return thunkAPI.rejectWithValue('Network error. Check your internet connection');
            }

            const playlist: Playlist = res.data?.data;
            if (!playlist) {
                return thunkAPI.rejectWithValue('Invalid response from server');
            }

            return playlist;
        } catch (err: any) {
            const status = err?.response?.status;
            let message = err?.response?.data?.message || err.message || 'Network error. Check your internet connection';

            if (status === 401) {
                message = 'Unauthorized: Please log in again.';
            } else if (status === 402) {
                message = 'Payment Required: Upgrade your plan to continue.';
            } else if (status === 500) {
                message = 'Server error: Something went wrong!';
            }

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deletePlaylist = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    "playlists/delete",
    async (playlistId, thunkAPI) => {
        try {

            const res = await axios.delete(`/api/playlists/${playlistId}/delete`);
            if (res?.status >= 400 || !playlistId) {
                return thunkAPI.rejectWithValue(
                    `Unexpected response status: ${res.status}`
                );
            }


            return playlistId;
        } catch (err: any) {
            const serverMsg = err.response?.data?.message || err.response?.data?.error || null;
            const message = serverMsg || err.message || "Unknown error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const playlistsSlice = createSlice({
    name: "playlists",
    initialState,
    reducers: {
        updatePlaylist(state, action: PayloadAction<Playlist[]>) {
            state.playlists = action.payload;
        },
        addPlaylist(state, action: PayloadAction<Playlist>) {
            state.playlists.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPlaylist.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;
            })
            .addCase(getAllPlaylist.fulfilled, (state, action: PayloadAction<Playlist[]>) => {
                state.loading = false;
                state.playlists = action.payload;
            })
            .addCase(getAllPlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? action.error.message ?? 'Your internet connection is unstable';
                toast.error(`Your internet connection is unstable.`)
            })

            //CREATE PLAYLIST BUILDER
            .addCase(createPlaylist.pending, (state) => {
                state.error = false;
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(createPlaylist.fulfilled, (state, action: PayloadAction<Playlist>) => {
                state.loading = false;
                state.playlists.push(action.payload);
            })
            .addCase(createPlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? action.error.message ?? 'Failed to create playlist';
            })
            //deleting playlists
            .addCase(deletePlaylist.pending, (state) => {
                state.error = false;
                state.loading = true;
                state.errorMessage = null;

                toast.loading("Module is deleting.", { id: "deleteModule" });
            })
            .addCase(deletePlaylist.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;

                state.playlists = state.playlists.filter((item) => item._id !== action.payload)

                toast.success("Module deleted successfully.", { id: "deleteModule" });
            })
            .addCase(deletePlaylist.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload ?? action.error.message ?? 'Your internet connection is unstable';
                toast.error(state.errorMessage);

            });
    },
});

export const { updatePlaylist, addPlaylist } = playlistsSlice.actions;
export default playlistsSlice.reducer;
