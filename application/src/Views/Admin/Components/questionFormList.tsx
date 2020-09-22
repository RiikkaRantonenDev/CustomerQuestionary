import React, { useEffect, useState } from 'react'
import { Typography, AccordionDetails, Accordion, AccordionSummary, makeStyles, createStyles, Theme, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { QuestionForm } from './questionForm';
import { toggle } from '../../../Store/Toggles/toggleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/rootReducer';
import { useHistory } from 'react-router-dom';
import { setForms } from '../../../Store/Questions/questionsSlice';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
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
          dispatch(setForms(res.data))
        })
  }


    return (
      <div className={classes.root}>
        <Button onClick={() =>{ history.push("/createForm");}}>Luo uusi kyselylomake</Button>
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
              {form.questions?.map(question => <p>{question.questionText}</p>)}
              <Button onClick={() => history.push("/edit/" + form.questionnaireFormId)}>Muokkaa</Button>
              <Button>Poista</Button>
            </Typography>
          </AccordionDetails>
        </Accordion>)}
      </div>
    );
}