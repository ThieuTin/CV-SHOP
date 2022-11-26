import { combineReducers } from 'redux';

// slices
import snackbarReducer from './slices/snackbar';

const rootReducer = combineReducers({
    snackbar: snackbarReducer
});

export { rootReducer };
