import { createSlice } from "@reduxjs/toolkit";

const overlaySlice = createSlice({
    name: 'overlay',
    initialState:  false,
    reducers: {
        showOverlay: (state) => {
            state=true;
            return state;
        },
        hideOverlay: (state) => {
            state=false;
            return state;
        }
    }
});
export const { showOverlay, hideOverlay} = overlaySlice.actions;
export default overlaySlice.reducer;