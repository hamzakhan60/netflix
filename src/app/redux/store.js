import { configureStore } from '@reduxjs/toolkit'
import reducer from './features/movieSlice'
export const store = configureStore({
  reducer
})