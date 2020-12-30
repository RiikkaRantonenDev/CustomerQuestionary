import React from 'react';
import axios from 'axios';
import { Box, Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';
import { useForm } from 'react-hook-form';
import { IForm, IQuestion } from '../../../../Interfaces/interface';
import { setQuestionnaireFormProperty } from '../../../../Store/Questions/questionsSlice';
import { useHistory } from 'react-router-dom';
import { Navigation } from '../Navigation';

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

export const CreateForm = () => {
    const FormState = useSelector((state: RootState) => state.questionReducer);
    const { handleSubmit, register, errors, getValues, setValue } = useForm<IForm>({defaultValues: FormState.addFormComponent});
    const dispatch = useDispatch();
    const styles = useStyles();
    let history = useHistory();

    const handleFormData = (attr: string) => {
        dispatch(setQuestionnaireFormProperty({key: attr, value: [getValues(attr)]}));
    }

    const onSubmit = (values : IForm) => {
        axios({
            method: 'POST',
            url: "https://localhost:44385/questionnaireForm",
            data: values
          }).then(res => { 
            console.log(values);
            history.push("/form/management");
          })
    }

    return(
        <>
            <Navigation currentPage="Luo lomake"></Navigation>
            <Box>
                <Paper className={styles.backgroundPaper}>
                    <Grid container direction="column">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
                            <Grid item>
                                <label>Lomakkeen nimi</label>
                            </Grid>
                            <Grid item>
                            <TextField
                                inputRef={register} 
                                onChange={() => handleFormData("questionnaireName")}name="questionnaireName"></TextField>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <label>Lomakkeen kuvaus</label>
                            </Grid>
                            <Grid item>
                                <TextField 
                                    inputRef={register}
                                    onChange={() => handleFormData("questionnaireDescription")}name="questionnaireDescription"
                                ></TextField>
                            </Grid>

                        </Grid>
                        <Grid item>
                                <Button type="submit">Tallenna</Button>
                        </Grid>
                    </form>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}