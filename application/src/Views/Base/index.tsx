import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/rootReducer';
import axios from 'axios';
import {IForecast, setForecast} from '../../Store/forecast/forecastSlice';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AdminMain } from '../Admin';
import {QuestionnaireMain} from './../Questionnaire/index'
import { QuestionManager } from '../Admin/questionManager';
import { ManagementPage } from '../Admin/management';
import { CreateNewForm } from '../Admin/Components/createNewForm';

export const Base = () => {
    const dispatch = useDispatch();

    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route path="/createForm" component={CreateNewForm}></Route>
          <Route path="/admin" component={AdminMain}></Route>
          <Route path="/management" component={ManagementPage}></Route>
          <Route path="/edit/:id" component={QuestionManager}></Route>
          <Route path="/" component={QuestionnaireMain}></Route>

        </Switch>
      </BrowserRouter>

    </>
    );
    
  }