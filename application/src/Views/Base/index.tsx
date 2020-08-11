import React from 'react';
import { Button, Box, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/rootReducer';
import axios from 'axios';
import {IForecast, setForecast} from '../../Store/forecast/forecastSlice';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AdminMain } from '../Admin';
import {QuestionnaireMain} from './../Questionnaire/index'
import { QuestionManager } from '../Admin/questionManager';

export const Base = () => {
    const forecast = useSelector((state: RootState) => state.loginReducer);
    const dispatch = useDispatch();

    const getData = () => {
      axios({
        method: 'GET',
        url: "https://localhost:44385/weatherforecast"
      }).then(res => {
        const joo = res.data as IForecast[];
        dispatch(setForecast(joo));
      })
    }

    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={AdminMain}></Route>
          <Route path="/admin/management" component={QuestionManager}></Route>
          <Route path="/" component={QuestionnaireMain}></Route>
        </Switch>
      </BrowserRouter>
    </>
    );
    
  }