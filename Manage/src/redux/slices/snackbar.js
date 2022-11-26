import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    type: null,
    message: ''
};

const slice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        initSnackbar: (state, action) => {
            const { isOpen, type, message } = action.payload;
            state.isOpen = isOpen;
            state.type = type;
            state.message = message
        }
    }
});

export const {
    initSnackbar
} = slice.actions;

export default slice.reducer;
