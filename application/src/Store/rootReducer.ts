import { combineReducers } from './node_modules/@reduxjs/toolkit';
import testReducer from './test/testSlice';

const rootReducer = combineReducers({
    testReducer
    // tähän lisätään sitten redusereita kun niitä luodaan.
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;