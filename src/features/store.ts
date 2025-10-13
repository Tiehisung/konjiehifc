import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/slices/counter'

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})
