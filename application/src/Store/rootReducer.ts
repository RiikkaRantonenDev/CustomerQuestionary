import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './Login/loginSlice';

const rootReducer = combineReducers({
    loginReducer
    // tähän lisätään sitten redusereita kun niitä luodaan.
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;