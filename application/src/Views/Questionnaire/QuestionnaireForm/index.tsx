import React, { useEffect } from 'react';
import { Questionnaire } from '../Components/Questionnaire';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setActiveForm, setQuestions } from '../../../Store/Questions/questionsSlice';
import { IQuestion } from '../../../Interfaces/interface';
import { Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';

export const QuestionnaireForm = () => {
    const dispatch = useDispatch();
    const params: { [paramName: string]: string | number | boolean | undefined  } = useParams();

    const fetchQuestionData = () => {
        axios({
          method: 'GET',
          //headers: [{key: loginInfo.login.key}],
          url: "https://localhost:44385/questions/" + params.id
        }).then(res => {
          dispatch(setActiveForm(
            {questionnaireFormId: params.id as string,
            questionnaireName: "",questionnaireDescription: ""}
          ));
          dispatch(setQuestions(res.data.questions as IQuestion[]))
        })
      }
    useEffect(() => {
        fetchQuestionData();
      }, []);

    return(
        <div style={{ width: '100%' }}>
            <Questionnaire></Questionnaire>
        </div>
    )
}