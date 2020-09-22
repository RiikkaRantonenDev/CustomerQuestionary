// Tehdään kirjautumisikkuna, josta siirrytään lomakkeen hallintaan
import React, { HtmlHTMLAttributes, useEffect } from 'react';
import {Link, Router, Switch, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/rootReducer';
import { TextField, Button, Box } from '@material-ui/core';
import { setLogin, ILogin } from '../../Store/Login/loginSlice';
import axios from 'axios';
import { ILoginResponse } from '../../Interfaces/interface';

interface LoginRequest {
    key: string;
}

export const AdminMain = () => {
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
                    history.push("/management");
                }
                else {
                    alert("APIkey väärin")
                }
            })
    };

    return(
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                name={"key"}
                inputRef={register({
                required: "Required",
                })}
            ></TextField>
            <Button type="submit" variant={"outlined"}>Submit</Button>
            </form>
        </Box>
    )
}