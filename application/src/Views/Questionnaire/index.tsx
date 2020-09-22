import React, { useEffect } from 'react';
import { Questionnaire } from './Components/questionnaire';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../../Store/Questions/questionsSlice';
import { IQuestion } from '../../Interfaces/interface';
import { Box } from '@material-ui/core';

export const QuestionnaireMain = () => {
    const dispatch = useDispatch();

    const fetchQuestionData = () => {
        axios({
          method: 'GET',
          //headers: [{key: loginInfo.login.key}],
          url: "https://localhost:44385/questions"
        }).then(res => {
          dispatch(setQuestions(res.data as IQuestion[]))
        })
      }
    useEffect(() => {
        fetchQuestionData();
      }, []);

    return(
        <div style={{ width: '100%' }}>
            <p>Tänne loppukäyttäjän näkemä kysymysnäkymä. Mene /admin muokataksesi tai lisätäksesi kysymyksiä</p>
            <Questionnaire></Questionnaire>
        </div>
    )
}