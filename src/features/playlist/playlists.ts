import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface ModuleType {
    title: string;
    comments: string[];
    videos: string[];
}

interface Playlist {
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
interface State {
    playlists: Playlist[];

}


const initialState: State = {
    playlists: []
}

export const playlistsSlice = createSlice({
    name: "playlists",
    initialState,
    reducers: {
        updatePlaylist(state, action: PayloadAction<Playlist[]>) {
            state.playlists = action.payload
        },
        addPlaylist(state, action: PayloadAction<Playlist>) {
            state.playlists.push(action.payload);
        }
    }
})

export const { updatePlaylist, addPlaylist } = playlistsSlice.actions
export default playlistsSlice.reducer