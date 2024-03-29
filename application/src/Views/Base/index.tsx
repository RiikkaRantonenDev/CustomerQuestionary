import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/rootReducer';
import axios from 'axios';
import {IForecast, setForecast} from '../../Store/forecast/forecastSlice';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { LoginPage } from '../Admin/LoginPage';
import {QuestionnaireForm} from '../Questionnaire/QuestionnaireForm/index'
import { EditForm } from '../Admin/EditForm';
import { ManagementPage as FormManagement } from '../Admin/FormManagement';
import { CreateForm } from '../Admin/Components/CreateForm';
import { Reports } from '../Admin/Raports';

export const Base = () => {
    const dispatch = useDispatch();

    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route path="/form/create" component={CreateForm}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/form/management" component={FormManagement}></Route>
          <Route path="/form/edit/:id" component={EditForm}></Route>
          <Route path="/form/view/:id" component={QuestionnaireForm}></Route>
          <Route path="/form/reports/:id" component={Reports}></Route>

        </Switch>
      </BrowserRouter>

    </>
    );
    
  }