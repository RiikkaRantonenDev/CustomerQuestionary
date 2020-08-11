import {createSlice, PayloadAction} from '@reduxjs/toolkit';
/* import {
    lisää tähän interfacet joita steitti käyttää
} from '~/src/Interfaces/test'; */

export interface ILogin{
    key: string;
  }

export interface LoginState {
    // lisää tähän kaikki steitit joita tämä store tarjoaa, nämä käyttävät interfaceja tyyppeinä
    login: ILogin;
}

const initialState: LoginState = {
    // lisää tähän kaikki steitin initiaalit.
    login: {
        key: ""
    }
}

const Login = createSlice({
    name:'Login',
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
        setLogin(state, action: PayloadAction<ILogin>) 
        {
            const payload = action.payload;
            state.login = payload;
        } 
    }
});

export const {
    // tähän kaikki exportatut steitit sitten
    setLogin
} = Login.actions;

export default Login.reducer;