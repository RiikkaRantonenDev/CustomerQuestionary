import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { QuestionType, IQuestion } from '../../../Interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../Store/rootReducer';
import {Add, Delete } from '@material-ui/icons'
import { Box, Radio, TextField, Select, MenuItem, Button, Grid, Icon, FormLabel, Paper, createStyles, makeStyles, Theme, Checkbox } from '@material-ui/core';

import { setAddQuestionComponentProperty, removeAnswerOption, setQuestions, refreshAddQuestionComponent, clearForm } from '../../../Store/Questions/questionsSlice';
import { toggle } from '../../../Store/Toggles/toggleSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type QuestionForm = {
    questionType: QuestionType;
    questionText: string;
    answerOption: string;
    additionalAnswer: boolean;
}

interface IProps {
    showForm: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    backgroundPaper: {
        margin: '5rem'
    },
    formField: {
        marginBottom: '1rem'
    }
  }),
);

export const QuestionForm = () => {
    const QuestionFormState = useSelector((state: RootState) => state.questionReducer);
    const { handleSubmit, register, errors, getValues, setValue } = useForm<IQuestion>({  defaultValues: 
        QuestionFormState.addQuestionComponent
    });
    const toggleState = useSelector((state: RootState) => state.toggleReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const params: { [paramName: string]: string | number | boolean | undefined  } = useParams();

    if (!QuestionFormState.isNewQuestion){
        dispatch(setAddQuestionComponentProperty)
    }

    const onSubmit = (data: QuestionForm) => {
        // TODO: lähetetään formin data
        if(QuestionFormState.isNewQuestion){
        axios({
            method: 'POST',
            url: "https://localhost:44385/questions/" + params.id,
            data: QuestionFormState.addQuestionComponent
          }).then(res => {
            fetchQuestionData();
          });
      }
      else {
        axios({
            method: 'PUT',
            url: "https://localhost:44385/questions/" + QuestionFormState.addQuestionComponent.questionId,
            data: QuestionFormState.addQuestionComponent
          }).then(res => {
            fetchQuestionData();
          });
        }
    }
    
    useEffect(() => {}, [QuestionFormState.addQuestionComponent.questionType])
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(setAddQuestionComponentProperty({key: "questionType", value: event.target.value as number}));
        setValue("questionType", event.target.value as number, {shouldValidate: true});
    };

    const handleQuestionName = () => {
        dispatch(setAddQuestionComponentProperty({key: "questionText", value: getValues("questionText")}));
    }

    const handleHasAdditionalOption = (checked: boolean) => {
        dispatch(setAddQuestionComponentProperty({key: "hasAdditionalOption", value: checked}));
    }

    const saveAnswerOption = () => {
        //console.log(getValues("answers"));
        dispatch(setAddQuestionComponentProperty({key: "answerOptions", value: [...QuestionFormState.addQuestionComponent.answerOptions, { text: getValues("answers"), id: QuestionFormState.addQuestionComponent.answerOptions.length}]}));
    }

    const fetchQuestionData = () => {
        axios({
          method: 'GET',
          //headers: [{key: loginInfo.login.key}],
          url: "https://localhost:44385/questions/" + params.id
        }).then(res => {
            console.log(res.data);
            if(res.data.questions) dispatch(setQuestions(res.data.questions as IQuestion[]))
        })
      }

    useEffect(() => {
        if (QuestionFormState.refreshAddQuestionComponent){
            dispatch(refreshAddQuestionComponent(false));
        }
    }, [QuestionFormState.refreshAddQuestionComponent]);

    return(
        (QuestionFormState.refreshAddQuestionComponent ? <Box></Box> : 
        <Box style={{padding: "1rem"}}>
            <Grid   container
                    direction="column"
                    justify="flex-start"
                    >
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column" className={classes.formField}>
                    <Grid item>
                        <FormLabel style={{fontWeight: "bold"}}>Kysymyksen teksti</FormLabel>
                    </Grid>
                    <Grid item>
                        <TextField
                            name="questionText"
                            id="questionText"
                            placeholder="Kysymys"
                            value={QuestionFormState.addQuestionComponent.questionText}
                            onChange={handleQuestionName}
                            helperText="Tämä näkyy lomakkeella kysymyksen tekstinä."
                            inputRef={register}
                        />
                    </Grid>
                </Grid>
                <Grid container direction="column" className={classes.formField}>
                    <Grid item>
                        <FormLabel>Vastaustyyppi</FormLabel>
                    </Grid>
                    <Grid item>
                        <Select
                            name="questionType"
                            value={QuestionFormState.addQuestionComponent.questionType}
                            inputRef={register}
                            onChange={handleChange}
                            autoWidth={true}
                        >
                            <MenuItem value={QuestionType.textField}>Tekstikenttä</MenuItem>
                            <MenuItem value={QuestionType.textBox}>Tekstilaatikko</MenuItem>
                            <MenuItem value={QuestionType.checkbox}>Monivalinta</MenuItem>
                            <MenuItem value={QuestionType.radio}>Radio</MenuItem>
                            <MenuItem value={QuestionType.dropdown}>Alasvetolaatikko</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                {(QuestionFormState.addQuestionComponent.questionType > 1) ? <></> : 
                <Grid container direction="column" className={classes.formField}>
                    <Grid item>
                        <FormLabel>Vastausvaihtoehdot</FormLabel>
                    </Grid>
                    <Grid container direction="column">
                            {QuestionFormState.addQuestionComponent.answerOptions.map((answerOption) => <AnswerOption id={answerOption.id} text={answerOption.text} />)}
                    </Grid>
                    <Grid style={{display: toggleState.answerField ? "block" : "none"}}>
                        <TextField
                            name="answers"
                            inputRef={register}
                        />
                        <Button onClick={saveAnswerOption}>Tallenna</Button>

                    </Grid>
                    <Button type="button" variant="outlined" onClick={() =>{
                        dispatch(
                            toggle(
                            {
                                field : "answerField",
                                value: true
                            }
                            )
                        );
                    }
                    }><Add></Add>Lisää uusi vaihtoehto</Button>
                </Grid>
                }
                <Grid item>
                    <Checkbox name="hasAdditionalOption" value={QuestionFormState.addQuestionComponent.hasAdditionalOption} onChange={e => {handleHasAdditionalOption(e.target.checked)}}></Checkbox>Valinnainen vastaus
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary">Tallenna kysymys</Button>
                    <Button variant="contained" onClick={() => {dispatch(
                                            toggle(
                                            {field: "questionList", value: true}
                                            )
                                        );
                                        dispatch(
                                            toggle(
                                            {field: "dialog1", value: false}
                                            )
                                        );
                                        }}>Peruuta ja sulje</Button>
                </Grid>
            </form>
  </Grid>
        </Box>)
    )
}

interface IAnswerOption {
    id: number;
    text: string;
}

const AnswerOption = (props : IAnswerOption) => {
    const dispatch = useDispatch();
    const QuestionFormState = useSelector((state: RootState) => state.questionReducer);
    return(
        <Grid container direction="row" justify="flex-start" style={{paddingTop: '1rem'}} spacing={3}>
            <Grid item>
                <span style={{paddingRight: '0.5rem'}}>{props.text}</span>
            </Grid>
            <Grid item>
                <Button onClick={() => dispatch(removeAnswerOption(props.id))}><Delete/></Button>
            </Grid>
            <Grid item>
                <Button>Muokkaa</Button>
            </Grid>
        </Grid>

    )
}