import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '../store/slices/locationSlice';

export const store = configureStore({
    reducer: {
        locations: locationsReducer,
    },
});