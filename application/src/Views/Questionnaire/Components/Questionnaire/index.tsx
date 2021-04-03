import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';
import { Box, Paper, createStyles, makeStyles, Theme, Grid, Radio, Select, FormControlLabel, RadioGroup, TextField, MenuItem, Checkbox, Button, FormGroup, FormControl, FormLabel, Slider, InputLabel, TextareaAutosize } from '@material-ui/core';
import { QuestionType, IQuestion, IAnswerOption } from '../../../../Interfaces/interface';
import { FormProvider, useFieldArray, useForm, useFormContext} from 'react-hook-form';
import { setAnswer } from '../../../../Store/Questions/questionsSlice';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { QuestionForm } from '../../../Admin/Components/AddOrUpdateFormQuestion';

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
    },
    backgroundBox: {
        backgroundColor: "#DEDEDE",
        margin: "0",
        height: "100vh"
    },
    questionnaireContainer: {
        width: "70%",
        margin: "auto",
        padding: "1rem 1rem 3rem 1rem"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      }
  }),
);

export const Questionnaire = () => {
    const QuestionFormState = useSelector((state: RootState) => state.questionReducer);
    const params: { [paramName: string]: string | number | boolean | undefined  } = useParams();
    const methods = useForm();
    let history = useHistory();
    const classes = useStyles();

    const onSubmit = values => {
        console.log(values);
        QuestionFormState.questions.forEach((question) => {
            
            // Validate max selections
            if(question.multiSelectionMax > 0) {
            
            }
        })
        var convertedValue = Object.keys(values).map((key) => {
            // If not array...
            if (!Array.isArray(values[key])) {
                return {answers: [values[key]], questionGuid: key.toString()}
            }
            else {
                return {answers: values[key].map((value) => value.toString()), questionGuid: key.toString(), optionalAnswer: values[key].optional}
            }
        })
        console.log(convertedValue);
        postFormAnswer(convertedValue);
    };

    const postFormAnswer = (values) => {
        axios({
            method: 'POST',
            url: "https://project.sprantonen.com/questions/customer/" + params.id,
            data: values,
            headers: {
                'Content-Type': 'application/json'
            } 
          }).then(res => {
           // if (res.data.result == true) history.push("/form");
          });
    }

    return(
        <FormProvider {...methods}>
        
        <Box className={classes.backgroundBox} display="flex" flexDirection="column" m={1} p={1} justifyContent="center">
            <Paper className={classes.questionnaireContainer}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box>
                    <Grid container style={{margin: "0 1rem 0 1rem"}}>
                        <Grid item>
                            <h2>{QuestionFormState.activeForm.questionnaireName}</h2>
                        </Grid>
                    </Grid>
                </Box>
            {QuestionFormState.questions.map((question) => 
                <Box margin="auto">
                    <Paper className={classes.questionPaper}>
                        <Grid container direction="column">
                            <Grid item style={{borderBottom: "1px solid #DADADA", marginBottom: "0.7rem"}}>
                                <span style={{fontWeight: "normal", fontSize: "15px"}}>
                                    {question.questionText} {question.required ? "*" : ""}
                                </span>
                            </Grid>
                            <Grid item>
                                {GetQuestionByType(question)}
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>)
            }
            <Grid justify="center" container>
                <Grid  item>
                    <Button type="submit" variant="contained">Lähetä</Button>
                </Grid>
            </Grid>
            </form>
            </Paper>
        </Box>

        </FormProvider>
    );
}

const ConnectForm = ({children}) => {
    const methods = useFormContext();
    const QuestionFormState = useSelector((state: RootState) => state.questionReducer);

    useEffect(() =>{
        QuestionFormState.questions.map((question : IQuestion) => {
            if (question.questionType == 0) {
            question.answerOptions.map((answerOption: IAnswerOption) => {
            methods.register({name: question.questionId + "[" + answerOption.id.toString() + "]"});
            })}
            else {
                methods.register({name: question.questionId});
            }
        })
    }, [methods]);
    return children({...methods});
}

function GetQuestionByType(questionObject: IQuestion) {
    var result;

    switch (questionObject.questionType) {
        case 0:
            result = CheckBoxOptionField(questionObject)
            break;
        case 3:
            result = TextfieldOptionField(questionObject, false)
            break;
        case 1:
            result = RadioOptionField(questionObject)
            break;
        case 2:
            result = SelectOptionField(questionObject)
            break;
        case 5:
            result = SliderField(questionObject)
            break;
        case 4:
            result = TextfieldOptionField(questionObject, true)
        break;
    }

    return (result);
}

const CheckBoxOptionField = (questionObject: IQuestion) => {
    const dispatch = useDispatch();
    //const QuestionFormState = useSelector((state: RootState) => state.questionReducer);
    //const index = QuestionFormState.questions.findIndex(question => question.questionId == questionObject.questionId);

    return (<Box>
                {questionObject.answerOptions.map((answerOption : IAnswerOption) =>
                       
                <ConnectForm>
                    
                      {({register, setValue, errors}) =>  <Grid container direction="row">
                            <Grid item>
                                <Checkbox
                                    //key={field.id}ods.register({name: question.questionId + "[" + answerOption.id.toString() + "]"})
                                    name={questionObject.questionId + "[" + answerOption.id.toString() + "]"}
                                    //checked={QuestionFormState.questions[index].answerOptions[answerOption.id].state}
                                   //checked={answerOption.state}
                                    inputRef={register()}
                                    //error={!!errors.questionObject.questionId?.message}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                                    {
                                        setValue(questionObject.questionId + "[" + answerOption.id.toString() + "]", event.target.checked);
                                        dispatch(setAnswer({value: event.target.checked, id: questionObject.questionId, answerId: answerOption.id}))
                                    }}></Checkbox>
                                    {/* <span>Valittu 
                                        {QuestionFormState.questions[questionId].answerOptions.filter((x) => x.state == true).length}/
                                        {QuestionFormState.questions[questionId].multiSelectionMax}
                                        </span> */}
                            </Grid>
                            <Grid item>
                                <label>{answerOption.text}</label>
                            </Grid>  
                            </Grid>}
                            {/* Optional answer field */}
                            </ConnectForm>
                    )}
                    {questionObject.hasAdditionalOption ?
                    <ConnectForm>
                            {({register, setValue, errors, getValues}) =>  <Grid container direction="row">
                                <Grid container direction="column">
                            <Grid item>
                                <label>Muu, mikä?</label>
                            </Grid>  
                            <Grid item>
                                {/* <Checkbox
                                    ref={register}
                                    name={questionObject.questionId + "[optional]"}
                                    //checked={false}
                                    inputRef={register()}
                                    //error={!!errors.questionObject.questionId?.message}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                                    {
                                        //setValue(questionObject.questionId + "[" + answerOption.id.toString() + "]", event.target.checked);
                                    //    dispatch(setAnswer({value: event.target.checked, id: questionObject.questionId, answerId: questionObject.answerOptions.length.toString()}))
                                    }}></Checkbox> */}
                                    <TextField
                                      //  disabled={questionObject.questionId + "[" + answerOption.id.toString() + "]" + "optional"}
                                        name={questionObject.questionId + "[optional]"}
                                        inputRef={register()}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                                            {
                                                setValue(questionObject.questionId + "[optional]", event.target.value);
                                               // dispatch(setAnswer({value: event.target.value, id: questionObject.questionId, answerId: questionObject.answerOptions.length.toString()}))
                                            }}
                                    ></TextField>
                                    {/*  */}
                            </Grid>
                            </Grid>
                            </Grid>}
                            </ConnectForm> : <></>}

    </Box>);
}

function TextfieldOptionField(questionObject: IQuestion, multilineStatus: boolean) {
    return (<Box>
                <Box>
                    <Box>
                        <ConnectForm>
                            {({register, setValue, errors}) => <TextField 
                                inputRef={register({required: {value: questionObject.required, message: "Pakollinen" }})}
                                error={questionObject.questionId in errors}
                                name={questionObject.questionId}
                                placeholder={multilineStatus ? "Laajenna tekstiä Enter -painikkeella" : "Syötä vastaus..."}
                                multiline={multilineStatus}
                                helperText={questionObject.questionId in errors ? errors[questionObject.questionId].message : ""}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                                    {
                                        setValue(questionObject.questionId, event.target.value);
                                    }}
                            ></TextField>}
                        </ConnectForm>
                    </Box>
                </Box>
    </Box>);
}


function RadioOptionField(questionObject: IQuestion) {
    return (<Box>
                <ConnectForm>
                {({register, setValue, errors, getValues}) =>                 
                        <RadioGroup 
                            aria-label="gender"
                            name={questionObject.questionId}
                            ref={register} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                                {
                                    setValue(questionObject.questionId, event.target.value);
                                    //dispatch(setAnswer({value: event.target.checked, id: questionObject.questionId, answerId: answerOption.id}))
                                }}>
                            {questionObject.answerOptions.map((answerOption, key) =>
                                <FormControlLabel key={key} value={answerOption.text} control={<Radio />} label={answerOption.text} />
                            )}
                        </RadioGroup>
                     }
                </ConnectForm>
    </Box>);
}

const SelectOptionField = (questionObject: IQuestion) => {
    //const classes = useStyles();
    
    return (<Box>
                <ConnectForm>
                    {({register, setValue, errors, getValues}) =>    
                    <>          
                    <FormControl>
                        <InputLabel id={`selectLabel-${questionObject.questionId}`}>
                                Valitse...
                        </InputLabel>   
                        <Select 
                            labelId={`selectLabel-${questionObject.questionId}`}
                            inputRef={register}
                            name={questionObject.questionId}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => 
                                {
                                    setValue(questionObject.questionId, event.target.value);
                                }}
                            >
                            {questionObject.answerOptions.map((answerOption, key) =>
                                <MenuItem key={key} value={answerOption.text}>{answerOption.text}</MenuItem>
                            )}
                        </Select>
                     </FormControl>
                     </>}
                </ConnectForm>
    </Box>);
}

function SliderField(questionObject: IQuestion) {
    return (<Box>
                <ConnectForm>
                    {({register, setValue, errors, getValues}) =>                 
                    <Slider
                    defaultValue={0}
                    ref={register}
                    step={1}
                    marks
                    onChange={(event: any, newValue: number | number[])  => 
                    {
                        setValue(questionObject.questionId, (newValue as number).toString());
                        
                    }}
                    min={questionObject.multiSelectionMin}
                    max={questionObject.multiSelectionMax}
                    valueLabelDisplay="auto"
                  />
                     }
                </ConnectForm>
    </Box>);
}

const WildCard = (questionObject : IQuestion) => {
    return (
        <Box>
            <span>Muu, mikä?</span>
            <TextField></TextField>
        </Box>
    )
} 