import {createSlice, PayloadAction} from '@reduxjs/toolkit';
/* import {
    lisää tähän interfacet joita steitti käyttää
} from '~/src/Interfaces/test'; */

interface Test {
    arvo: string
}

export interface TestState {
    // lisää tähän kaikki steitit joita tämä store tarjoaa, nämä käyttävät interfaceja tyyppeinä
    test: Test
}

const initialState: TestState = {
    // lisää tähän kaikki steitin initiaalit.
    test: {
        arvo: 'Olen tyhjä arvo'
    }
}

const Test = createSlice({
    name:'Test',
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
        setTest(state, action: PayloadAction<Test>) 
        {
            const payload = action.payload;
            state.test.arvo = payload.arvo;
        } 
    }
});

export const {
    // tähän kaikki exportatut steitit sitten
    setTest
} = Test.actions;

export default Test.reducer;