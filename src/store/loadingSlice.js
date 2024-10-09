import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: false,
    },
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
    }
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export const selectLoading = (state) => state.loading.loading;
export default loadingSlice.reducer;