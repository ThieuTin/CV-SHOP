import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { initSnackbar } from '../slices/snackbar';
import { statusText } from '../../constant';
import cartApi from '../../apis/cartApi';

const initialState = {
    cart: null,
    totalItem: 0
};

export const getCart = createAsyncThunk('cart/getCart', async () => {
    const res = await cartApi.getCart();
    return res;
});

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        onToggleSuccess: (state, action) => {
            const { _id, isCheckedAll } = action.payload;
            // _id null will toggle all checkboxes
            if (!_id) {
                state.cart = state.cart.map(item => ({ ...item, checked: isCheckedAll }));
            } else {
                state.cart = state.cart.map(item => item._id === _id ? { ...item, checked: !item.checked } : item);
            }
        },
        updateQuantitySuccess: (state, action) => {
            const { _id, newAmount } = action.payload;
            state.cart = state.cart.map(item => item._id === _id ? { ...item, amount: newAmount } : item);
        },
        addCartSuccess: (state, action) => {
            const { item, quantity } = action.payload;
            const isEmptyCart = state.totalItem === 0;
            if (isEmptyCart) {
                state.cart = [item];
                state.totalItem = 1
            } else {
                if (state.cart.some(product => product._id === item._id)) {
                    state.cart = state.cart.map(product => product._id === item._id ? { ...product, amount: quantity } : product);
                }
                else {
                    state.cart = [item, ...state.cart];
                    state.totalItem = state.totalItem + 1;
                }
            }
        },
        removeCartSuccess: (state, action) => {
            const _id = action.payload;
            let newCart = null;
            // _id null will remove all checked boxes
            if (!_id) {
                newCart = state.cart.filter(item => !item.checked);
            } else {
                newCart = state.cart.filter(item => item._id !== _id);
            }
            return {
                ...state,
                cart: newCart,
                totalItem: newCart ? newCart.length : 0
            }
        },
        deleteCart: (state) => {
            state.cart = null;
            state.totalItem = 0
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                const {
                    cart,
                    totalItem
                } = action.payload;
                state.cart = cart;
                state.totalItem = totalItem;
            })
            .addDefaultCase(state => state)
    }
});

export const {
    deleteCart
} = slice.actions;

export default slice.reducer;

export const toggleCheck = params => async dispatch => {
    try {
        const { cartId, isCheckedAll } = params;
        const res = await cartApi.toggleCheck(cartId, isCheckedAll);
        dispatch(slice.actions.onToggleSuccess({
            _id: res._id,
            isCheckedAll
        }));
    } catch (error) {
        console.log(error);
    }
};

export const updateQuantity = params => async dispatch => {
    try {
        const { cartId, amount, volatility } = params;
        const res = await cartApi.updateQuantity(cartId, amount, volatility);
        dispatch(slice.actions.updateQuantitySuccess({
            _id: res._id,
            newAmount: res.newQuantity
        }))
    } catch (error) {
        console.log(error);
    }
};

export const addCart = params => async dispatch => {
    try {
        const { productId, quantity } = params;
        const res = await cartApi.addCart(productId, quantity);
        if (res.status === statusText.ERROR) {
            dispatch(initSnackbar({
                isOpen: true,
                type: null,
                message: res.message
            }));
            return;
        }
        dispatch(slice.actions.addCartSuccess({
            item: res.item,
            quantity: res.quantity
        }));
        dispatch(initSnackbar({
            isOpen: true,
            type: 'success',
            message: res.message
        }));
    } catch (error) {
        console.log(error);
    }
};

export const removeCart = cartId => async dispatch => {
    try {
        const res = await cartApi.removeCart(cartId);
        dispatch(slice.actions.removeCartSuccess(res._id));
    } catch (error) {
        console.log(error);
    }
};