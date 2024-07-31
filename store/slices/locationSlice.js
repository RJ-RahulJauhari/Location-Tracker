import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "locations",
    initialState: {
        currentLocation: null,
        destination: null,
        radius: 1000,
        savedLocations: [],
    },
    reducers: {
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setRadius: (state, action) => {
            state.radius = action.payload;
        },
        addSavedLocation: (state, action) => {
            state.savedLocations.push({
                id: Date.now(), // Or any unique id generator
                ...action.payload,
            });
        },
        removeSavedLocation: (state, action) => {
            state.savedLocations = state.savedLocations.filter(
                (location) => location.id !== action.payload
            );
        },
    },
});

export const { setCurrentLocation, setDestination, setRadius, addSavedLocation, removeSavedLocation } = locationSlice.actions;

export default locationSlice.reducer;