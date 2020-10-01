import React, { useEffect } from 'react';
import { QuestionFormList } from '../Components/FormList';
import axios from 'axios';
import { RootState } from '../../../Store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setForms } from '../../../Store/Questions/questionsSlice';
import { AppBar, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Navigation } from '../Components/Navigation';

export const ManagementPage = () => {
    const FormsState = useSelector((state: RootState) => state.questionReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    return(
        <React.Fragment>
          <Navigation></Navigation>
            <Button variant="contained" color="primary" onClick={() =>{ history.push("/form/create");}}>Luo uusi kyselylomake</Button>
            <QuestionFormList></QuestionFormList>

        </React.Fragment>
    )
}