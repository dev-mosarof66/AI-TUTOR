import { configureStore } from '@reduxjs/toolkit'
import theme from '@/features/theme/themeSlice'
import playlists from '@/features/playlist/playlists'
import modules from '@/features/moudles/modules'
import outlines from '@/features/outline/outline'
import user from '@/features/user/userSlice'

export const store = configureStore({
  reducer: {
    theme,
    playlists,
    modules,
    outlines,
    user
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch