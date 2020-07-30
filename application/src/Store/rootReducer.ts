import { combineReducers } from '@reduxjs/toolkit';
import forecastReducer from './forecast/forecastSlice';

const rootReducer = combineReducers({
    forecastReducer
    // tähän lisätään sitten redusereita kun niitä luodaan.
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;