import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IQuestion } from '../../Interfaces/interface';
/* import {
    lisää tähän interfacet joita steitti käyttää
} from '~/src/Interfaces/test'; */

interface IDialogs {
    field: 
    | "dialog1" | "answerField" | "questionList";
    value: boolean;
}

interface IToggleState {
    // lisää tähän kaikki steitit joita tämä store tarjoaa, nämä käyttävät interfaceja tyyppeinä
    dialog1: boolean;
    answerField: boolean;
    questionList;
}

const initialState: IToggleState = {
    // lisää tähän kaikki steitin initiaalit.
    dialog1: false,
    answerField: false,
    questionList: true
}

const Toggle = createSlice({
    name:'Toggle',
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
        toggle(state, action: PayloadAction<IDialogs>) 
        {
            state[action.payload.field] = action.payload.value;
        } 
    }
});

export const {
    // tähän kaikki exportatut steitit sitten
    toggle
} = Toggle.actions;

export default Toggle.reducer;