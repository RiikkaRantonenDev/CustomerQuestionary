import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store/rootReducer';
import { Box, Paper, createStyles, makeStyles, Theme, Grid, Radio, Select, FormControlLabel, RadioGroup, TextField, MenuItem } from '@material-ui/core';
import { QuestionType, IQuestion } from '../../../Interfaces/interface';
import { flexbox } from '@material-ui/system';
import { CheckBox } from '@material-ui/icons';
import { FormProvider } from 'react-hook-form';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    questionPaper: {
      padding: theme.spacing(2),
      margin: "1rem",
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

export const Questionnaire = () => {
    const QuestionFormState = useSelector((state: RootState) => state.questionReducer);
    const classes = useStyles();
    return(
        <Box display="flex" flexDirection="column" m={1} p={1} justifyContent="center">
            {QuestionFormState.questions.map(question => 
                <Box width="60%" margin="auto">
                    <Paper className={classes.questionPaper}>
                        <Grid container direction="column">
                            <Grid item style={{borderBottom: "1px solid #DADADA", marginBottom: "0.7rem"}}>
                                <span style={{fontWeight: "normal", fontSize: "15px"}}>
                                    {question.questionText}
                                </span>
                            </Grid>
                            <Grid item>
                                <AnswerOptionField question={question}></AnswerOptionField>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>)
            }
        </Box>
    )};


interface IAnswerOptionFieldProps {
    question: IQuestion
}

const AnswerOptionField = (props: IAnswerOptionFieldProps) => {
    return(
        <>
            {props.question.questionType == 0 ? 
                <Grid>
                    {props.question.answerOptions.map(answerOption =>
                            <Grid container>
                                <Grid item>
                                    <label>{answerOption.text}</label>
                                </Grid>
                                <Grid item>
                                    <CheckBox></CheckBox>
                                </Grid>
                            </Grid>
                        )}
                </Grid> : <></>}
                {props.question.questionType == 3 ? 
                <Box>
                    <Box>
                        <TextField></TextField>
                    </Box>
                </Box> : <></>}
            {props.question.questionType == 1 ? 
                <Grid container>
                    <RadioGroup>
                        {props.question.answerOptions.map(answerOption =>
                        <Grid item>
                            <Grid container>
                                <Grid item>
                                    <label>{answerOption.text}</label>
                                </Grid>
                                <Grid item>
                                    <Radio value={answerOption.text}></Radio>
                                </Grid>
                            </Grid>
                        </Grid>
                            )}
                    </RadioGroup>
                </Grid> : <></>}
            {props.question.questionType == 2 ? 
            <>
                <Select>
                    {props.question.answerOptions.map(answerOption =>
                        <MenuItem>{answerOption.text}</MenuItem>
                        )}
                </Select></> : <></>}
        </>
    )
}