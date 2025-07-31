import { configureStore } from '@reduxjs/toolkit'
import theme from '@/features/theme/themeSlice'
import playlists from '@/features/playlist/playlists'

export const store = configureStore({
  reducer: {
    theme,
    playlists
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch