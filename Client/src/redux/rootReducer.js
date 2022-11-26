import { combineReducers } from 'redux';

// slices
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import snackbarReducer from './slices/snackbar';
import dialogReducer from './slices/dialog';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    snackbar: snackbarReducer,
    dialog: dialogReducer
});

export { rootReducer };
