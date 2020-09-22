import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './Login/loginSlice';
import questionReducer from './Questions/questionsSlice';
import toggleReducer from './Toggles/toggleSlice';

const rootReducer = combineReducers({
    loginReducer,
    questionReducer,
    toggleReducer
    // tähän lisätään sitten redusereita kun niitä luodaan.
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;