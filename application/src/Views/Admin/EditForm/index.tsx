import React, { useEffect } from 'react';
import { QuestionList } from '../Components/FormQuestion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setQuestions, setIsNewQuestion, clearForm, refreshAddQuestionComponent } from '../../../Store/Questions/questionsSlice';
import { IQuestion } from '../../../Interfaces/interface';
import { Button, AppBar, Tab, Tabs, Breadcrumbs, Link, Box } from '@material-ui/core';
import fetchQuestionData from '../../../Utility/questionUtils';
import { toggle } from '../../../Store/Toggles/toggleSlice';
import { useHistory, useParams } from 'react-router-dom';
import { Navigation } from '../Components/Navigation';
import { RootState } from '../../../Store/rootReducer';

export const EditForm = () => 
{  
    const dispatch = useDispatch();
    const formsState = useSelector((state: RootState) => state.questionReducer);
    let history = useHistory();

    return(
        <>
          <Navigation></Navigation>
          <Box>
          <Box style={{margin: "0rem 5rem 0rem 5rem", backgroundColor: "#DADADA", padding: "1rem"}}>
          <Button variant="contained" color="primary"
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
          <Button variant="contained"
            disabled={formsState.activeForm.questionnaireFormId == "00000000-0000-0000-0000-000000000000" ? true : undefined}
            onClick={() => history.push("/form/view/" + formsState.activeForm.questionnaireFormId)}>Esikatsele</Button>
          </Box>
          <QuestionList />
          </Box>
        </>
    )
}