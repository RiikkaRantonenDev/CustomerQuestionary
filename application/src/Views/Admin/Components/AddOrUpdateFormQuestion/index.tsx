import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { QuestionType, IQuestion, IAnswerOption } from '../../../../Interfaces/interface';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';
import {Add, Delete } from '@material-ui/icons'
import { Box, Radio, TextField, Select, MenuItem, Button, Grid, Icon, FormLabel, Paper, createStyles, makeStyles, Theme, Checkbox } from '@material-ui/core';

import { setAddQuestionComponentProperty, removeAnswerOption, setQuestions, refreshAddQuestionComponent, clearForm, setEditAnswerOption, setAddQuestionComponent, setUpdateAnswerOption, removeAnswerOptions } from '../../../../Store/Questions/questionsSlice';
import { toggle } from '../../../../Store/Toggles/toggleSlice';
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
    const { handleSubmit, register, errors, getValues, setValue, trigger } = useForm<IQuestion>({  defaultValues: 
        QuestionFormState.addQuestionComponent
    });
    const toggleState = useSelector((state: RootState) => state.toggleReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const params: { [paramName: string]: string | number | boolean | undefined  } = useParams();

    // TODO: Check purpose of this
    if (!QuestionFormState.isNewQuestion){
        //dispatch(setAddQuestionComponentProperty)
    }

    const onSubmit = (data: QuestionForm) => {
        console.log(getValues())
        // TODO: lähetetään formin data
        if(QuestionFormState.isNewQuestion){
        axios({
            method: 'POST',
            url: "https://localhost:44385/questions/" + params.id,
            data: QuestionFormState.addQuestionComponent
          }).then(res => {
            fetchQuestionData();
            dispatch(toggle({field: "questionList", value: true}));
            dispatch(toggle({field: "dialog1", value: false}));
          });
      }
      else {
        axios({
            method: 'PUT',
            url: "https://localhost:44385/questions/"  + params.id + "/" + QuestionFormState.addQuestionComponent.questionId,
            data: QuestionFormState.addQuestionComponent
          }).then(res => {
            fetchQuestionData();
            dispatch(toggle({field: "questionList", value: true}));
            dispatch(toggle({field: "dialog1", value: false}));
          });
        }
    }
    
    // Refresh page when QuestionType is changed to toggle answerOptions
    useEffect(() => {}, [QuestionFormState.addQuestionComponent.questionType])

    const handleQuestionTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(setAddQuestionComponentProperty({key: "questionType", value: event.target.value as number}));
        setValue("questionType", event.target.value as number, {shouldValidate: true});
        removeAllAnswerOptions(event.target.value as number);
    };

    // If new question type does not have answer options, remove them
    const removeAllAnswerOptions = (questionTypeId: number) => {
        if(questionTypeId > 3)
        {
            alert("Olet vaihtamassa kysymystä tyypiksi, jolla ei ole vastausvaihtoehtoja. Vastausvaihtoehdot poistetaan. Jatka?");
            //dispatch(removeAnswerOptions(questionTypeId));
        }
    }

    const handleQuestionName = () => {
        dispatch(setAddQuestionComponentProperty({key: "questionText", value: getValues("questionText")}));
    }

    const handleMinChange = () => {

        dispatch(setAddQuestionComponentProperty({key: "multiSelectionMin", value: parseInt(getValues("multiSelectionMin").toString())}));
    }

    const handleMaxChange = () => {
        dispatch(setAddQuestionComponentProperty({key: "multiSelectionMax", value: parseInt(getValues("multiSelectionMax").toString())}));
        trigger();
    }

    const handleHasAdditionalOption = (checked: boolean) => {
        dispatch(setAddQuestionComponentProperty({key: "hasAdditionalOption", value: checked}));
    }

    const handleRequired = (checked: boolean) => {
        dispatch(setAddQuestionComponentProperty({key: "required", value: checked}));
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
          console.log("joo");
        register("multiSelectionMax"); // custom register Antd input
      }, [register])

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
                            inputRef={register({required: "Pakollinen"})}
                            error={!!errors.questionText?.message}
                            helperText={errors.questionText?.message}
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
                            onChange={handleQuestionTypeChange}
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
                            {QuestionFormState.addQuestionComponent.answerOptions.map((answerOption) => <AnswerOption id={answerOption.id} text={answerOption.text} state={false} />)}
                    </Grid>
                    <Grid style={{display: toggleState.answerField ? "block" : "none"}}>
                        <TextField
                            name="answers"
                            inputRef={register}
                            onChange={(e) => dispatch(setEditAnswerOption({text: e.target.value, id: QuestionFormState.editAnswerOption?.id || "", state: QuestionFormState.editAnswerOption?.state || false}))}
                            value={QuestionFormState.editAnswerOption?.text}
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
                        dispatch(setEditAnswerOption({id: "", text: "", state: false}))
                    }
                    }><Add></Add>Lisää uusi vaihtoehto</Button>
                </Grid>

                }
                <Grid item style={{display: (QuestionFormState.addQuestionComponent.questionType == 0) ? "block" : "none"}}>
                    <Grid container direction="column" >
                        <Grid item>
                        <FormLabel>Minimi</FormLabel>
                        </Grid>
                        <Grid item>
                            <TextField 
                                name="multiSelectionMin" 
                                id="multiSelectionMin" 
                                //value={QuestionFormState.addQuestionComponent.multiSelectionMin} 
                                onChange={handleMinChange} 
                                inputRef={register} 
                                inputProps={{min: "0", value: QuestionFormState.addQuestionComponent.multiSelectionMin}} 
                                type="number">
                            </TextField>
                        </Grid>
                        <Grid item>
                        <FormLabel>Maximi</FormLabel>
                        </Grid>
                        <Grid item>
                            <TextField
                                name="multiSelectionMax"
                                id="multiSelectionMax" 
                                inputRef={register({ min: {
                                    value: QuestionFormState.addQuestionComponent.multiSelectionMin,
                                    message: 'error message' // <p>error message</p>
                                }})}
                                error={!!errors.multiSelectionMax?.message}
                                helperText={errors.multiSelectionMax?.message}
                                onChange={handleMaxChange}
                                //value={QuestionFormState.addQuestionComponent.multiSelectionMax}
                                inputProps={{min: "0", value: QuestionFormState.addQuestionComponent.multiSelectionMax}} 
                                type="number">
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Checkbox name="hasAdditionalOption" checked={QuestionFormState.addQuestionComponent.hasAdditionalOption} value={QuestionFormState.addQuestionComponent.hasAdditionalOption} onChange={e => {handleHasAdditionalOption(e.target.checked)}}></Checkbox>Valinnainen vastaus
                </Grid>
                <Grid item>
                    <Checkbox name="required" checked={QuestionFormState.addQuestionComponent.required} value={QuestionFormState.addQuestionComponent.required} onChange={e => {handleRequired(e.target.checked)}}></Checkbox>Pakollinen
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


const AnswerOption = (props : IAnswerOption) => {
    const dispatch = useDispatch();
    const QuestionFormState = useSelector((state: RootState) => state.questionReducer);
    const ToggleState = useSelector((state:RootState) => state.toggleReducer);
    const [editAnswerText, setEditAnswerTextState] = useState(false);

    const saveAnswerOption = () => {
        dispatch(setUpdateAnswerOption({id: props.id, state: props.state, text: QuestionFormState.editAnswerOption?.text || ""}));
    }

    return(
        <Grid container direction="row" justify="flex-start" style={{paddingTop: '1rem'}} spacing={3}>
            <Grid item style={{display: !editAnswerText ? "block" : "none"}}>
                <span style={{paddingRight: '0.5rem'}}>{props.text}</span>
            </Grid>

            <Grid item style={{display: editAnswerText ? "block" : "none"}}>
                <TextField 
                    style={{paddingRight: '0.5rem'}} 
                    value={QuestionFormState.editAnswerOption?.text}
                    required
                    onChange={(e) => {
                        dispatch(setEditAnswerOption({id: props.id, state: props.state, text: e.target.value}))
                        dispatch(setAddQuestionComponent)
                }}
                ></TextField>
            </Grid>

            <Grid item>
                <Button onClick={() => dispatch(removeAnswerOption(props.id))}><Delete/></Button>
            </Grid>

            <Grid item style={{display: !editAnswerText ? "block" : "none"}}>
                <Button onClick={() => {
                    dispatch(setEditAnswerOption(props))
                    setEditAnswerTextState(true);
                }
                    }>Muokkaa</Button>
            </Grid>

            <Grid item style={{display: editAnswerText ? "block" : "none"}}>
                <Button onClick={() => {
                    saveAnswerOption();
                    setEditAnswerTextState(false);
                }
                    }>Tallenna</Button>
                <Button onClick={() => {
                    setEditAnswerTextState(false);
                }
                    }>Peruuta</Button>
            </Grid>
        </Grid>

    )
}