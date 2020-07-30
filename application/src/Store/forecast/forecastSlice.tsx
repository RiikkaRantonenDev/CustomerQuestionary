import {createSlice, PayloadAction} from '@reduxjs/toolkit';
/* import {
    lisää tähän interfacet joita steitti käyttää
} from '~/src/Interfaces/test'; */

export interface IForecast{
    Date: String;
    TemperatureC: number;
    TemperatureF: number;
    Summary: String;
  }

export interface ForecastState {
    // lisää tähän kaikki steitit joita tämä store tarjoaa, nämä käyttävät interfaceja tyyppeinä
    forecasts: IForecast[]
}

const initialState: ForecastState = {
    // lisää tähän kaikki steitin initiaalit.
    forecasts: []
}

const Forecast = createSlice({
    name:'Forecast',
    initialState,
    reducers: {
        // tähän tulee reduserit joilla voidaan mutatoida ja hakea steitin arvoja.
        // esim:
/*         setTest(state, action: PayloadAction<Test>) 
        {
            const payload = action.payload;
            const entries = Object.entries(payload);
            
            for (const [key, value] of entries)
            {
                state.test.arvo[key] = value;
            }
        }, */
        setForecast(state, action: PayloadAction<IForecast[]>) 
        {
            const payload = action.payload;
            state.forecasts = payload;
        } 
    }
});

export const {
    // tähän kaikki exportatut steitit sitten
    setForecast
} = Forecast.actions;

export default Forecast.reducer;