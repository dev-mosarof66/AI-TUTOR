import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'


interface State {
    theme: boolean
}


const initialState: State = {
    theme: false
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme(state, action: PayloadAction<boolean>) {
            state.theme = action.payload
        }
    }
})

export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer