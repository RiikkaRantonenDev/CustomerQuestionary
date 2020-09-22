import React, { useEffect } from 'react';
import { QuestionFormList } from './Components/questionFormList';
import axios from 'axios';
import { RootState } from '../../Store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setForms } from '../../Store/Questions/questionsSlice';

export const ManagementPage = () => {
    const FormsState = useSelector((state: RootState) => state.questionReducer);
    const dispatch = useDispatch();


    return(
        <React.Fragment>
            <QuestionFormList></QuestionFormList>
        </React.Fragment>
    )
}