import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';
import { Box, Paper, createStyles, makeStyles, Theme, Grid, Radio, Select, FormControlLabel, RadioGroup, TextField, MenuItem, Checkbox, Button, FormGroup } from '@material-ui/core';
import { QuestionType, IQuestion, IAnswerOption } from '../../../../Interfaces/interface';
import { flexbox } from '@material-ui/system';
import { CheckBox, ErrorSharp } from '@material-ui/icons';
import { FormProvider, useFieldArray, useForm, useFormContext} from 'react-hook-form';
import { setAnswer } from '../../../../Store/Questions/questionsSlice';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

interface IAnswerOptionFieldProps {
    question: IQuestion;
}

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
    const params: { [paramName: string]: string | number | boolean | undefined  } = useParams();
    const methods = useForm();
    //const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    //    control,
    //    name: "test", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    //  });
    let history = useHistory();
    const classes = useStyles();

    const onSubmit = values => {
        QuestionFormState.questions.forEach((question) => {
            if(question.multiSelectionMax > 0) {
            
            }
        })
        var joo = Object.keys(values).map((array) => {
            return {content: [values[array]], questionId: array}
        })
        postFormAnswer(joo)
    };

    const postFormAnswer = (values) => {
        axios({
            method: 'POST',
            url: "https://localhost:44385/questions/customer/" + params.id,
            data: values,
            headers: {
                'Content-Type': 'application/json'
            } 
          }).then(res => {
            if (res.data.result == true) history.push("/form");
          });
    }

    return(
        <FormProvider {...methods}>
        
        <Box display="flex" flexDirection="column" m={1} p={1} justifyContent="center">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
            {QuestionFormState.questions.map((question) => 
                <Box width="60%" margin="auto">
                    <Paper className={classes.questionPaper}>
                        <Grid container direction="column">
                            <Grid item style={{borderBottom: "1px solid #DADADA", marginBottom: "0.7rem"}}>
                                <span style={{fontWeight: "normal", fontSize: "15px"}}>
                                    {question.questionText} {question.required ? "*" : ""}
                                </span>
                            </Grid>
                            <Grid item>
                                {GetQuestionByType(question)}
                                {/* <AnswerOptionField question={question}></AnswerOptionField> */}
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>)
            }
            <Grid style={{width: '60%', margin: 'auto'}} container>
                <Grid item>
            <Button type="submit" variant="contained">Lähetä</Button>
                </Grid>
            </Grid>
            </form>
        </Box>

        </FormProvider>
    );
}

const ConnectForm = ({children}) => {
    const methods = useFormContext();
    const QuestionFormState = useSelector((state: RootState) => state.questionReducer);

    useEffect(() =>{
        QuestionFormState.questions.map((question : IQuestion) => {
            if (question.answerOptions.length > 0) {
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
            result = TextfieldOptionField(questionObject)
            break;
        case 1:
            result = RadioOptionField(questionObject)
            break;
        case 2:
            result = SelectOptionField(questionObject)
            break;
    }

    return (result);
}

const CheckBoxOptionField = (questionObject: IQuestion) => {
    //const QuestionFormState = useSelector((state: RootState) => state.questionReducer);
    //const index = QuestionFormState.questions.indexOf(questionObject);
    const dispatch = useDispatch();
//    var questionId = QuestionFormState.questions.findIndex((x : IQuestion) =>  x.questionId == questionObject.questionId);

    //const {register} = useFormContext();
    return (<Box>
        <label>{questionObject.questionId}</label>
                {questionObject.answerOptions.map((answerOption : IAnswerOption) =>
                <ConnectForm>
                      {({register, setValue, errors}) =>  <Grid container direction="row">
                            <Grid item>
                                <Checkbox
                                    ref={register}
                                    //key={field.id}ods.register({name: question.questionId + "[" + answerOption.id.toString() + "]"})
                                    name={questionObject.questionId + "[" + answerOption.id.toString() + "]"}
                                    checked={answerOption.state}
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
                            </ConnectForm>
                    )}

    </Box>);
}

function TextfieldOptionField(questionObject: IQuestion) {
    return (<Box>
                <label>{questionObject.questionId}</label>
                <Box>
                    <Box>
                        <ConnectForm>
                            {({register, setValue, errors}) => <TextField 
                                inputRef={register({required: {value: questionObject.required, message: "Pakollinen" }})}
                                error={questionObject.questionId in errors}
                                name={questionObject.questionId}
                                helperText={questionObject.questionId in errors ? errors[questionObject.questionId].message : ""}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                                    {
                                        setValue(questionObject.questionId, event.target.value);
                                        //dispatch(setAnswer({value: event.target.checked, id: questionObject.questionId, answerId: answerOption.id}))
                                    }}
                            ></TextField>}
                        </ConnectForm>
                    </Box>
                </Box>
    </Box>);
}

function RadioOptionField(questionObject: IQuestion) {
    return (<Box>
                <label>{questionObject.questionId}</label>
    </Box>);
}

function SelectOptionField(questionObject: IQuestion) {
    return (<Box>
                <label>{questionObject.questionId}</label>
    </Box>);
}

/*const AnswerOptionField = (props: IAnswerOptionFieldProps) => {
    const dispatch = useDispatch();
    //const {register, setValue} = useFormContext();
    const QuestionFormState = useSelector((state: RootState) => state.questionReducer);

    return(
        <>
            {props.question.questionType == 0 ? 
            props.fields.map((field, index) => (
            <Grid>
                <FormGroup>

                    {props.question.hasAdditionalOption ?
                    <Grid container>
                    <Grid>
                        <Checkbox inputRef={props.reg.register}></Checkbox> 
                    </Grid>
                    <Grid item>
                        <label>Muu</label>
                        <TextField inputRef={props.reg.register}></TextField>
                    </Grid>
                        </Grid> : ""}
                        
                    
                    </FormGroup>
            </Grid>)) : <></>}
            {props.question.questionType == 3 ? 
            <Box>
                    <Box>
                        <TextField inputRef={props.reg.register} name={"[" + props.question.questionId + "]"}></TextField>
                    </Box>
                </Box> : <></>}
            {props.question.questionType == 1 ? 
            <Grid container>
                    <RadioGroup name={"[" + props.question.questionId + "]"}>
                        {props.question.answerOptions.map(answerOption =>
                        <Grid item>
                            <Grid container>
                                <Grid item>
                                    <Radio
                                        inputRef={props.reg.register}
                                        value={answerOption.text}></Radio>
                                </Grid>
                                <Grid item>
                                    <label>{answerOption.text}</label>
                                </Grid>
                            </Grid>
                        </Grid>
                            )}
                    </RadioGroup>
                </Grid> : <></>}
            {props.question.questionType == 2 ? 
            <>
                <Select inputRef={props.reg.register}>
                    {props.question.answerOptions.map(answerOption =>
                        <MenuItem value={props.question.questionId + "-" + answerOption.id}>{answerOption.text}</MenuItem>
                        )}
                </Select></> : <></>}
        </>
    )
}*/