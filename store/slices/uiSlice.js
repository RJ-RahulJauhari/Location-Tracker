// store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        activeTab: 'home', // Default tab
    },
    reducers: {
        setActiveTab(state, action) {
            state.activeTab = action.payload;
        },
    },
});

export const { setActiveTab } = uiSlice.actions;
export default uiSlice.reducer;