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
import VisibilityIcon from '@material-ui/icons/Visibility';

export const EditForm = () => 
{  
    const dispatch = useDispatch();
    const formsState = useSelector((state: RootState) => state.questionReducer);
    let history = useHistory();

    return(
        <>
          <Navigation></Navigation>
          <Box style={{width: '80%', margin: '5rem'}}>
            <Box style={{backgroundColor: "#DADADA"}}>
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
              >Lisää kysymys
              </Button>
              <Button 
                variant="contained"
                color="primary"
                disabled={formsState.activeForm.questionnaireFormId == "00000000-0000-0000-0000-000000000000" ? true : undefined}
                onClick={() => history.push("/form/view/" + formsState.activeForm.questionnaireFormId)}><VisibilityIcon style={{paddingRight: '0.25rem'}}></VisibilityIcon> Esikatsele
              </Button>
            </Box>
            <QuestionList />
          </Box>
        </>
    )
}