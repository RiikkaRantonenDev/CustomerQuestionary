import React from 'react';
import axios from 'axios';
import { Box, Button, createStyles, Grid, makeStyles, Modal, Paper, TextField, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';
import { useForm } from 'react-hook-form';
import { IForm, IQuestion } from '../../../../Interfaces/interface';
import { setQuestionnaireFormProperty } from '../../../../Store/Questions/questionsSlice';
import { useHistory } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { toggle } from '../../../../Store/Toggles/toggleSlice';
import classes from '*.module.css';

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
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
  }),
);

export const CreateForm = () => {
    const FormState = useSelector((state: RootState) => state.questionReducer);
    const ToggleState = useSelector((state: RootState) => state.toggleReducer);
    const { handleSubmit, register, errors, getValues, setValue } = useForm<IForm>({defaultValues: FormState.addFormComponent});
    const dispatch = useDispatch();
    const styles = useStyles();
    let history = useHistory();

    const handleFormData = (attr: string) => {
        dispatch(setQuestionnaireFormProperty({key: attr, value: [getValues(attr)]}));
    }

    const onSubmit = (values : IForm) => {

        // Close modal.
        dispatch(toggle(
          {
            field : "createForm",
            value: false
          }
        ));

        // Post created form. Returns bool result and formGuid.
        axios({
            method: 'POST',
            url: "https://localhost:44385/questionnaireForm",
            data: values
          }).then(res => {
            history.push("/form/edit/" + res.data.formGuid);
        })
    }

    return(
            <Modal
            className={styles.modal}
            open={ToggleState.createForm}
            onClose={ () => dispatch(toggle(
                {
                  field : "createForm",
                  value: false
                }
              ))}>
                <Paper style={{padding: '1rem'}} className={styles.backgroundPaper}>
                    <Grid container direction="column">
                      <h2>Lomakkeen luonti</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container direction={'column'} style={{padding: '1rem 0 1rem 0'}}>
                            <Grid item>
                                <label>Lomakkeen nimi</label>
                            </Grid>
                            <Grid item>
                              <TextField
                                inputRef={register} 
                                onChange={() => handleFormData("questionnaireName")}name="questionnaireName"></TextField>
                            </Grid>
                        </Grid>
                        <Grid container direction={'column'} style={{padding: '1rem 0 1rem 0'}}>
                            <Grid item>
                                <label>Lomakkeen kuvaus</label>
                            </Grid>
                            <Grid item>
                                <TextField 
                                    inputRef={register}
                                    onChange={() => {
                                        handleFormData("questionnaireDescription");
                                        dispatch(toggle(
                                          {
                                            field : "createForm",
                                            value: false
                                          }
                                        ))
                                    }}name="questionnaireDescription"
                                ></TextField>
                            </Grid>

                        </Grid>
                        <Grid item>
                          <Button type="submit">Tallenna</Button>
                          <Button type="button" onClick={() => dispatch(toggle(
                          {
                            field : "createForm",
                            value: false
                          }
                         ))
                          }>Peruuta ja sulje</Button>
                        </Grid>
                    </form>
                    </Grid>
                </Paper>
            </Modal>
        
    )
}