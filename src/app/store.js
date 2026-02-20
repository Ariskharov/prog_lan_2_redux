import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import furnitureReducer from '../features/furniture/furnitureSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        furniture: furnitureReducer
    }
})