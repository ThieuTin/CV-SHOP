import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    _id: null,
    title: '',
    content: '',
    type: 'info',
    caseSubmit: null
};

const slice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        initDialog: (state, action) => {
            const { isOpen, _id, title, content, type, caseSubmit } = action.payload;
            state.isOpen = isOpen;
            state._id = _id;
            state.title = title;
            state.content = content;
            state.type = type;
            state.caseSubmit = caseSubmit;
        }
    }
});

export const {
    initDialog
} = slice.actions;

export default slice.reducer;