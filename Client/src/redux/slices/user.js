import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// apis
import accountApi from '../../apis/accountApi';
// slices
import { initSnackbar } from '../slices/snackbar';

const initialState = {
    user: null
};

export const getProfile = createAsyncThunk('user/getProfile', async () => {
    const user = await accountApi.getProfile();
    return user;
});

const slice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        editProfileSuccess: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null
        }
    },
    extraReducers: {
        [getProfile.fulfilled]: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const {
    removeUser
} = slice.actions;

export default slice.reducer;

export const editProfile = params => async dispatch => {
    try {
        const { history, path, values } = params;
        const res = await accountApi.editProfile(values);
        const { statusText, message, account } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.editProfileSuccess(account));
            history.replace(path);
        }
        dispatch(initSnackbar({
            isOpen: true,
            type: statusText,
            message: message
        }));
    } catch (error) {
        console.log(error);
    }
};
