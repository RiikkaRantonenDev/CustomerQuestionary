import React from 'react';
import axios from 'axios';
import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store/rootReducer';
import { useForm } from 'react-hook-form';
import { IForm, IQuestion } from '../../../Interfaces/interface';
import { setQuestionnaireFormProperty } from '../../../Store/Questions/questionsSlice';
import { useHistory } from 'react-router-dom';

const postNewForm = (values: IForm) => {

}

export const CreateNewForm = () => {
    const FormState = useSelector((state: RootState) => state.questionReducer);
    const { handleSubmit, register, errors, getValues, setValue } = useForm<IForm>({defaultValues: FormState.addFormComponent});
    const dispatch = useDispatch();
    let history = useHistory();
    //const classes = useStyles();

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
            history.push("/management");
          })
    }

    return(
        <>
            <Box>
                <Paper>
                    <Grid container direction="column">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid item>
                            <label>Lomakkeen nimi</label>
                            <TextField
                             inputRef={register} 
                             onChange={() => handleFormData("questionnaireName")}name="questionnaireName"></TextField>
                        </Grid>
                        <Grid item>
                            <label>Lomakkeen kuvaus</label>
                            <TextField 
                            inputRef={register}
                            onChange={() => handleFormData("questionnaireDescription")}name="questionnaireDescription"
                            ></TextField>
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