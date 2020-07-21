import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';

export type AppDispatch = typeof Store.dispatch;
export type ThunkResult<R> = ThunkAction<RootState, RootState, undefined, Action<String>>;
export type AppThunk = ThunkAction<void, RootState, null, Action<String>>;

const Store = configureStore({
    reducer: rootReducer,
});

export default Store;
