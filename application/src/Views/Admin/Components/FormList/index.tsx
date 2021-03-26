import React, { useEffect, useState } from 'react'
import { Typography, AccordionDetails, Accordion, AccordionSummary, makeStyles, createStyles, Theme, Button, Box, Grid, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { QuestionForm } from '../AddOrUpdateFormQuestion';
import { toggle } from '../../../../Store/Toggles/toggleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';
import { useHistory } from 'react-router-dom';
import { setActiveForm, setAddQuestionnaireForm, setForms } from '../../../../Store/Questions/questionsSlice';
import axios from 'axios';
import { QuestionType } from '../../../../Interfaces/interface';
import { Add } from '@material-ui/icons';
import { CreateForm } from '../CreateForm';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //width: '100%',
      margin: '5rem',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      fontWeight: "bolder"
    },
    backgroundPaper: {

      //padding: '0.5rem 0.5rem 1.5rem 0.5rem'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    questionnaireQuestionText: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      fontStyle: "italic"
    },
    questionnaireQuestionTextBold: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      fontStyle: "italic",
      fontWeight: "bold"
    }
  }),
);
export const QuestionFormList = () => {
    const FormsState = useSelector((state: RootState) => state.questionReducer);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const dispatch = useDispatch();
    const toggleState = useSelector((state: RootState) => state.toggleReducer);
    let history = useHistory();
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
      getQuestionnaireForms();
     }, [])

    const getQuestionnaireForms = () => {
      axios({
          method: 'GET',
          url: "https://localhost:44385/questionnaireForm"
        }).then(res => {
          console.log(res.data);
          dispatch(setForms(res.data))
        })
  }

  const deleteQuestionnaireForm = (questionnaireFormId: string) => {
    axios({
      method: 'DELETE',
      url: "https://localhost:44385/questionnaireForm/" + questionnaireFormId
    }).then(res => {
      getQuestionnaireForms();
    })
  }

    return (
      <Box className={classes.root}>
        <Paper className={classes.backgroundPaper}>
        <Button 
          variant="contained" 
          style={{width: "100%"}}
          color="primary" 
          onClick={() => dispatch(toggle(
            {
              field : "createForm",
              value: true
            }
          ))}>
            <Add/>
            Luo uusi kyselylomake
        </Button>
        <CreateForm></CreateForm>
        {FormsState.forms.map(form =>         
        <Accordion expanded={expanded === form.questionnaireFormId} onChange={handleChange(form.questionnaireFormId)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{form.questionnaireName}</Typography><br></br>
            <Typography className={classes.secondaryHeading}>{form.questionnaireDescription}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {form.questions?.map(question => 
              <Box style={{padding: "0.5rem 0.5rem 0.75rem 0.5rem"}}>
                <Grid container direction={"column"}>
                  <Grid item>
                    <span>{question.orderId == 0 ? "" : question.orderId}</span>
                    <span className={classes.questionnaireQuestionTextBold}>{question.questionText}</span>
                  </Grid>
                  <Grid item>
                    <span className={classes.questionnaireQuestionText}>Kysymystyyppi:{QuestionType[question.questionType]}</span>
                  </Grid>
                  <Grid item>
                    <Grid container direction={"row"}>
                      <Grid item>
                        <span className={classes.questionnaireQuestionText}>Vaihtoehdot:</span>
                      </Grid>
                      <Grid item>
                        <Grid container direction={"column"}>
                          
                        {question.answerOptions ? question.answerOptions.map(option =>
                            <Grid item><span className={classes.questionnaireQuestionText}>{option.text}</span></Grid>) : ""}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              )}
              <Button onClick={() =>{
                dispatch(setActiveForm(form));
                history.push("/form/edit/" + form.questionnaireFormId);}}>Muokkaa</Button>
              <Button onClick={() => history.push("/form/view/" + form.questionnaireFormId)}>Esikatsele</Button>
              <Button onClick={() => history.push("/form/reports/" + form.questionnaireFormId)}>Tulokset</Button>
              <Button onClick={() => deleteQuestionnaireForm(form.questionnaireFormId)}>Poista</Button>
            </Typography>
          </AccordionDetails>
        </Accordion>)}
        </Paper>
      </Box>
    );
}