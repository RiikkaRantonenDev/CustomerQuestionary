import {createSlice, PayloadAction} from '@reduxjs/toolkit';
/* import {
    lisää tähän interfacet joita steitti käyttää
} from '~/src/Interfaces/test'; */

export interface TestState {
    // lisää tähän kaikki steitit joita tämä store tarjoaa, nämä käyttävät interfaceja tyyppeinä
}

const initialState: TestState = {
    // lisää tähän kaikki steitin initiaalit.
}

const Test = createSlice({
    name:'Test',
    initialState,
    reducers: {
        // tähän tulee reduserit joilla voidaan mutatoida ja hakea steitin arvoja.
        // esim:
        /* setTest(state, action: PayloadAction<TestRequest>) 
        {
            const payload = action.payload;
            const entries = Object.entries(payload);

            for (const [key, value] of entries)
            {
                state.jokin[key] = value;
            }
        } */
    }
});

export const {
    // tähän kaikki exportatut steitit sitten
    // esim. setTest
} = Test.actions;

export default Test.reducer;