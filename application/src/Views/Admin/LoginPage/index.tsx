// Tehdään kirjautumisikkuna, josta siirrytään lomakkeen hallintaan
import React, { HtmlHTMLAttributes, useEffect } from 'react';
import {Link, Router, Switch, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../Store/rootReducer';
import { TextField, Button, Box, Grid } from '@material-ui/core';
import { setLogin, ILogin } from '../../../Store/Login/loginSlice';
import axios from 'axios';
import { ILoginResponse } from '../../../Interfaces/interface';

interface LoginRequest {
    key: string;
}

export const LoginPage = () => {
    const { handleSubmit, register, errors, getValues } = useForm<LoginRequest>();

    let history = useHistory();
    const loginState = useSelector((state: RootState) => state.loginReducer);
    const dispatch = useDispatch();

    useEffect(() =>{
    }, [loginState.login.key])

    const onSubmit = (values: LoginRequest) =>
    { 
            axios({
              method: 'POST',
              //headers: {    'Content-Type': 'text/plain'},
              
              url: 'https://localhost:44385/login',
              data:values
            }).then(res => {
                console.log(res);
                const joo = res.data as ILoginResponse;
                if (res.data.result) 
                {
                    dispatch(setLogin({key: values.key}));
                    history.push("/form/management");
                }
                else {
                    alert("APIkey väärin")
                }
            })
    };

    return(
        <Box style={{position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-50px"
        //width: "100px",
        //height: "100px"
    }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" >
                <Grid item>
                    <TextField
                        name={"key"}
                        inputRef={register({
                        required: "Required",
                        })}
                    ></TextField>
                </Grid>
                <Grid item>
                    <Button type="submit" variant={"outlined"}>Submit</Button>
                </Grid>
            </Grid>
            </form>
        </Box>
    )
}