import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';
import { Box, Grid, Paper, makeStyles, Theme, createStyles, Button, TextField } from '@material-ui/core';
import { QuestionForm } from '../AddOrUpdateFormQuestion';
import { toggle } from '../../../../Store/Toggles/toggleSlice';
import axios from 'axios';
import { IForm, IQuestion, QuestionType } from '../../../../Interfaces/interface';
import { setQuestions, setIsNewQuestion, setAddQuestionComponentProperty, setAddQuestionComponent, clearForm, refreshAddQuestionComponent } from '../../../../Store/Questions/questionsSlice';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      //textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    backgroundPaper: {
        margin: '5rem',
        padding: '0.5rem 0.5rem 1.5rem 0.5rem'
    },
    fieldHeader: {
        fontWeight: "bold"
    }
  }),
);

export const QuestionList = () => {
    const questionState = useSelector((state: RootState) => state.questionReducer);
    const loginInfo = useSelector((state: RootState) => state.loginReducer);
    const classes = useStyles();
    const dispatch = useDispatch();
    const toggleState = useSelector((state: RootState) => state.toggleReducer);
    const params: { [paramName: string]: string | number | boolean | undefined  } = useParams();

    useEffect(() => {
      if (params.id) {
        fetchQuestionData(params.id as string);
      }
    }, [params])

    const fetchQuestionData = (id : string) => {
      axios({
        method: 'GET',
        //headers: [{key: loginInfo.login.key}],
        url: "https://localhost:44385/questions/" + id
      }).then(res => {
        console.log(res.data.questions);
        if(res.data.questions) dispatch(setQuestions(res.data.questions as IQuestion[]))
      })
    }

    function deleteQuestion (question:IQuestion) {
      console.log(question.questionId);
      axios({
        method: 'DELETE',
        url: 'https://localhost:44385/questions/' + params.id?.toString() + "/" + question.questionId
      }).then(res => {
        fetchQuestionData(params.id as string);
      })
    }

    function addAnswerOptions(question: IQuestion) {
      if (question.answerOptions !== null) {
      return( 
        <>
        <ul style={{margin: "0"}}>
        {question.answerOptions.map(answer =>
           <li>
             {answer.text}
          </li>
          )
        }
      </ul>
      </>
      )}
    }

    return(
        <Box>
          <Paper className={classes.backgroundPaper} style={{display: toggleState.dialog1 ? "block" : "none"}}>
            <QuestionForm></QuestionForm>
          </Paper>
            <Paper className={classes.backgroundPaper} style={{display: toggleState.questionList ? "block" : "none"}}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                  {console.log(questionState.questions)}
                  {questionState.questions.map((question) =>  
                <Grid
                container
                direction="column"
                justify="flex-start"
                //alignItems="center"
                style={{borderBottom: "1px solid gray", padding: "1rem"}}
                xs={12}
                >
                  <Grid item xs={12}>
                    <Box className={classes.paper}>
                      <Box>
                        <span className={classes.fieldHeader}>Kysymyksen teksti</span>
                      </Box>
                      <Box>
                        {question.questionText}
                      </Box>
                    </Box>

                    <Box className={classes.paper}>
                      <Box><span className={classes.fieldHeader}>Tyyppi</span></Box> 
                      <Box>{QuestionType[question.questionType]}</Box>
                    </Box>
                    <Box className={classes.paper}>
                    <span className={classes.fieldHeader}>Vastausvaihtoehdot</span>
                    </Box>
                    {addAnswerOptions(question)} 
                    <Box className={classes.paper}>
                      <Box>
                        <span className={classes.fieldHeader}>Valinnainen vastaus:</span>
                      </Box>
                      <Box>
                         {question.hasAdditionalOption ? "Kyllä" : "Ei"}
                      </Box>
                    </Box>
                    <Box className={classes.paper}>
                      <Box>
                        <span className={classes.fieldHeader}>Pakollinen:</span>
                      </Box>
                      <Box>
                         {question.required ? "Kyllä" : "Ei"}
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} style={{backgroundColor: "##bccdd4"}}>
                    <Grid container direction="row" justify="flex-end" alignItems="center" >
                      <Grid item>
                        <Box className={classes.paper}><Button variant="outlined" color="primary" onClick={() => deleteQuestion(question)}>Poista</Button></Box>
                      </Grid>
                      <Grid item>
                        <Box className={classes.paper}>
                          <Button variant="outlined" color="secondary" onClick={() =>
                          {dispatch(toggle(
                            {
                              field : "dialog1",
                              value: true
                            }
                          ));
                          dispatch(toggle(
                            {
                              field : "questionList",
                              value: false
                            }
                          ));
                          dispatch(setIsNewQuestion(false));
                          dispatch(setAddQuestionComponent(question));
                          dispatch(refreshAddQuestionComponent(true));
                          }
                          }>Muokkaa</Button></Box>
                        </Grid>
            </Grid>
                  </Grid>
                  
                </Grid>
                  )
                  }
                </Grid>
                
            </Paper>
        </Box>
    )
}