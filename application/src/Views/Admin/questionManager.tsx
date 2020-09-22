import React, { useEffect } from 'react';
import { QuestionList } from './Components/questionList';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setQuestions, setIsNewQuestion, clearForm, refreshAddQuestionComponent } from '../../Store/Questions/questionsSlice';
import { IQuestion } from '../../Interfaces/interface';
import { Button, AppBar, Tab, Tabs } from '@material-ui/core';
import fetchQuestionData from '../../Utility/questionUtils';
import { toggle } from '../../Store/Toggles/toggleSlice';
import { useParams } from 'react-router-dom';

export const QuestionManager = () => 
{  
    const dispatch = useDispatch();

    return(
        <>
          <AppBar position="static">
            <Tabs>
              <Button color="inherit"
                onClick={() =>
{                 dispatch(
                    toggle(
                      {
                        field : "dialog1",
                        value: true
                      }
                    )
                  );
                  dispatch(
                    toggle(
                      {
                        field : "questionList",
                        value: false
                      }
                    )
                  );
                    dispatch(setIsNewQuestion(true)); 
                    dispatch(clearForm());
                    dispatch(refreshAddQuestionComponent(true));
            }

            }
          >Lisää kysymys</Button>
          <Button>Esikatsele</Button>
          </Tabs>
          </AppBar>

          <QuestionList />
        {/* // <QuestionForm></QuestionForm> */}
        {/* Add new question */}
        {/* Edit/Delete/Deactivate? question */}
        </>
    )
}